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
      // If you want to clamp it
      // const clampedX = Math.max(0, Math.min(e.offsetX, GAME_WIDTH));
      // const clampedY = Math.max(0, Math.min(e.offsetY, GAME_HEIGHT));
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
    this.createScene();

    // Start the game loop
    this.app.ticker.add(() => this.update());
  }

  private setupInput() {
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
    window.addEventListener("keypress", this.keypressHandler);
    this.app.canvas.addEventListener("click", this.clickHandler);
  }

  private createScene() {
    // Example: Creating a 'player'
    this.player = new PIXI.Graphics();
    this.player.rect(0, 0, 10, 10);
    this.player.fill(0xff4444);
    this.player.x = this.app.screen.width / 2;
    this.player.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.player);
    // this.entities.push(this.player);
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
