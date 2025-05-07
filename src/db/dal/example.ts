import Logger from "../../helpers/logger";
import Example, {
  IExampleInput,
  IExampleOutput as IExampleOutput,
} from "../../models/example.model";

export class ExampleRepository {
  async create(payload: IExampleInput): Promise<IExampleOutput> {
    try {
      return await Example.create(payload);
    } catch (error) {
      Logger.error("Can't create example");
      throw error;
    }
  }

  async update(
    id: number,
    payload: Partial<IExampleInput>
  ): Promise<IExampleOutput> {
    try {
      const example = await Example.findByPk(id);
      if (!example) {
        // @todo throw custom error
        throw new Error("not found");
      }
      return await (example as Example).update(payload);
    } catch (error) {
      Logger.error("Can't update example");
      throw error;
    }
  }

  async getById(id: number): Promise<IExampleOutput> {
    try {
      const example = await Example.findByPk(id);
      if (!example) {
        // @todo throw custom error
        throw new Error(`example by id ${id} not found`);
      }
      return example;
    } catch (error) {
      Logger.error(`Can\'t get example by id ${id}`);
      throw error;
    }
  }

  async deleteById(id: number): Promise<boolean> {
    try {
      const deletedExampleCount = await Example.destroy({
        where: { id },
      });
      return !!deletedExampleCount;
    } catch (error) {
      Logger.error(`Can\'t delete example by id ${id}`);
      throw error;
    }
  }

  async getAll(): Promise<IExampleOutput[]> {
    try {
      return Example.findAll();
    } catch (error) {
      Logger.error("Can't get all examples");
      throw error;
    }
  }
}
