export type Cell = {
  isExplored: boolean;
  isPath: boolean;
  isWall: boolean;
  parent?: Cell;
  x: number;
  y: number;
}

export class Matrix {
  m: number;
  n: number;
  matrix: Cell[][];

  constructor(m: number, n: number) {
    this.m = m;
    this.n = n;
    this.matrix = [];
    for (let i = 0; i < m; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < n; j++) {
        this.matrix[i][j] = {
          isExplored: false,
          isPath: false,
          isWall: false,
          x: i,
          y: j,
        };
      }
    }
  }
  
  getCell(x: number, y: number) {
    return this.matrix[x][y];
  }
  
  setCell(x: number, y: number, cell: Cell) {
    this.matrix[x][y] = cell;
  }

  getCloseCells(x: number, y: number) {
    const cells = [];
    if (x > 0) {
      const possibleCell = this.getCell(x - 1, y);
      if (!possibleCell.isWall && !possibleCell.isExplored)  cells.push(possibleCell);
    }
    if (x < this.m - 1) {
      const possibleCell = this.getCell(x + 1, y);
      if (!possibleCell.isWall && !possibleCell.isExplored)  cells.push(possibleCell);
    }
    if (y > 0) {
      const possibleCell = this.getCell(x, y - 1);
      if (!possibleCell.isWall && !possibleCell.isExplored)  cells.push(possibleCell);
    }
    if (y < this.n - 1) {
      const possibleCell = this.getCell(x, y + 1);
      if (!possibleCell.isWall && !possibleCell.isExplored)  cells.push(possibleCell);
    }
    return cells;
  }

  getMatrix() {
    return this.matrix;
  }

  reset() {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.matrix[i][j].isExplored = false;
        this.matrix[i][j].isPath = false;
        this.matrix[i][j].parent = undefined;
      }
    }
  }

  resetWalls() {
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        this.matrix[i][j].isWall = false;
      }
    }
  }
}