import Characters from "./Characters";
import MeleeAttack from "../Strategy/MeleeAttack";
import Game from "../game";
import Enemy from "./Enemy";

export default class Player extends Characters{
    public enemy:Enemy
    constructor(x: number, y: number , e:Enemy){
        super(x, y, 'player_moves' , 'left_walk1.png' , 5) 
        this.x = x
        this.y = y

        this.enemy =e 

        //the standard attack for player is Melee Attack
        this.attackBehavior = new MeleeAttack(this , this.enemy);

        //setting up the animation
        // this is for the right walk
        for (let  i= 1;i <= 2;i++) {
            var tempFrame = {
                texture: PIXI.loader.resources['player_moves'].textures!['rigth_walk'+ i + '.png'],
                time: 200
            }         
            this.rightFrames.push(tempFrame)  
        }
        var tempFrame = {
            texture: PIXI.loader.resources['player_moves'].textures!['rigth_walk1.png'],
            time:200
        }
        this.rightFrames.push(tempFrame)
        
        //this is for the left walking 
        for (let i = 1;i <=2; i++){
            var tempFrame = {
                texture: PIXI.loader.resources['player_moves'].textures!['left_walk' + i + '.png'],
                time: 200                   
            }  
            this.leftFrames.push(tempFrame)          
        }
        var tempFrame = {
            texture: PIXI.loader.resources['player_moves'].textures!['left_walk1.png'],
            time:200
        }
        this.leftFrames.push(tempFrame)
        for (let i = 0; i<2; i++){
            var tempFrame = {
                texture: PIXI.loader.resources['player_moves'].textures!['jump.png'],
                time:200
            }
            this.jumpFrames.push(tempFrame)
        }
            var tempFrame = {
                texture: PIXI.loader.resources['player_moves'].textures!['jump.png'],
                time:200
            }
    }

    //Handle keypress events
    keyPressed(keyState: any){        
        if (keyState[87]) { //w - up
            this.move(0, -12) 
            if(this.Animationplaying !== "jump"){
                this.Animationplaying = "jump"
                this.sprite.textures = this.jumpFrames
                this.sprite.play()
            }           
        }
        else if (keyState[65]) { //a - left
            this.move(-this.speed, 0)
            if(this.Animationplaying !== "left"){
                this.Animationplaying = "left"
                this.sprite.textures = this.leftFrames
                this.sprite.play()
            }
        }
        else if (keyState[68]) { //d - right
            this.move(this.speed, 0)
            if(this.Animationplaying !== "right"){
                this.Animationplaying = "right"
                this.sprite.textures = this.rightFrames
                this.sprite.play()
            }
        }else if(keyState[32]) {
            //fixing that button only can be pressed once
            this.Animationplaying = "attack"
            this.attackBehavior.attack();
            this.sprite.play()    
        }else{
            this.Animationplaying = "hold"
            var tempFrame = {
                texture: PIXI.loader.resources.player_moves.textures!['hold.png'],
                time: 200
            }
            this.holdFrame.push(tempFrame)
            this.sprite.textures = this.holdFrame;
            this.sprite.stop();
        }
    }    
}