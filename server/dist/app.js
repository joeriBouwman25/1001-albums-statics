"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const health_1 = __importDefault(require("./routes/health"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api", health_1.default);
    app.get("/", (_req, res) => {
        res.send("Server running");
    });
    if (process.env.NODE_ENV === "production") {
        // When executed from server package directory, client is sibling
        const clientDist = path_1.default.resolve(process.cwd(), "..", "client", "dist");
        if (fs_1.default.existsSync(clientDist)) {
            app.use(express_1.default.static(clientDist));
            app.get("*", (_req, res) => {
                const indexPath = path_1.default.join(clientDist, "index.html");
                if (fs_1.default.existsSync(indexPath)) {
                    res.sendFile(indexPath);
                }
                else {
                    res.status(404).send("Client build not found");
                }
            });
        }
        else {
            console.warn("Client dist not found at", clientDist);
        }
    }
    return app;
}
exports.app = createApp();
