import Game from "../Game"

export default class Map{
    public x:number;
    public y:number;
    public texture:string;
    private sprite: PIXI.Sprite;
        
    constructor(x:number , y:number , texture:string ){
        
        //x and y
        this.x = x;
        this.y = y;
        this.texture = texture;

        let id:any = PIXI.loader.resources["tileset"].textures; 

        this.sprite = new PIXI.Sprite(id[this.texture]);

        this.sprite.x = this.x;

        console.log(this.y);
        
        this.sprite.y = window.innerHeight - this.sprite.height * this.y;
        
        console.log("tile is created" + "y=" + this.sprite.y + "x=" + this.sprite.x );

        console.log(this.texture);
        Game.getInstance().pixi.stage.addChild(this.sprite);
    }
}