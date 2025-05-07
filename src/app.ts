import express, { Application } from "express";
import { env } from "process";
import dbInit from "./db/init";
import Logger from "./helpers/logger";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    // dbInit();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use(
        `/api/${env.SERVICE_NAME}/${controller.path}`,
        controller.router
      );
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.debug(`App listening on the http://localhost:${this.port}`);
    });
  }
}

export default App;
