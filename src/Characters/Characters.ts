import Game from '../Game'

export default class Characters{
    protected x = 0
    protected y = 0
    protected vx = 0
    protected vy = -5
    protected speed = 4
    protected id:any
    public sprite: PIXI.extras.AnimatedSprite
    //frames for movemen
    public health:number;
    protected Temp_Frameset: any = []
    protected jumpFrames:any = []
    protected leftFrames:any = []
    protected rightFrames:any = []
    protected holdFrame:any = []
    protected Animationplaying!:string
    protected attackBehavior !: AttackBehavior;
    protected healthbar:any

    constructor(x: number, y: number, tileset: string , spriteName:string , health:number){
        this.id = PIXI.loader.resources[tileset].textures

        //giving every character his one health value
        this.health = health

        //standard holding frame
        var tempFrame = {
            texture: PIXI.loader.resources[tileset].textures!['hold.png'],
            time: 200
        }

        this.Temp_Frameset.push(tempFrame)
        this.sprite = new PIXI.extras.AnimatedSprite (
            this.Temp_Frameset
        )
        this.sprite.x = x 
        this.sprite.y = y
        
       //characters in canvas
        Game.getInstance().characterContainer.addChild(this.sprite)
        

        console.log(this.sprite);
    }

    //make the character move
    public update () : void {
        this.sprite.x = this.x
        this.sprite.y = this.y
    }

    public move(vx: number, vy:number) : void {        
        //Get all colliders from map
        let tiles = Game.getInstance().tile.tiles
        let willCollide = false        

        //Check for collisions between player and tiles
        for(const tile of tiles) {
            if (tile.isColliding(this.sprite.x + vx, this.sprite.y + vy , this.sprite.height , this.sprite.width)) {
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