import Characters from "./Characters";

export default class Player extends Characters{
    constructor(x: number, y: number){
        super(x, y, 'player_moves' , 'left_walk1.png') 
        this.x = x
        this.y = y
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
    }

    //Handle keypress events
    keyPressed(keyState: any){        
        if (keyState[87]) { //w - up
            this.move(0, -12)            
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
        }else{
            this.sprite.stop();
        }
    }    
}