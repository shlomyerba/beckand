import { ItemRepository } from "../db/dal/fileDAL/item";
import Logger from "../helpers/logger";
import { Item } from "../models/item.model";

export class ItemService {
  private itemRepository: ItemRepository;

  constructor() {
    this.itemRepository = new ItemRepository();
  }

  async add(item: Item): Promise<void> {
    try {
      const trimmedName = item.name.trim();
      Logger.info(`item: ${trimmedName}`);
      const allItems = await this.itemRepository.getAllItems();
      Logger.info(`allItems: ${allItems}`);
      return await this.itemRepository.createItems([...allItems, trimmedName]);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<string[]> {
    try {
      return await this.itemRepository.getAllItems();
    } catch (error) {
      throw error;
    }
  }

  async delete(itemName: string): Promise<void> {
    try {
      const trimmedName = itemName.trim();
      Logger.info(`Deleting item: ${trimmedName}`);
      const allItems = await this.itemRepository.getAllItems();
      const filteredItems = allItems.filter(
        (item: string) => item.trim() !== trimmedName
      );
      Logger.info(`filteredItems: ${filteredItems}`);
      return await this.itemRepository.createItems(filteredItems);
    } catch (error) {
      throw error;
    }
  }
}
