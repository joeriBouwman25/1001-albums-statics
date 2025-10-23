"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _1001Albums_json_1 = __importDefault(require("../public/1001Albums.json"));
console.log(_1001Albums_json_1.default);
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const collection = req.app.locals.db.collection("1001Albums");
    const albums = await collection.find().toArray();
    res.json(albums);
});
router.post("/import", async (req, res) => {
    try {
        const collection = req.app.locals.db.collection("1001Albums");
        const result = await collection.insertMany(_1001Albums_json_1.default);
        res.json({ message: "✅ JSON imported", count: result.insertedCount });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: String(err) });
        }
    }
});
exports.default = router;
