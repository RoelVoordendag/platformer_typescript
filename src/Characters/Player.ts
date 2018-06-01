import Characters from "./Characters";

export default class Player extends Characters{
    constructor(x: number, y: number){
        super(x, y, 'player_moves' , 'left_walk1.png') 
        this.x = x
        this.y = y
    }

    //Handle keypress events
    keyPressed(keyState: any){
        if (keyState[87]) { //w - up
            this.move(0, -12)            
        }
        else if (keyState[65]) { //a - left
            this.move(-this.speed, 0)
        }
        else if (keyState[68]) { //d - right
            this.move(this.speed, 0)
        }
    }    
}