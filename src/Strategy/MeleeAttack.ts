import Player from "../Characters/Player";
import Enemy from "../Characters/Enemy";
import Game from "../game";

export default class MeleeAttack implements AttackBehavior{
    private player: Player;
    public range!:number
    public enemy:Enemy
    public attackFrames: any =[]
    private countDown:boolean
    private game:Game
    constructor(player:Player, e:Enemy, g:Game){
        //setup game
        this.game = g
        //get player property here 
        this.player = player;  
        //setting range for the attack
        this.range =+ 30;
        this.enemy = e
        //setting up countdown
        this.countDown = false
    }
    public attack() : void{
        if(!this.countDown){
            for (let i= 1;i <= 2;i++) {        
                var tempFrame = {
                    texture: PIXI.loader.resources['player_attack'].textures!['punch-'+ i + '.png'],
                    time: 200
                }                     
                this.attackFrames.push(tempFrame)
            }           
            var tempFrame = {
                texture: PIXI.loader.resources['player_attack'].textures!['punch-2.png'],
                time:200
            }
            this.attackFrames.push(tempFrame)     

            this.countDown = true
            
            this.player.sprite.textures = this.attackFrames

            this.coolDown()

            for(let e of this.game.enemies){
                e.checkCollsionForAttack(this.player.sprite.x + this.range , this.player.sprite.y , this.player.sprite.height , this.player.sprite.width)
            }  
        }else{
            console.log("Attack will be blocked");
            
        }
    }
    private coolDown() : void{
        let interval = setInterval(()=>{
            this.countDown = false
            clearInterval(interval)
      },300)
    }
}