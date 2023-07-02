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

const run = () => {
  draw()
}

const draw = () => {
  const graphics = new PIXI.Graphics()

  graphics.lineStyle(2, 0xdddddd, 1)

  for (const row of cells) {
    for (const cell of row) {
      const x = cell.col * cellSize
      const y = cell.row * cellSize

      if (cell.col === 0 && cell.row === 0) {
        console.log(x, y)
      }

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

run()
