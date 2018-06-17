import GameObject from "./GameObject";
import Game from "../game";

export default class RangePickUp extends GameObject{
    constructor(x:number , g:Game ){
        super(x , 'pickups' , "redJewel.png" , g)
    }
}