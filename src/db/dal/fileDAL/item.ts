import fs from "fs";
import Logger from "../../../helpers/logger";

const DATA_FILE = "./src/items.json";

export class ItemRepository {
  async getAllItems(): Promise<string[]> {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      }
      Logger.info(`Getting all items`);
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      Logger.info(`Got all items`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      Logger.error(`Can't get all items`);
      throw error;
    }
  }

  async createItems(items: string[]): Promise<void> {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
    } catch (error) {
      Logger.error("Can't add items");
      throw error;
    }
  }
}
