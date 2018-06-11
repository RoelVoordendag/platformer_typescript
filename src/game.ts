import * as PIXI from "pixi.js";
import Tile from "./World/Tile";
import CreateWorld from "./World/CreateWorld";
import Player from "./Characters/Player"
import Enemy from "./Characters/Enemy";
import Characters from "./Characters/Characters";

export default class Game {

  private static instance: Game;
  public pixi: PIXI.Application;
  public length:number;
  public tile:CreateWorld;
  public player!: Player;
  public keyState:any[] = []
  public enemy!:Enemy
  public charactersArray:Characters[] = []

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
      .add('player_moves'  , "res/images/moves_player.json" )
      .add('player_attack' , "res/images/player_attack.json")
      .add('enemy' , "res/images/enemy_Thing.json")
      .load()  
      PIXI.loader.onComplete.add(() => {this.setup()});
  }

  private setup() {
    //generate the world for the character
    this.tile = new CreateWorld(this.length/64, 2 , "fill.png");

    //make players
    this.player = new Player(0,0)
    this.enemy = new Enemy(0,0);
    this.charactersArray.push(this.player , this.enemy)

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
    //letting all the players move
    for(let c of this.charactersArray){
        if(c instanceof Player){
          c.keyPressed(this.keyState)
        }
        c.move(0,5)
        c.update()
    }

    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})