import * as PIXI from "pixi.js";

export default class PixiSingleton {
  static APP: PIXI.Application;

  static setInstance(app: PIXI.Application) {
    PixiSingleton.APP = app;
  }

  static getInstance() {
    return PixiSingleton.APP;
  }
}