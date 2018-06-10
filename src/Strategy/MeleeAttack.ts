import Player from "../Characters/Player";

export default class MeleeAttack implements AttackBehavior{
    private player: Player;
    public attackFrames:any = []
    constructor(player:Player){
        //get player property here 
        this.player = player;        
    }
    attack(){
        // for (let i = 0; i<=2; i++) {
        //     var tempFrame = {
        //         texture: PIXI.loader.resources['player_attack'].textures!['punch-' + i + '.png'],
        //         time: 200
        //     }            
        //     this.attackFrames.push(tempFrame)
        // }
        // var tempFrame = {
        //     texture: PIXI.loader.resources["player_attack"].textures!["punch-1.png"],
        //     time:200
        // }
        // this.attackFrames.push(tempFrame)

        for (let  i= 1;i <= 2;i++) {
            var tempFrame = {
                texture: PIXI.loader.resources['player_attack'].textures!['punch-'+ i + '.png'],
                time: 200
            }         
            this.attackFrames.push(tempFrame)  
        }
        var tempFrame = {
            texture: PIXI.loader.resources['player_attack'].textures!['punch-1.png'],
            time:200
        }
        this.attackFrames.push(tempFrame)

        this.player.sprite.textures = this.attackFrames

        console.log("FRAMES ARE LOADED" + this.attackFrames)
        
        
    }              
}