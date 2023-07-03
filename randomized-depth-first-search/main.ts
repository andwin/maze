import * as PIXI from 'pixi.js'

import '../style.css'

type Cell = {
  row: number
  col: number
  visited: boolean
  top: boolean
  right: boolean
  bottom: boolean
  left: boolean
}
type Row = Cell[]

const width = 800
const height = 600
const cellSize = 20

const rows = Math.floor(height / cellSize)
const cols = Math.floor(width / cellSize)
const cells: Row[] = []

for (let row = 0; row < rows; row++) {
  cells[row] = []

  for (let col = 0; col < cols; col++) {
    cells[row][col] = {
      row,
      col,
      visited: false,
      top: true,
      right: true,
      bottom: true,
      left: true,
    }
  }
}

const app = new PIXI.Application({
  width,
  height,
  backgroundColor: 0x1099bb,
})

document.querySelector('#app')!.appendChild(app.view as HTMLCanvasElement)

/**
 * Randomized depth-first search - recursive implementation
 *
 * https://en.wikipedia.org/wiki/Maze_generation_algorithm
 *
 * 1. Given a current cell as a parameter
 * 2. Mark the current cell as visited
 * 3. While the current cell has any unvisited neighbour cells
 *   1. Choose one of the unvisited neighbours
 *   2. Remove the wall between the current cell and the chosen cell
*    3. Invoke the routine recursively for the chosen cell
*/

const run = (currentCell: Cell) => {
  currentCell.visited = true

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const neighbours = getNeighbours(currentCell)
    if (!neighbours.length) return

    const nextCell = randomItem(neighbours)
    removeWall(currentCell, nextCell)

    run(nextCell)
  }
}

const getNeighbours = (cell: Cell): Cell[] => {
  const neighbours: Cell[] = []
  const { row, col } = cell

  if (cells[row - 1]?.[col]?.visited === false) neighbours.push(cells[row - 1][col])
  if (cells[row]?.[col + 1]?.visited === false) neighbours.push(cells[row][col + 1])
  if (cells[row + 1]?.[col]?.visited === false) neighbours.push(cells[row + 1][col])
  if (cells[row]?.[col - 1]?.visited === false) neighbours.push(cells[row][col - 1])

  return neighbours
}

const randomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]

const removeWall = (currentCell: Cell, nextCell: Cell) => {
  if (currentCell.row > nextCell.row) {
    currentCell.top = false
    nextCell.bottom = false
  }

  if (currentCell.col < nextCell.col) {
    currentCell.right = false
    nextCell.left = false
  }

  if (currentCell.row < nextCell.row) {
    currentCell.bottom = false
    nextCell.top = false
  }

  if (currentCell.col > nextCell.col) {
    currentCell.left = false
    nextCell.right = false
  }
}

const draw = () => {
  const graphics = new PIXI.Graphics()

  graphics.lineStyle(2, 0xdddddd, 1)

  for (const row of cells) {
    for (const cell of row) {
      const x = cell.col * cellSize
      const y = cell.row * cellSize

      if (cell.top) {
        graphics.moveTo(x, y)
        graphics.lineTo(x + cellSize, y)
      }

      if (cell.right) {
        graphics.moveTo(x + cellSize, y)
        graphics.lineTo(x + cellSize, y + cellSize)
      }

      if (cell.bottom) {
        graphics.moveTo(x + cellSize, y + cellSize)
        graphics.lineTo(x, y + cellSize)
      }

      if (cell.left) {
        graphics.moveTo(x, y + cellSize)
        graphics.lineTo(x, y)
      }
    }
  }

  app.stage.addChild(graphics)
}

const initalCell = cells[0][0]
run(initalCell)
draw()
