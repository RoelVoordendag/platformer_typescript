export default class XPbar{
    public xp:number;
    public xpbarStyle!:any

    private static instance: XPbar;
    private constructor(){
        console.log("xpbar is getting ther");
        this.xp = 0;
        // this.xpbar = new PIXI.DisplayObject
    }
    //singleton function 
    static getInstance():  XPbar{
      if (!XPbar.instance) { 
          XPbar.instance = new XPbar();
      }
      return XPbar.instance;
    }
    add(xp:number){

    }
    clear(){
        this.xp = 0
    }
}