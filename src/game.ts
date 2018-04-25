import PixiSingleton from "./PixiSingleton";

class Game {
  constructor() {
    // initialize canvas
    PixiSingleton.setInstance(new PIXI.Application(800, 600, { backgroundColor: 0x1099bb }))
    document.body.appendChild(PixiSingleton.getInstance().view);


    console.log("Loaded Game")
  }
}

window.addEventListener("load", () => new Game())