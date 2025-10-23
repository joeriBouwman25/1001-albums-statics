"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const app_1 = require("./app");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
async function bootstrap() {
    if (process.env.MONGODB_URI) {
        try {
            await (0, db_1.connectMongo)();
        }
        catch (err) {
            console.warn("Continuing without MongoDB connection:", err.message);
        }
    }
    else {
        console.warn("MONGODB_URI not set; starting without database");
    }
    app_1.app.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT} (${NODE_ENV})`);
    });
}
bootstrap().catch((err) => {
    console.error("Failed to start server", err);
    process.exit(1);
});
