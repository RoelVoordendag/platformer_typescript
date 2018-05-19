import * as PIXI from "pixi.js";
import Map from "./World/Map";

export default class Game {

  static instance: Game;
  public pixi: PIXI.Application;
  public map: Map;

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

    //making the canvas black and setting the canvas full screen
    this.pixi = new PIXI.Application(innerWidth, innerHeight, {
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio,
      autoResize: true
    });
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.pixi.view);

    //loading assets
    PIXI.loader
      .add("res/images/treasureHunter.json")
      .load(this.setup)

    //creating stuff
    this.map = new Map(200 , 10 , "blob.png");

    //setting up gameloop
    requestAnimationFrame(() => this.gameLoop());
  }

  private setup() {
    console.log("setup is run")

    // let id:any = PIXI.loader.resources["res/images/treasureHunter.json"].textures; 

    // let sprite:PIXI.Sprite = new PIXI.Sprite(id["blob.png"]);


    // sprite.x = 30;
    // sprite.y = 30;

    // console.log(this.sprite.getBounds().height);

    // Game.getInstance().pixi.stage.addChild(sprite);
  }
  private gameLoop():void{

    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})