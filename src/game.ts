import * as PIXI from "pixi.js";
import Tile from "./World/Tile";
import CreateWorld from "./World/CreateWorld";
import Player from "./Characters/Player"

export default class Game {

  static instance: Game;
  public pixi: PIXI.Application;
  public length:number;
  public tile:CreateWorld;
  public player!: Player;
  public keyState:any[] = []

  //singleton function 
  static getInstance(): Game {
    if (!Game.instance) { 
      Game.instance = new Game();
    }
    return Game.instance;
  }
  private constructor() {
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
      .add('creeper', "res/images/Creeper-icon.png")
      .add('player_moves'  , "res/images/moves_player.json" )
      .load()  
      PIXI.loader.onComplete.add(() => {this.setup()});
      
  }

  private setup() {
    //generate the world for the character
    this.tile = new CreateWorld(this.length /64, 2 , "fill.png");

    //new player on 0,0
    this.player = new Player(0, 0)

    //player movement listeners
    window.addEventListener('keydown', function(e){
      Game.getInstance().keyState[e.keyCode || e.which] = true;
    }, true)
    window.addEventListener('keyup', function(e){
      Game.getInstance().keyState[e.keyCode || e.which] = false;
    }, true)
      

    requestAnimationFrame(() => this.gameLoop());
  }
  private gameLoop():void{    
    //send key event to player, and update it
    this.player.keyPressed(this.keyState);
    this.player.update()

    // console.log(Game.getInstance().player.height);


    //when more characters join push in array and call all in one loop! We also can call move(0,5) to fix fravity

    //gravity? kinda?
    this.player.move(0, 5)

    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})