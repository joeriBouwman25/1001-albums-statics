import {Request, Response, Router} from "express";
import {connectMongo} from "../db";

const router = Router();

// Return all raw album documents
router.get("/albums", async (_req: Request, res: Response) => {
  const db = await connectMongo();
  const collection = db.collection("data");
  const items = await collection.find({}).toArray();
  return res.json(items);
});

router.get("/albums/decades", async (_req: Request, res: Response) => {
    const db = await connectMongo();
    const collection = db.collection("data");
    const pipeline = [
        {$unwind: "$data"},
        {$replaceRoot: {newRoot: "$data"}},
        {$project: {decade: 1, _id: 0}}
    ];
    const items = await collection.aggregate(pipeline).toArray();
    return res.json(items);
});

router.get("/albums/decade/:decade", async (req: Request, res: Response) => {
    const { decade } = req.params;
    const db = await connectMongo();
    const collection = db.collection("data");
    const pipeline = [
        { $unwind: "$data" },
        { $match: { "data.decade": decade } },
        { $unwind: "$data.albums" },
        { $replaceRoot: { newRoot: "$data.albums" } }
    ];
    const items = await collection.aggregate(pipeline).toArray();
    return res.json(items);
});


router.patch("/albums/listened/:albumId", async (req: Request, res: Response) => {
    const { albumId } = req.params;
    const id = parseInt(albumId, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid album ID." });
    }

    const db = await connectMongo();
    const collection = db.collection("data");

    const result = await collection.updateOne(
        { "data.albums.id": id },
        [{
            $set: {
                data: {
                    $map: {
                        input: "$data",
                        as: "decade",
                        in: {
                            $mergeObjects: [
                                "$$decade",
                                {
                                    albums: {
                                        $map: {
                                            input: "$$decade.albums",
                                            as: "album",
                                            in: {
                                                $cond: {
                                                    if: { $eq: ["$$album.id", id] },
                                                    then: {
                                                        $mergeObjects: [
                                                            "$$album",
                                                            { listened: { $not: "$$album.listened" } }
                                                        ]
                                                    },
                                                    else: "$$album"
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    }
                }
            }
        }]
    );

    if (result.modifiedCount === 0) {
        return res.status(404).json({ message: "Album not found or not updated." });
    }

    return res.json({ message: "Album updated successfully." });
});


export default router;
