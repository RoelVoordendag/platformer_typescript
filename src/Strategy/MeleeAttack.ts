import Player from "../Characters/Player";
import Enemy from "../Characters/Enemy";

export default class MeleeAttack implements AttackBehavior{
    private player: Player;
    public range!:number
    public enemy:Enemy
    public attackFrames: any =[]
    private countDown:boolean
    constructor(player:Player, e:Enemy){
        //get player property here 
        this.player = player;  
        //setting range for the attack
        this.range =+ 30;
        this.enemy = e
        //setting up countdown
        this.countDown = false
    }
    attack(){
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
            
            this.enemy.checkCollsionForAttack(this.player.sprite.x + this.range , this.player.sprite.y , this.player.sprite.height , this.player.sprite.width)
        }else{
            console.log("Attack will be blocked");
            
        }
    }
    coolDown(){
        let interval = setInterval(()=>{
            this.countDown = false
            console.log("cooldown" + this.coolDown);
            clearInterval(interval)
      },300)
    }
}