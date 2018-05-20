import * as PIXI from "pixi.js";
import Map from "./World/Map";
import CreateWorld from "./World/CreateWorld";

export default class Game {

  static instance: Game;
  public pixi: PIXI.Application;
  public length:number;
  // public map: Map;

  //singleton function 
  static getInstance(): Game {
    if (!Game.instance) { 
      Game.instance = new Game();
    }
    return Game.instance;
  }
  private constructor() {
    //testing webpack
    console.log("Hallo");

    //length of the map
    this.length = 3000;

    //making the canvas black and setting the canvas full screen
    this.pixi = new PIXI.Application(this.length, innerHeight, {
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio,
      autoResize: true,
    });
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.pixi.view);

    //loading assets
    PIXI.loader
      .add('test' , "res/images/treasureHunter.json")
      .add("tileset" ,"res/images/tileset.json")
      .load()  
      PIXI.loader.onComplete.add(() => {this.setup()});
      
  }
  private setup() {
    console.log("setup is run");
    //generate the world for the character
    let makeWorld = new CreateWorld(this.length /64, 3);

    requestAnimationFrame(() => this.gameLoop());
  }
  private gameLoop():void{    


    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})