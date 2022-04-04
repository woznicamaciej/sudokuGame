import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './Board';

export type SudokuRowType = (number)[];
export type SudokuType = SudokuRowType[];

const start: SudokuType = [
[0,3,0,2,5,1,6,4,9],
[2,7,6,9,8,4,5,3,1],
[0,4,5,6,7,3,8,2,7],
[5,1,4,3,7,8,9,6,2],
[3,6,7,4,2,9,1,8,5],
[8,2,9,5,6,1,3,7,4],
[4,8,2,1,9,6,7,5,3],
[7,5,1,8,3,2,4,9,6],
[6,3,3,7,4,5,2,1,8],
]

function App() {
  const [sudoku, setSudoku] = useState(start)
  const [errorsRow, setErrorsRow] = useState<Array<[number, number]>>([])
  const [errorsCol, setErrorsCol] = useState<Array<[number, number]>>([])
  const [errorsBox, setErrorsBox] = useState<Array<[number, number]>>([])


  const validateRow = (sudoku: SudokuType) => {
    let errors: Array<[number, number]> = []
    sudoku.forEach((row: SudokuRowType, rowIndex: number) => {
      let temp: number[] = []
      row.forEach((item, colIndex) => {
        if(item && temp.includes(item)) {
          errors.push([colIndex, rowIndex])
        }
        temp.push(item)
      })
    })
    setErrorsRow(errors)
  }

  const validateColumn = (sudoku: SudokuType) => {
    let errors: Array<[number, number]> = []
    for(let r = 0; r < 9; r++) {
      let temp: number[] = []
      for(let c = 0 ; c < 9; c++) {
        if(sudoku[c][r] && temp.includes(sudoku[c][r])) {
          errors.push([c,r])
        }
        temp.push(sudoku[c][r])
      }
    }
    setErrorsCol(errors)
  }

  const validateBox = (sudoku: SudokuType) => {
    let errors: Array<[number, number]> = []
    for(let b = 0; b < 9; b++) {
      let temp: number[] = []
      for(let p = 0 ; p < 9; p++) {
        const c = p%3+b%3*3
        const r = Math.floor(p/3)+Math.floor(b/3)*3
        if(sudoku[c][r] && temp.includes(sudoku[c][r])) {
          errors.push([c,r])
        }
        temp.push(sudoku[c][r])
      }
    }
    setErrorsBox(errors)
  }

  useEffect(() => {
    validateRow(sudoku)
    validateColumn(sudoku)
    validateBox(sudoku)
  }, [sudoku])

  return (
    <div className="App">
      <Board
        sudoku={sudoku}
        errorsRow={errorsRow}
        errorsCol={errorsCol}
        errorsBox={errorsBox}
      />
    </div>
  );
}

export default App;
