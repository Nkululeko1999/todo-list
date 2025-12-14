import dotenv from "dotenv";
import App from "./app.js";
import database from "./config/db.config.js";

dotenv.config();

const startServer = async (): Promise<void> => {
    try {
        // Connect to database
        await database.connect();

        const app = new App();
        app.startApp();
    } catch (error) {
        console.log("Failed to start server: ", error);
        process.exit(1);
    }
}

startServer();