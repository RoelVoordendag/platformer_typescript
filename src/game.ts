import * as PIXI from "pixi.js";
import Tile from "./World/Tile";
import CreateWorld from "./World/CreateWorld";

export default class Game {

  static instance: Game;
  public pixi: PIXI.Application;
  public length:number;
  public tile:CreateWorld;
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
    console.log("Game is Started");

    //length of the map
    this.length = 3000;

    //filling the world
    this.tile = new CreateWorld(0, 2 , "fill.png");

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
    this.tile = new CreateWorld(this.length /64, 2 , "fill.png");

    

    requestAnimationFrame(() => this.gameLoop());
  }
  private gameLoop():void{    


    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})