import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGO_DB_NAME;
export const client: MongoClient | undefined = uri
  ? new MongoClient(uri)
  : undefined;
let isConnected = false;

export async function connectMongo(): Promise<Db> {
  if (!client) {
    throw new Error("No MongoDB URI configured");
  }
  try {
    if (!isConnected) {
      await client.connect();
      isConnected = true;
    }
    console.log("db connected");
    return client.db(dbName);
  } catch (err) {
    console.error("Mongo connection error", err);
    throw err;
  }
}
