import { ExampleRepository } from "../db/dal/example";
import { IExampleInput, IExampleOutput } from "../models/example.model";

export class ExampleService {
  private exampleRepository: ExampleRepository;

  constructor() {
    this.exampleRepository = new ExampleRepository();
  }

  async create(payload: IExampleInput): Promise<IExampleOutput> {
    try {
      return await this.exampleRepository.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: number,
    payload: Partial<IExampleInput>
  ): Promise<IExampleOutput> {
    try {
      return await this.exampleRepository.update(id, payload);
    } catch (error) {
      throw error;
    }
  }

  async getById(id: number): Promise<IExampleOutput> {
    try {
      return await this.exampleRepository.getById(id);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      return await this.exampleRepository.deleteById(id);
    } catch (error) {
      throw error;
    }
  }

  async getAll(): Promise<IExampleOutput[]> {
    try {
      return await this.exampleRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
