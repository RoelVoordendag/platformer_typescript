import Characters from "./Characters";

export default class Enemy extends Characters{
    constructor(x:number , y:number){
        super(x , y , "enemy" , "hold.png")
        this.x = x
        this.y = y
    }
}