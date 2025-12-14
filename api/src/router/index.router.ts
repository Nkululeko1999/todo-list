import express, { type Request, type Response, type Router } from "express";

class IndexRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeTestRoute();
  }

  initializeTestRoute() {
    this.router.get("/test", (req: Request, res: Response) => {
        return res.status(200).json({
            success: true,
            message: "API is working fine"
        })
    })
  }

  getRouter() {
    return this.router;
  }
}

export default IndexRouter;
