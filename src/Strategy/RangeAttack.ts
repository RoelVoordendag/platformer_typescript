import Player from "../Characters/Player";

export default class RangeAttack implements AttackBehavior {
    private player:Player
    constructor(player:Player){
        //get player entity '
        this.player = player;
    }
    attack(){
        console.log("ik ben een range attack");
    }
}