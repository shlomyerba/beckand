import { ItemService } from "../itemService";
import { ItemRepository } from "../../db/dal/fileDAL/item";
import { Item } from "../../models/item.model";

// Mock the ItemRepository
jest.mock("../../db/dal/fileDAL/item");

describe("ItemService", () => {
  let itemService: ItemService;
  let mockItemRepository: jest.Mocked<ItemRepository>;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Create a new mock instance
    mockItemRepository = {
      getAllItems: jest.fn(),
      createItems: jest.fn(),
    } as unknown as jest.Mocked<ItemRepository>;

    // Mock the constructor to return our mock instance
    (ItemRepository as jest.Mock).mockImplementation(() => mockItemRepository);

    itemService = new ItemService();
  });

  describe("getAll", () => {
    it("should return all items", async () => {
      const mockItems = ["item1", "item2"];
      mockItemRepository.getAllItems.mockResolvedValue(mockItems);

      const result = await itemService.getAll();

      expect(result).toEqual(mockItems);
      expect(mockItemRepository.getAllItems).toHaveBeenCalledTimes(1);
    });

    it("should throw error when repository fails", async () => {
      const error = new Error("Database error");
      mockItemRepository.getAllItems.mockRejectedValue(error);

      await expect(itemService.getAll()).rejects.toThrow("Database error");
    });
  });

  describe("add", () => {
    it("should add item successfully", async () => {
      const existingItems = ["existing item"];
      const newItem = { id: 1, name: "test item" };
      mockItemRepository.getAllItems.mockResolvedValue(existingItems);
      mockItemRepository.createItems.mockResolvedValue();

      await itemService.add(newItem);

      expect(mockItemRepository.createItems).toHaveBeenCalledWith([
        ...existingItems,
        "test item",
      ]);
      expect(mockItemRepository.createItems).toHaveBeenCalledTimes(1);
    });

    it("should trim item name before adding", async () => {
      const existingItems = ["existing item"];
      const newItem = { id: 1, name: "  test item  " };
      mockItemRepository.getAllItems.mockResolvedValue(existingItems);
      mockItemRepository.createItems.mockResolvedValue();

      await itemService.add(newItem);

      expect(mockItemRepository.createItems).toHaveBeenCalledWith([
        ...existingItems,
        "test item",
      ]);
    });

    it("should throw error when repository fails", async () => {
      const item = { id: 1, name: "test item" };
      const error = new Error("Database error");
      mockItemRepository.getAllItems.mockResolvedValue([]);
      mockItemRepository.createItems.mockRejectedValue(error);

      await expect(itemService.add(item)).rejects.toThrow("Database error");
    });
  });

  describe("delete", () => {
    it("should delete item successfully", async () => {
      const existingItems = ["item1", "item2", "item3"];
      const itemToDelete = "item2";
      mockItemRepository.getAllItems.mockResolvedValue(existingItems);
      mockItemRepository.createItems.mockResolvedValue();

      await itemService.delete(itemToDelete);

      expect(mockItemRepository.createItems).toHaveBeenCalledWith([
        "item1",
        "item3",
      ]);
      expect(mockItemRepository.createItems).toHaveBeenCalledTimes(1);
    });

    it("should trim item name before deleting", async () => {
      const existingItems = ["item1", "item2", "item3"];
      const itemToDelete = "  item2  ";
      mockItemRepository.getAllItems.mockResolvedValue(existingItems);
      mockItemRepository.createItems.mockResolvedValue();

      await itemService.delete(itemToDelete);

      expect(mockItemRepository.createItems).toHaveBeenCalledWith([
        "item1",
        "item3",
      ]);
    });

    it("should throw error when repository fails", async () => {
      const itemToDelete = "test item";
      const error = new Error("Database error");
      mockItemRepository.getAllItems.mockResolvedValue(["test item"]);
      mockItemRepository.createItems.mockRejectedValue(error);

      await expect(itemService.delete(itemToDelete)).rejects.toThrow(
        "Database error"
      );
    });
  });
});
