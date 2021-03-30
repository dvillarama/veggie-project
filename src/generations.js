/**
 * Given a position return 1 if there is a neighbor
 * - grid - starting grid
 * - i - cell position
 * - j - cell position
 */
const neighbor = (grid, i, j) => {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) {
    return { count: 0, adult: 0 };
  }

  const count = !!grid[i][j] ? 1 : 0;
  const adult = grid[i][j] === 2 ? 1 : 0;
  const value = grid[i][j]
  return { count, adult };
};

/**
 * Count neighbors of a cell
 * - grid - starting grid
 * - i - cell position
 * - j - cell position
 * return the number of neighbors
 */
const neighbors = (grid, i, j) => {
  const leftTop = neighbor(grid, i - 1, j - 1);
  const top = neighbor(grid, i - 1, j);
  const rightTop = neighbor(grid, i - 1, j + 1);
  const left = neighbor(grid, i, j - 1);
  const right = neighbor(grid, i, j + 1);
  const leftBottom = neighbor(grid, i + 1, j - 1);
  const bottom = neighbor(grid, i + 1, j);
  const rightBottom = neighbor(grid, i + 1, j + 1);

  const total =
    leftTop.count +
    top.count +
    rightTop.count +
    left.count +
    right.count +
    leftBottom.count +
    bottom.count +
    rightBottom.count;

  const adult =
    leftTop.adult +
    top.adult +
    rightTop.adult +
    left.adult +
    right.adult +
    leftBottom.adult +
    bottom.adult +
    rightBottom.adult;
  return { total, adult };
};

/**
 * Calculate the next value of the cell
 * - value - current value
 * - neighbors - number of neighbors
 * return the next value
 */
const nextCell = (value, neighbors, adult) => {
  if (value === 0) {
    if (adult === 2) {
      return 1;
    } else {
      0;
    }
  } else if (value === 1) {
    if (neighbors >= 5 || neighbors <= 1) {
      return 0;
    } else {
      return 2;
    }
  } else if (value === 2) {
    if (neighbors >= 3 || neighbors === 0) {
      return 0;
    } else {
      return 3;
    }
  }

  return 0;
};

/**
 * Computes one generation
 *  - grid - starting generation
 *  - returns a grid with the next generation
 */
const next = (grid) => {
  const nextGrid = Array.from(Array(grid.length), () => Array(grid[0].length));
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const value = grid[i][j];
      const { total, adult } = neighbors(grid, i, j);
      const nextValue = nextCell(value, total, adult);
      nextGrid[i][j] = nextValue;
    }
  }
  return nextGrid;
};

/**
 * Generations
 *  - grid - starting generation
 *  - generation - number of generations to compute
 *  - returns the grid at the generation
 */
const nextGenerations = (grid, generation) => {
  let endGeneration = grid;
  for (let i = 0; i < generation; i++) {
    endGeneration = next(endGeneration);
  }

  console.log({endGeneration});
  return endGeneration;
};

module.exports = { next, nextGenerations, neighbors };
