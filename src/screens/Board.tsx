import React from 'react';
import {SudokuType, SudokuRowType} from './App';

interface BoardProps {
  sudoku: SudokuType,
  errorsRow: [number,number][],
  errorsCol: [number,number][],
  errorsBox: [number,number][],
}
interface ColorsType {
  [index: string]: string
}
const Board = ({sudoku, errorsRow, errorsCol, errorsBox}: BoardProps) => {
  const bgColor: ColorsType = {
    c: '#fff',
    c100: '#f00',
    c010: '#0f0',
    c001: '#00f',
    c110: '#ff0',
    c101: '#f0f',
    c011: '#0ff',
    c111: '#000',
  }

  return (
    <table>
      {
        sudoku.map((row: SudokuRowType, indexRow: number) => {
          const renderRow = row.map((cell, indexCol) => {
            let bgCell = 'c'
            if (errorsRow.findIndex(item => item[0] === indexRow && item[1] === indexCol) !== -1) 
              {bgCell = bgCell.concat('1')} else {bgCell = bgCell.concat('0')}
            if (errorsCol.findIndex(item => item[0] === indexRow && item[1] === indexCol) !== -1) 
              {bgCell = bgCell.concat('1')} else {bgCell = bgCell.concat('0')}
            if (errorsBox.findIndex(item => item[0] === indexRow && item[1] === indexCol) !== -1) 
              {bgCell = bgCell.concat('1')} else {bgCell = bgCell.concat('0')}

            console.log('test', bgCell, errorsCol)

            return (
              <td style={{background: bgColor[bgCell]}}>{cell ? cell : null}</td>
            )
          })
          return (
            <tr>{renderRow}</tr>
          )
        })
      }
    </table>
  )
}

export default Board
