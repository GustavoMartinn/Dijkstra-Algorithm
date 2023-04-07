import { FC } from 'react';
import { Cell } from '../../DataStructures/Matrix';

interface GridCellProps {
  row: number;
  col: number;
  isExplored: boolean;
  isPath: boolean;
  isWall: boolean;
  setCell: (x: number, y: number, cell: Cell) => void
}

export const GridCell: FC<GridCellProps> = ({
  row,
  col,
  isExplored,
  isPath,
  isWall,
  setCell
}) => {
  // const [className, setClassName] = useState('grid-cell');

  const handleClick = () => {
    console.log('clicou');
    setCell(row, col, {
      isExplored: false,
      isPath: false,
      isWall: !isWall,
      x: row,
      y: col,
    });
  };

  return (
    <button 
      className={
        row === 0 && col === 0 ? 'cell start' : 
          row === 9 && col === 19 ? 'cell end' : 
            isPath ? 'cell path' : 
              isExplored ? 'cell explored' : 
                isWall ? 'cell wall' : 
                  'cell'
      } 
      onClick={handleClick}
    >
      
    </button>
  );
};