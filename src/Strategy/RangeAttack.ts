import Player from "../Characters/Player";
import Enemy from "../Characters/Enemy";
import Rock from "../Rock";
import Game from "../game";

export default class RangeAttack implements AttackBehavior {
    private player:Player
    public attackFrames: any = []
    private countDown:boolean
    private rock!:Rock
    private game:Game
    constructor(player:Player , g:Game){
        //get player entity
        this.player = player;
        //setting up countdown
        this.countDown = false
        //setting up game entity
        this.game = g
    }
    public attack() : void{
        console.log("ik ben een range attack");       
        if(!this.countDown){
            for (let i= 1;i <= 2;i++) {        
                var tempFrame = {
                    texture: PIXI.loader.resources['player_attack'].textures!['punch-'+ 2   + '.png'],
                    time: 200
                }                     
                this.attackFrames.push(tempFrame)
            }  

            this.coolDown()       

            this.countDown = true
            
            this.player.sprite.textures = this.attackFrames

            this.rock = new Rock(this.player.sprite.x , this.player.sprite.y , this.game)
           this.game.addRock(this.rock)
            
        }else{
            // console.log("Attack is Blocked");
        }
    }
    private coolDown() : void{
        let interval = setInterval(()=>{
            this.countDown = false
            clearInterval(interval)
      },300)
    }
}