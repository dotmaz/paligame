import * as PIXI from "pixi.js";

const GAME_WIDTH = 1200;
const GAME_HEIGHT = 800;

export class Game {
  public app: PIXI.Application;
  private keys: { [key: string]: boolean } = {};

  // Game properties
  private player: PIXI.Graphics | null = null;

  // Store bound handlers so we can remove them later
  private keydownHandler: (e: KeyboardEvent) => void;
  private keyupHandler: (e: KeyboardEvent) => void;
  private keypressHandler: (e: KeyboardEvent) => void;
  private clickHandler: (e: MouseEvent) => void;

  private currentScene: "menu" | "order" = "menu";

  constructor() {
    this.app = new PIXI.Application();
    // Bind handlers once
    this.keydownHandler = (e: KeyboardEvent) => {
      this.keys[e.key.toLowerCase()] = true;
    };
    this.keyupHandler = (e: KeyboardEvent) => {
      this.keys[e.key.toLowerCase()] = false;
    };
    this.keypressHandler = (e: KeyboardEvent) => {
      console.log(`PRESSING ${e.key}`);
    };
    this.clickHandler = (e: MouseEvent) => {
      if (this.currentScene === "menu") {
        this.secondScene();
      }
      if (this.currentScene === "order") {
      }
    };
  }

  public async init(element: HTMLElement) {
    await this.app.init({
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
      background: "#fff",

      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    element.appendChild(this.app.canvas);

    this.setupInput();
    await this.firstScene();

    // Start the game loop
    this.app.ticker.add(() => this.update());
  }

  private setupInput() {
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
    window.addEventListener("keypress", this.keypressHandler);
    this.app.canvas.addEventListener("click", this.clickHandler);
  }

  private async firstScene() {
    console.log("firstScene");
    // Load the image using Assets.load (required in PixiJS v8)
    const texture = await PIXI.Assets.load("/sprites/juiceteam.jpeg");
    const sprite = new PIXI.Sprite(texture);
    sprite.x = 0;
    sprite.y = 0;
    sprite.width = GAME_WIDTH;
    sprite.height = GAME_HEIGHT;

    this.app.stage.addChild(sprite);
  }

  private async secondScene() {
    this.currentScene = "order";
    this.app.stage.removeChildren();
  }

  // This is the main game loop
  private update() {
    if (!this.player) return;
  }

  public destroy() {
    // Clean up listeners
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);

    // Destroy the app and remove the view
    // Using optional chaining and checks to be safe
    if (this.app && this.app.renderer) {
      this.app.destroy({ removeView: true }, { children: true });
    }
  }
}
