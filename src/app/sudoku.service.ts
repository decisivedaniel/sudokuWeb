import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Cell } from './cell';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  constructor() { }

  getCells(): Observable<Cell[][]> {
    let rowGrid : number[][] = [];
    let cellSectionGrid : Cell[][] = [[],[],[],[],[],[],[],[],[]];

    //Sad generate a full 9*9 grid to prevent index out of bound errors
    for (let rowIndex : number = 0; rowIndex < 9; rowIndex++){
      let row : number[] = [];
      for (let columnIndex : number = 0; columnIndex < 9; columnIndex++){
        row.push(-1);
      }
      rowGrid.push(row);
    }

    rowGrid = fillGrid(0,0, rowGrid);

    //Convert row grid => section grid
    for (let rowIndex : number = 0; rowIndex < 9; rowIndex++){
      for (let columnIndex : number = 0; columnIndex < 9; columnIndex++){
        let sectionIndex = (((Math.floor(rowIndex / 3)) * 3)+Math.floor(columnIndex / 3));
        cellSectionGrid[sectionIndex].push(new Cell(rowGrid[rowIndex][columnIndex]));
      }
    }

    //Mask cells to create challenge
    //Doing this as a separate loop to enable sixth section to have all the information available to flip and reverse
    for (let sectionIndex : number = 0; sectionIndex < 9; sectionIndex++){
      for (let cellIndex : number = 0; cellIndex < 9; cellIndex++){
        cellSectionGrid[sectionIndex][cellIndex].isInitial = CheckIsInitial(sectionIndex, cellIndex, cellSectionGrid)
      }
    }

    return of(cellSectionGrid);
  }
}

function fillGrid(row : number, col : number, grid : number[][]) : number[][]{
  
  //Check if col is at the end of grid
  if(col > 8){
    row += 1;
    col = 0;
  }

  //Check if at start of col
  if(col < 0 && row > 0){
    row -= 1;
    col = 8;
  }
  
  //Check if the grid is finished
  if(row > 8){
    return grid;
  }

  let unusedNumbers = findUsedNumbers(row, col, grid);
  while (unusedNumbers.length > 0){
    let selectedNumber = unusedNumbers[Math.floor(Math.random() * unusedNumbers.length)]
    grid[row][col] = selectedNumber;
    try{
      fillGrid(row, col+1, grid);
      return grid;
    }
    catch (error){
      if ((error as Error).message === "number not found")
      {
        grid[row][col] = -1;
        unusedNumbers = unusedNumbers.filter(function(value){
        return value != selectedNumber;
        });
      }
      
    }
  }

  throw new Error("number not found");
}

function findUsedNumbers(rowIndex : number, columnIndex : number, rowGrid: number[][]) : number[] {
  let validNumbers : number[] = [1,2,3,4,5,6,7,8,9];

  //check section
  validNumbers = removeUsedNumberSection(validNumbers, (rowIndex - (rowIndex % 3)), (columnIndex - (columnIndex % 3)), rowGrid);

  //check row
  validNumbers = removeUsedNumberRow(rowIndex, validNumbers, rowGrid);

  //check column
  validNumbers = removeUsedNumberColumn(columnIndex, validNumbers, rowGrid);

  return validNumbers;
}

function removeUsedNumberSection(validNumbers : number[], rowStart : number, colStart : number, usedNumbers : number[][]) : number[] {
  for(let row : number = 0; row < 3; row++){
    for(let col : number = 0; col < 3; col++ ){
      validNumbers = validNumbers.filter(validNum => validNum != usedNumbers[rowStart + row][colStart + col]);
    }
  }

  return validNumbers;
}

function removeUsedNumberRow(row : number, validNumbers : number[], currentGrid : number[][]) : number[]{
  for (let cellIndex = 0; cellIndex < 9; cellIndex++){
    validNumbers = validNumbers.filter(validNum => validNum != currentGrid[row][cellIndex]);
  }
  return validNumbers;
}

function removeUsedNumberColumn(column : number, validNumbers : number[], currentGrid : number[][]) : number[]{
  for (let cellIndex = 0; cellIndex < 9; cellIndex++){
    validNumbers = validNumbers.filter(validNum => validNum != currentGrid[cellIndex][column]);
  }
  return validNumbers;
}

function CheckIsInitial(sectionIndex : number, cellIndex : number, CellGrid : Cell[][]) : boolean{
  let isInitial : boolean = true;

  //for the first 5 sections, math.random
  if(sectionIndex < 5){
    isInitial = Math.random() > 0.5;
  }
  //for the last 4 sections, missyeliot first four sections
  else{
    isInitial = CellGrid[8-sectionIndex][8-cellIndex].isInitial;
  }

  return isInitial;
}