import Game from "../Game"

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
        
        Game.getInstance().pixi.stage.addChild(this.sprite);
    }

    //check collision between given sprite and tiles
    isColliding(x: number, y: number): boolean {          
        if (
            x + 64 > this.x
            && x < this.x + this.width
            && y + 64 > this.sprite.y
            && y < this.sprite.y + this.heigth
        ) {
            return true
        }
        return false
    }
}