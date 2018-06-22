import * as PIXI from "pixi.js";
import Tile from "./World/Tile";
import CreateWorld from "./World/CreateWorld";
import Player from "./Characters/Player"
import Enemy from "./Characters/Enemy";
import Characters from "./Characters/Characters";
import Rock from "./Rock";
import GameObject from "./GameObject/GameObject";
import RangePickUp from "./GameObject/RangePickUp";

export default class Game {

  private static instance: Game;
  public pixi: PIXI.Application;
  public length:number;
  public tile!:CreateWorld;
  public player!: Player;
  public keyState:any[] = []
  public enemy!:Enemy
  public enemies:Enemy[] = []
  public charactersArray:Characters[] = []
  public rocks:Array<Rock> = new Array<Rock>()
  public gameObjects:GameObject[] = []
  public heigth:number
  public rangePickup!:RangePickUp;
  public playerContainer: PIXI.Container = new PIXI.Container()
  public characterContainer: PIXI.Container = new PIXI.Container()
  public worldContainer: PIXI.Container = new PIXI.Container()
  public gameObjectContainer: PIXI.Container = new PIXI.Container()
  public UIcontainer: PIXI.Container = new PIXI.Container()

  //singleton function 
  static getInstance(): Game {
    if (!Game.instance) { 
      Game.instance = new Game();
    }
    return Game.instance;
  }
  private constructor() {
    //length of the map & heigth
    this.length = 3000;
    this.heigth = 4;
  
    //making the canvas black and setting the canvas full screen
    this.pixi = new PIXI.Application(this.length, innerHeight, {
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio,
      autoResize: true,
      forceCanvas: true
    });
    this.pixi.renderer.view.style.position = "absolute";
    this.pixi.renderer.view.style.display = "block";
    this.pixi.renderer.autoResize = true;
    this.pixi.renderer.resize(window.innerWidth, window.innerHeight);
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    document.body.appendChild(this.pixi.view);

    //setup camera
    this.pixi.stage.addChild(this.worldContainer)
    this.pixi.stage.addChild(this.characterContainer)
    this.pixi.stage.addChild(this.gameObjectContainer)
    this.pixi.stage.addChild(this.UIcontainer)

    this.characterContainer.position.set(this.pixi.screen.width / 2 , this.pixi.screen.height / 2)
    this.worldContainer.position.set(this.pixi.screen.width / 2 , this.pixi.screen.height / 2)
    this.gameObjectContainer.position.set(this.pixi.screen.width / 2 , this.pixi.screen.height / 2)
    this.UIcontainer.position.set(this.pixi.screen.width / 2 , this.pixi.screen.height / 2)

    //loading assets
    PIXI.loader
      .add('tileset' ,'res/images/tileset.json')
      .add('player_moves'  , "res/images/moves_player.json" )
      .add('player_attack' , "res/images/player_attack.json")
      .add('enemy' , "res/images/enemy_Thing.json")
      .add('pickups' , 'res/images/pickup.json')
      .load()  
      PIXI.loader.onComplete.add(() => {this.setup()});
  }
  addRock(r:Rock){
    this.rocks.push(r)
  }
  private setup() {
    //generate the world for the character
    this.tile = new CreateWorld(this.length/64, this.heigth , "fill.png")

    //make players
    for(let i = 0; i<=5; i++){ 
      this.enemy = new Enemy(500 + (i*5) , 0 , this)
      this.enemies.push(this.enemy)
      this.charactersArray.push(this.enemy)
    }
    this.player = new Player(0,0 , this.enemy , this)

    for(let e of this.enemies){
      this.player.subscribe(e)
    }

    this.charactersArray.push(this.player)

    //setup pickup
    this.rangePickup = new RangePickUp(250 , this)
    
    this.gameObjects.push(this.rangePickup)

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
        if(c instanceof Enemy){
          c.enemyMove()
        }
        //gravity kinda
        c.move(0,5)
        c.update()
        for(let r of this.rocks){
          r.move()
        }
        for(let gO of this.gameObjects){
          gO.checkCollision()
        }
    }
    //updating camera
    this.characterContainer.pivot.copy(this.player.sprite.position)
    this.worldContainer.pivot.copy(this.player.sprite.position)
    this.gameObjectContainer.pivot.copy(this.player.sprite.position)
    this.UIcontainer.pivot.copy(this.player.sprite.position)

    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})