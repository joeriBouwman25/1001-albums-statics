"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
exports.connectMongo = connectMongo;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB_NAME;
exports.client = uri
    ? new mongodb_1.MongoClient(uri)
    : undefined;
let isConnected = false;
async function connectMongo() {
    if (!exports.client) {
        throw new Error("No MongoDB URI configured");
    }
    try {
        if (!isConnected) {
            await exports.client.connect();
            isConnected = true;
        }
        console.log("db connected");
        return exports.client.db(dbName);
    }
    catch (err) {
        console.error("Mongo connection error", err);
        throw err;
    }
}
