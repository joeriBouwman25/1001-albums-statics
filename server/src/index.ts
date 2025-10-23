import dotenv from "dotenv";
import { connectMongo } from "./db";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

async function bootstrap() {
  if (process.env.MONGODB_URI) {
    try {
      await connectMongo();
    } catch (err) {
      console.warn(
        "Continuing without MongoDB connection:",
        (err as Error).message
      );
    }
  } else {
    console.warn("MONGODB_URI not set; starting without database");
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT} (${NODE_ENV})`);
  });
}

bootstrap().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
