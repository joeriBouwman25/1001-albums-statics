import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
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
    return client.db();
  } catch (err) {
    console.error("Mongo connection error", err);
    throw err;
  }
}
