import { Request, Response, Router } from "express";
import Logger from "../helpers/logger";
import { ItemService } from "../services/itemService";

export class ItemController {
  public path: string;
  public router: Router;
  private itemService: ItemService;

  constructor() {
    this.path = "items";
    this.router = Router();
    this.itemService = new ItemService();
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", async (req: Request, res: Response): Promise<void> => {
      try {
        const items = await this.itemService.getAll();
        res.status(200).json({
          message: "Get items successfully!",
          items,
          success: true,
        });
      } catch (error) {
        Logger.http(error);
        res.status(400).json({
          message: error,
          success: false,
        });
      }
    });

    this.router.post("/", async (req: Request, res: Response) => {
      try {
        if (typeof req.body.name === "string") {
          await this.itemService.add(req.body);
          res.status(200).json({
            message: "Created items successfully!",
            success: true,
          });
        } else {
          res.status(422).json({
            message: "Invalid params",
            success: false,
          });
        }
      } catch (error) {
        Logger.http(error);
        res.status(400).json({
          message: error,
          success: false,
        });
      }
    });

    this.router.delete(
      "/:name",
      async (req: Request, res: Response): Promise<void> => {
        try {
          const itemName = req.params.name;
          await this.itemService.delete(itemName);
          res.status(200).json({
            message: "Deleted item successfully!",
            success: true,
          });
        } catch (error) {
          Logger.http(error);
          res.status(400).json({
            message: error,
            success: false,
          });
        }
      }
    );
  }
}
