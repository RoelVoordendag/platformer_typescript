import Characters from "./Characters";
import Game from "../game";

export default class Enemy extends Characters{

    private randomNumber:number

    constructor(x:number , y:number){
        super(x , y , "enemy" , "hold.png" , 100)
        this.x = x
        this.y = y

        this.speed = 4

        this.randomNumber = 0

        setTimeout(() => this.enemyMoveGenerator(), 500 )

         // add bottom healthbar
        //  let bottomHealthbar = new PIXI.Graphics();
        //  bottomHealthbar.beginFill(0x444444);
        //  bottomHealthbar.drawRect(0, 0, 100, 15);
        //  bottomHealthbar.endFill();
        //  this.sprite.addChild(bottomHealthbar); // add bottom healthbar to container
         // add healthbar
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
        this.health -= 33;
        if(this.health == 0 || this.health <0){
            this.sprite.removeChild(this.healthbar)
            this.sprite.visible = false
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