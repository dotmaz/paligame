import PixiStage from "./PixiStage";
import "./index.css";

function App() {
  return (
    <div className="app">
      <p id="title">PaliGame</p>
      <div className="game">
        <PixiStage className="pixi-container" />
      </div>
    </div>
  );
}

export default App;
