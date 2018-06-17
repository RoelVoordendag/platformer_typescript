import Game from "../game";

export default class GameObject {
    protected x:number
    protected spritesheet:any
    protected texture:string
    protected sprite: PIXI.Sprite
    protected game:Game
    constructor(x:number , spritesheet:string , texture:string , g:Game){
        this.game = g
        this.x = x
        this.spritesheet = spritesheet
        this.texture = texture        

        let id:any = PIXI.loader.resources[this.spritesheet].textures; 
        this.sprite = new PIXI.Sprite(id[this.texture]);
        this.sprite.x = this.x; 
        this.sprite.y =  window.innerHeight - 64 * this.game.heigth - this.sprite.height * 2;

        this.game.gameObjectContainer.addChild(this.sprite);
    }
    checkCollision(){

    }
}