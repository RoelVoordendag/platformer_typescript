import Characters from "./Characters";
import Game from "../game";

export default class Enemy extends Characters{

    private randomNumber:number
    private game:Game

    constructor(x:number , y:number , g:Game){
        super(x , y , "enemy" , "hold.png" , 100)
        this.x = x
        this.y = y

        this.game = g 

        this.speed = 4

        this.randomNumber = 0

        setTimeout(() => this.enemyMoveGenerator(), 500 )

         let healthbar = new PIXI.Graphics();
         this.healthbar = healthbar;
         this.healthbar.beginFill(0xF33636);
         this.healthbar.drawRect(-28, -28, 100, 15);
         this.healthbar.endFill();
         this.sprite.addChild(this.healthbar); // add top healthbar to containe
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
        // console.log(this.health);

        if(this.health > 0){
         this.healthbar.width = this.health
        }else{
            this.healthbar.width = 0 
        }

    }
    checkCollsionForAttack(x: number, y: number , height:number , width:number ) : boolean{
        if (
            x + width> this.x
            && x < this.x + width
            && y + height > this.sprite.y
            && y < this.sprite.y + height         
        ) {
            this.damage();
        
            return true
        }
        return false

    }
    damage(){
        this.health -= 33.4;
        if(this.health == 0 || this.health <0){
            this.game.characterContainer.removeChild(this.sprite)
            this.sprite.removeChild(this.healthbar)
            this.sprite.y = -100
        }
    }
    enemyMoveGenerator(){
        //with the random generatad number the enemy goes a certain with what will not be predictable
        this.randomNumber =  Math.floor((Math.random() * 750) + 1);
        
        this.enemyMove()
        //to keep generating random numbers
        setTimeout(() => this.enemyMoveGenerator(), 1000 )
    }
}