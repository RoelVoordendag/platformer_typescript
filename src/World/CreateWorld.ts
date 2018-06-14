import Tile from "./Tile"
import Game from "../Game"

export default class CreateWorld{
    private x:number;
    private y:number; 
    private length:number
    private heigth:number;
    private texture:string;
    public tiles: Array<Tile> = new Array

    constructor(length:number , heigth:number , texture:string){
        this.x = 0;
        this.y = 1;
        this.length = length;
        this.heigth = heigth;
        //standard filling texture
        this.texture = texture;
        //filling the length of the map with filler 
        for(let q=1; q<= this.heigth; q++){
            for(let i=0; i< this.length; i ++){
                //top Layer needs to be a different sprite
                if(this.y == this.heigth){
                    this.texture = "normal.png"
                }
                if(this.x ==0 && this.y == this.heigth){
                    this.texture = "left.png"
                }                
                let tile = new Tile(this.x , this.y , this.texture)
                this.tiles.push(tile)
                this.x+=64;
            }
            this.y+=1;         
            this.x=0;   
        }
    }
}