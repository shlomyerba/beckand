import { DataTypes, Model, Optional } from "sequelize";
import dbConnection from "../config/db";

export interface IExample {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExampleInput extends Optional<IExample, "id"> {}
export interface IExampleOutput extends Required<IExample> {}

class Example extends Model<IExample, IExampleInput> implements IExample {
  public id!: string;
  public name!: string;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Example.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
    sequelize: dbConnection,
    paranoid: true,
  }
);

export default Example;
