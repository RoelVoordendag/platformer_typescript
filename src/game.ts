import * as PIXI from "pixi.js";
declare var Bump: any;

class Game {

  static instance: Game;
  public pixi: PIXI.Application;

  //singleton function 
  static getInstance(): Game {
    if (!Game.instance) { 
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private constructor() {

    let b = new Bump(PIXI);

    console.log(b);
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


    //setting up gameloop
    requestAnimationFrame(() => this.gameLoop());
  }
  
  private gameLoop():void{

    requestAnimationFrame(() => this.gameLoop());
  }
}
window.addEventListener("load", () => {
  Game.getInstance();
})