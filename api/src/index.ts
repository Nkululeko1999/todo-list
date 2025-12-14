import dotenv from "dotenv";
import App from "./app.js";

dotenv.config();

const startServer = (): void => {
    try {
        const app = new App();
        app.startApp();
    } catch (error) {
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
}

startServer();