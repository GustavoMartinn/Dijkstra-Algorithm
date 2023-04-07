import { useState } from 'react';
import './App.css';
import { GridCell } from './Components/GridCell';
import { Cell, Matrix } from './DataStructures/Matrix';
import { Queue } from './DataStructures/Queue';

const matrix = new Matrix(10,20);
const queue = new Queue();

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setUpdate] = useState(0);
  const handleSetCell = (x: number, y: number, cell: Cell) => {
    matrix.setCell(x, y, cell);
    setUpdate((prevState) => prevState + 1);
  };

  const handleStartSearch = async () => {
    const startCell = matrix.getCell(0, 0);
    const endCell = matrix.getCell(9, 19);
    queue.enqueue(startCell);
    matrix.setCell(0, 0, { ...startCell, isExplored: true });
    while (!queue.isEmpty()) {
      setUpdate((prevState) => prevState + 1);
      await new Promise((resolve) => setTimeout(resolve, 1));
      const currentCell = queue.dequeue();
      if (currentCell === endCell) {
        getPath(currentCell);
        break;
      }

      if (!currentCell) break;

      const neighbors = matrix.getCloseCells(currentCell?.x, currentCell?.y);
      neighbors.forEach((neighbor) => {
        if (!neighbor.isExplored && !neighbor.isWall) {
          neighbor.isExplored = true;
          neighbor.isPath = false;
          neighbor.parent = currentCell;
          console.log(neighbor);
          queue.enqueue(neighbor);
        }
      });
    }
  };

  const getPath = (cell: Cell | undefined) => {
    if (!cell) return;

    if (cell.parent) {
      cell.isPath = true;
      setUpdate((prevState) => prevState + 1);
      getPath(cell.parent);
    }
  };

  const handleResetPath = () => {
    matrix.reset();
    queue.clear();
    setUpdate((prevState) => prevState + 1);
  };

  const handleResetWalls = () => {
    matrix.resetWalls();
    setUpdate((prevState) => prevState + 1);
  };

  return (
    <div className="App">
      <div className="actions">
        <button onClick={handleStartSearch}>Start</button>
        <button onClick={handleResetPath}>Reset Path</button>
        <button onClick={handleResetWalls}>Reset Walls</button>
      </div>
      <div className="grid">
        {matrix.getMatrix().map((col, rowIndex) => {
          return col.map((cell, colIndex) => {
            return (
              <GridCell 
                row={rowIndex}
                col={colIndex}
                key={`${rowIndex}-${colIndex}`}
                isExplored={cell.isExplored}
                isPath={cell.isPath}
                isWall={cell.isWall}
                setCell={handleSetCell}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default App;
