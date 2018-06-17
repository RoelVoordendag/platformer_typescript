import Game from "./game";

export default class Rock {
    public x:number
    public y:number
    public sprite:PIXI.Sprite
    private game:Game
    private xspeed:number;
    constructor(x:number , y:number , g:Game){
        this.x = x
        this.y = y

        this.game = g

        let id:any = PIXI.loader.resources["pickups"].textures; 
        this.sprite = new PIXI.Sprite(id["rock.png"])  

        //setting position
        this.sprite.x = this.x + this.game.player.sprite.width
        this.sprite.y = this.y + (this.game.player.sprite.height /2)
        
        this.game.worldContainer.addChild(this.sprite)

        this.xspeed = 5;
    }
    move(){
        let collide = false;

        this.sprite.x += this.xspeed 

        for(let r of this.game.rocks){
            if(this.game.enemy.checkCollsionForAttack(r.sprite.x , r.sprite.y , r.sprite.height , r.sprite.width)){
                collide = true
                break
            }
        }    
        
        if(collide){
            this.sprite.visible = false
            this.sprite.y = -100;
            this.game.worldContainer.removeChild(this.sprite)
        }
    }
}