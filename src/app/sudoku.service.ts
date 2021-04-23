import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Cell } from './cell';
import { removeSummaryDuplicates } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  constructor() { }

  getCells(): Observable<Cell[][]> {
    //let sectionGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    let rowGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    //let columnGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    let cellSectionGrid : Cell[][] = [];

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
    //let rowIndex = (((Math.floor(sectionIndex / 3)) * 3)+Math.floor(cellIndex / 3));
    //let columnIndex = (((sectionIndex % 3) * 3)+(cellIndex % 3));

    return of(cellSectionGrid);
  }
}

function fillGrid(row : number, col : number, grid : number[][]) : number[][]{
  //Check if col is at the end of grid
  if(col >= 9 && row < (9-1) ){
    row += 1;
    col = 0;
  }

  //Check if at start of col
  if(col < 0 && row > 0){
    row -= 1;
    col = 8;

  }
  
  //Check if the grid is finished
  if(row >= 9 && col >= 9){
    return grid;
  }

  let selectedNumber = calculateCorrectNumber(row, col, grid);
  if(Number.isInteger(selectedNumber)){
    grid[row][col] = selectedNumber;
    fillGrid(row, col+1, grid);
  }
  fillGrid(row, (col-1), grid);
  return grid;
}

function calculateCorrectNumber(rowIndex : number, columnIndex : number, rowGrid: number[][]) : number{
  let validNumbers : number[] = [1,2,3,4,5,6,7,8,9];

  //check section
  validNumbers = removeUsedNumberSection(validNumbers, (rowIndex - (rowIndex % 3)), (columnIndex - (columnIndex % 3)), rowGrid);

  //console.log("valid Numbers: " + validNumbers);

  
  //let rowIndex = (((Math.floor(sectionIndex / 3)) * 3)+Math.floor(cellIndex / 3));
  //let columnIndex = (((sectionIndex % 3) * 3)+(cellIndex % 3));

  //check row
  validNumbers = removeUsedNumberRow(rowIndex, validNumbers, rowGrid);
  //console.log("valid Numbers: " + validNumbers);

  //check column
  validNumbers = removeUsedNumberColumn(columnIndex, validNumbers, rowGrid);
  //console.log("valid Numbers: " + validNumbers);

  //With only the valid numbers remaining, find the next one at random
  let selectedNumber = validNumbers[Math.floor(Math.random()*validNumbers.length)];
  if(!Number.isInteger(selectedNumber)){
    console.error(selectedNumber);
    //selectedNumber = -1;
  }

  return selectedNumber;
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