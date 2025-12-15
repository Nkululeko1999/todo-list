import express, { type Request, type Response, type Router } from "express";
import ListController from "../controllers/list.controller.js";

class IndexRouter {
  private router: Router;
  private listController: ListController;

  constructor() {
    this.router = express.Router();
    this.listController = new ListController();
    this.initializeTestRoute();
    this.initializeRoutes();
  }

  initializeRoutes(){
    this.router.post("/tasks", this.listController.addNewTask.bind(this.listController));
    this.router.get("/tasks", this.listController.allTasks.bind(this.listController));
    this.router.delete("/tasks/:id", this.listController.deleteTask.bind(this.listController));
    this.router.get("/tasks/:id", this.listController.getTaskById.bind(this.listController));
    this.router.put("/tasks/:id", this.listController.updateTask.bind(this.listController));
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
