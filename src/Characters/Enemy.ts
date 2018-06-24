import Characters from "./Characters";
import Game from "../game";
import Observer from "../Observers/Observer";

export default class Enemy extends Characters implements Observer{

    private randomNumber:number
    private game:Game
    private countDown:boolean


    constructor(x:number , y:number , g:Game){
        super(x , y , "enemy" , "hold.png" , 100)
        this.x = x
        this.y = y

        this.game = g 

        this.speed = 4

        this.randomNumber = 0

        this.countDown = false

        setTimeout(() => this.enemyMoveGenerator(), 500 )

         let healthbar = new PIXI.Graphics();
         this.healthbar = healthbar;
         this.healthbar.beginFill(0xF33636);
         this.healthbar.drawRect(-28, -28, 100, 15);
         this.healthbar.endFill();
         this.sprite.addChild(this.healthbar); // add top healthbar to containe
    }
    public enemyMove(): void{    
        // random number determines which direction the player goes to
        if(this.randomNumber <= 250){
            // rigth
            this.move(3 , 0)            
        }else if(this.randomNumber <=500 && this.randomNumber >= 250){
            // left
            this.move(-3 , 0)  
        }

        if(this.health > 0){
         this.healthbar.width = this.health
        }else{
            this.healthbar.width = 0 
        }

    }
    public checkCollsionForAttack(x: number, y: number , height:number , width:number ) : boolean{
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
    public damage() : void{
        if(this.health == 0 || this.health <0){
            this.game.characterContainer.removeChild(this.sprite)
            this.sprite.removeChild(this.healthbar)
            this.sprite.y = -100
        }        
        this.health -= 33.4;
    }
    private enemyMoveGenerator()  :void{
        //with the random generatad number the enemy goes a certain with what will not be predictable
        this.randomNumber =  Math.floor((Math.random() * 500) + 1);
        
        this.enemyMove()
        //to keep generating random numbers
        setTimeout(() => this.enemyMoveGenerator(), 500 )
    }

    public notify() : void{
        if(!this.countDown){
            this.damage()

            console.log("enemy has been notified got damage");

            this.countDown = true

            this.coolDown() 
        }
    }

    private coolDown() : void{
        let interval = setInterval(()=>{
            this.countDown = false
            clearInterval(interval)
      },1000)
    }
}