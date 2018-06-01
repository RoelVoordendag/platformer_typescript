import Game from '../Game'

export default class Characters{
    protected x = 0
    protected y = 0
    protected vx = 0
    protected vy = -5
    protected speed = 4
    protected id:any;
    protected sprite: PIXI.Sprite

    constructor(x: number, y: number, tileset: string , spriteName:string){
        this.id = PIXI.loader.resources[tileset].textures

        this.sprite = new PIXI.Sprite(this.id[spriteName]);

        this.sprite.x = x 
        this.sprite.y = y
        this.sprite.width = 64
        this.sprite.height = new PIXI.Sprite(this.id[spriteName]).height
               
       
        Game.getInstance().pixi.stage.addChild(this.sprite)
    }

    //make the character move
    update () {
        this.sprite.x = this.x
        this.sprite.y = this.y

    }

    move(vx: number, vy:number) {        
        //Get all colliders from map
        let tiles = Game.getInstance().tile.tiles
        let willCollide = false

        //Check for collisions between player and tiles
        for(const tile of tiles) {
            if (tile.isColliding(this.sprite.getBounds().right + vx, this.sprite.getBounds().bottom + vy , this.sprite.getBounds().top)) {
                willCollide = true                
                break
            }
        }
        //If there is no collision, move!
        if (!willCollide) {
            this.x += vx
            this.y += vy
        }     
                
    }
}