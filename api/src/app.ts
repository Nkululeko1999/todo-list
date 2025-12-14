import express, { type Application } from "express";
import "dotenv/config";
import IndexRouter from "./router/index.router.js";

class App {
  private app: Application;
  private indexRouter: IndexRouter;

  constructor() {
    this.app = express();
    this.indexRouter = new IndexRouter();
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.app.use("/api", this.indexRouter.getRouter());
  }

  public startApp() {
    const port = process.env.PORT;
    this.app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}

export default App;
