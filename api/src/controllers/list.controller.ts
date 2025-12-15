import { type Request, type Response } from "express";
import type { IList } from "../types/index.js";
import List from "../models/list.model.js";

class ListController {
  public async addNewTask(req: Request, res: Response) {
    const { title, description } = req.body;
    try {
      const foundTask: IList | null = await List.findOne({ title });

      if (foundTask)
        return res
          .status(409)
          .json({ success: false, error: "Task title already exists" });

      const newTask = new List({
        title,
        description,
      });

      newTask.save();

      return res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      console.log("Failed to create new task", error);
      return res.status(500).json({
        success: false,
        error: "An error has occurred, try again later",
      });
    }
  }

  public async allTasks(req: Request, res: Response) {
    try {
      const tasks: IList[] = await List.find();

      return res.status(201).json({ success: true, data: tasks });
    } catch (error) {
      console.log("Failed to find list of tasks", error);
      return res.status(500).json({
        success: false,
        error: "An error has occurred, try again later",
      });
    }
  }

  public async deleteTask(req: Request, res: Response) {
    const taskId = req.params.id;
    try {
      const deletedUser = await List.findByIdAndDelete(taskId);

      if (!deletedUser)
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });

      return res.status(200).json({ success: true, message: "Task deleted" });
    } catch (error) {
      console.log("Failed to delete a task", error);
      return res.status(500).json({
        success: false,
        error: "An error has occurred, try again later",
      });
    }
  }

  public async getTaskById(req: Request, res: Response) {
    const taskId = req.params.id;
    try {
      const task = await List.findById(taskId);

      if (!task)
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });

      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      console.log("Failed to get task by id", error);
      return res.status(500).json({
        success: false,
        error: "An error has occurred, try again later",
      });
    }
  }

  public async updateTask(req: Request, res: Response) {
    const taskId = req.params.id;
    const updates = req.body;
    try {
      const updatedTask = await List.findByIdAndUpdate(taskId, updates, {
        new: true,
      });

      if (!updatedTask)
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });

      return res
        .status(200)
        .json({ success: true, messafe: "Task updated", data: updatedTask });
    } catch (error) {
      console.log("Failed to update task", error);
      return res.status(500).json({
        success: false,
        error: "An error has occurred, try again later",
      });
    }
  }
}

export default ListController;
