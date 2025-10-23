import express, { Request, Response } from "express";
import cors from "cors";
import albumRouter from "./routes/albums";
import path from "path";
import fs from "fs";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/api", albumRouter);
  app.get("/", (_req: Request, res: Response) => {
    res.send("Server running");
  });

  if (process.env.NODE_ENV === "production") {
    // When executed from server package directory, client is sibling
    const clientDist = path.resolve(process.cwd(), "..", "client", "dist");

    if (fs.existsSync(clientDist)) {
      app.use(express.static(clientDist));
      app.get("*", (_req: Request, res: Response) => {
        const indexPath = path.join(clientDist, "index.html");
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send("Client build not found");
        }
      });
    } else {
      console.warn("Client dist not found at", clientDist);
    }
  }
  return app;
}

export const app = createApp();
