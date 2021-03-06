import Game from "../game";
import Player from "../Characters/Player";
import RangeAttack from "../Strategy/RangeAttack";

export default class GameObject {
    protected x:number
    protected spritesheet:any
    protected texture:string
    protected sprite: PIXI.Sprite
    protected game:Game
    protected player:Player
    constructor(x:number , spritesheet:string , texture:string , g:Game){
        this.game = g
        this.x = x
        this.spritesheet = spritesheet
        this.texture = texture    
        
        this.player = this.game.player

        let id:any = PIXI.loader.resources[this.spritesheet].textures; 
        this.sprite = new PIXI.Sprite(id[this.texture]);
        this.sprite.x = this.x; 
        this.sprite.y =  window.innerHeight - 64 * this.game.heigth - this.sprite.height * 2;

        this.game.gameObjectContainer.addChild(this.sprite);
    }
    public checkCollision() : void{
         if (
            this.player.sprite.x + this.player.sprite.width> this.sprite.x
            && this.player.sprite.x < this.sprite.x + this.sprite.width
            && this.player.sprite.y + this.player.sprite.height > this.sprite.y
            && this.player.sprite.y < this.sprite.y + this.sprite.height         
        ){
            this.player.changeAttack(new RangeAttack(this.player , this.game))
            this.game.gameObjectContainer.removeChild(this.sprite)
            this.sprite.y = -100
        }
    }
}