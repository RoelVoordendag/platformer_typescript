import Map from "./Map"

export default class CreateWorld{
    private x:number;
    private y:number; 
    private length:number
    private heigth:number;
    private texture:string;
    constructor(length:number , heigth:number){
        this.x = 0;
        this.y = 1;
        this.length = length;
        this.heigth = heigth;
        
        this.texture = "fill.png"

        for(let q=1; q<= this.heigth; q++){
            for(let i=0; i< this.length; i ++){
                if(this.y == this.heigth){
                    this.texture = "normal.png"
                }
                let map = new Map( this.x , this.y , this.texture)
                this.x+=64;
            }
            this.y+=1;         
            this.x=0;   
        }
    }
}