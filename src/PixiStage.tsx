import { useEffect, useRef } from "react";
import { Game } from "./Game";

interface PixiStageProps {
  className?: string;
}

export default function PixiStage({ className }: PixiStageProps) {
  const container = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    // 1. Instantiate the game logic
    if (!gameRef.current) {
      const game = new Game();
      gameRef.current = game;
    }

    // 3. Initialize it into the DOM
    if (container.current) {
      gameRef.current.init(container.current).catch(console.error);
    }

    // 3. Cleanup on unmount
    return () => {
      if (gameRef.current) {
        gameRef.current.destroy();
      }
      gameRef.current = null;
    };
  }, []);

  // The container just needs to fill the space you want the game to occupy
  return <div ref={container} className={className} />;
}
