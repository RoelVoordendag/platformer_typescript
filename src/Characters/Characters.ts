import Game from '../Game'

export default class Characters{
    protected x = 0
    protected y = 0
    protected vx = 0
    protected vy = -5
    protected speed = 4
    protected id:any
    protected sprite: PIXI.extras.AnimatedSprite
    //frames for movemen
    protected Temp_Frameset: any = []
    protected jumpFrames:any = []
    protected leftFrames:any = []
    protected rightFrames:any = []
    protected Animationplaying!:string

    constructor(x: number, y: number, tileset: string , spriteName:string){
        this.id = PIXI.loader.resources[tileset].textures

        //standard holding frame
        var tempFrame = {
            texture: PIXI.loader.resources.player_moves.textures!['hold.png'],
            time: 200
        }

        this.Temp_Frameset.push(tempFrame)
        this.sprite = new PIXI.extras.AnimatedSprite (
            this.Temp_Frameset
        )

        this.sprite.x = x 
        this.sprite.y = y
        // this.sprite.width = new PIXI.Sprite(this.id[spriteName]).width
        // this.sprite.height = new PIXI.Sprite(this.id[spriteName]).height
        
       //characters in canvas
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

            // console.log(this.sprite.getGlobalPosition().x , this.sprite.getGlobalPosition().y);            
            if (tile.isColliding(this.sprite.getGlobalPosition().x + vx, this.sprite.getBounds().bottom +vy)) {
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