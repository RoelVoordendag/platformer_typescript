import Characters from "./Characters";
import Game from "../game";

export default class Enemy extends Characters{

    private randomNumber:number

    constructor(x:number , y:number){
        super(x , y , "enemy" , "hold.png" , 3)
        this.x = x
        this.y = y

        this.speed = 4

        this.randomNumber = 0

        setTimeout(() => this.enemyMoveGenerator(), 500 )
    }
    enemyMove(){    
           //random number determines which direction the player goes to
        // if(this.randomNumber <= 250){
        //     // rigth
        //     this.move(this.speed , 0)            
        // }else if(this.randomNumber <=500 && this.randomNumber >= 250){
        //     // left
        //     this.move(-this.speed , 0)  
        // }else if(this.randomNumber <=750 && this.randomNumber >= 500){
        //     //up
        //     this.move(0 , -this.speed)    
        // }
    }
    checkCollsionForAttack(x: number, y: number , height:number , width:number ) : boolean{
        if (
            x + width> this.x
            && x < this.x + width
            && y + height > this.sprite.y
            && y < this.sprite.y + height         
        ) {
            console.log("it work");

            this.health -= 1

            console.log(this.health);
        
            return true
        }
        return false

    }
    enemyMoveGenerator(){
        //with the random generatad number the enemy goes a certain with what will not be predictable
        this.randomNumber =  Math.floor((Math.random() * 750) + 1);
        
        this.enemyMove()
        //to keep generating random numbers
        setTimeout(() => this.enemyMoveGenerator(), 1000 )
    }
}