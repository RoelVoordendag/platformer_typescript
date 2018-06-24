import Game from "../Game"
import Characters from "../Characters/Characters";


export default class Tile{
    public x:number;
    public y:number;
    public width: number = 64
    public heigth: number = 64
    public texture:string;
    private sprite: PIXI.Sprite;
        
    constructor(x:number , y:number , texture:string ){
        this.x = x;
        this.y = y;
        this.texture = texture;
        let id:any = PIXI.loader.resources["tileset"].textures; 
        this.sprite = new PIXI.Sprite(id[this.texture]);
        this.sprite.x = this.x; 
        this.sprite.y = window.innerHeight - this.sprite.height * this.y;

        Game.getInstance().worldContainer.addChild(this.sprite);
    }

    //check collision between given sprite and tiles
    public isColliding(x: number, y: number , height:number , width:number ): boolean {          
        if (
            x + width> this.x
            && x < this.x + width
            && y + height > this.sprite.y
            && y < this.sprite.y + height         
        ) {
            return true
        }
        return false
    }
}