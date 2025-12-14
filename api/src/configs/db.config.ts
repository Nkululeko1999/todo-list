import mongoose from "mongoose";
import "dotenv/config";

class Database {
  async connect(): Promise<void> {
    try {
      if (!process.env.MONGODB_URI) {
        throw new Error("Failed to load Database Connection string!");
      }
      await mongoose.connect(process.env.MONGODB_URI);

      console.log("Database connection established");
      
    } catch (error) {
      console.log("Database connection failed: ", error);
    }
  }
}

// Export database singleton
const database = new Database();
export default database;
