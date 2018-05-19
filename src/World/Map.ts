import Game from "../game"

export default class Map{
    public x:number;
    public y:number;
    public texture:string;
    private sprite: PIXI.Sprite;
        
    constructor(x:number , y:number , texture:string ){
        console.log("tile is created");
        
        //x and y
        this.x = x;
        this.y = y;
        this.texture = texture;

        let id:any = PIXI.loader.resources["res/images/treasureHunter.json"].textures; 

        this.sprite = new PIXI.Sprite(id[this.texture]);

        this.sprite.x = this.x;
        this.sprite.y = this.y;

        // Game.getInstance().pixi.stage.addChild(this.sprite);

    }
}