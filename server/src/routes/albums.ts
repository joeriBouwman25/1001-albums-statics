import { Request, Response, Router } from "express";
import { connectMongo } from "../db";

const router = Router();

router.get("/albums", async (_req: Request, res: Response) => {
  const db = await connectMongo();
  const collection = db.collection("data");
  const items = await collection.find({}).toArray();
  return res.json(items);
});

export default router;
