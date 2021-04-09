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
    let sectionGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    let rowGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    let columnGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
    let cellSectionGrid : Cell[][] = [];



    //Solve for the Correct Number
    for (let section : number = 0; section < 9; section++){
      let sectionGroup : Cell[] = [];
      for (let cell : number = 0; cell < 9; cell++){
        sectionGroup.push(new Cell(calculateCorrectNumber(section, cell, sectionGrid, rowGrid, columnGrid)));
      }
      cellSectionGrid.push(sectionGroup);
    }


    return of(cellSectionGrid);
  }
}

function calculateCorrectNumber(sectionIndex : number, cellIndex : number, sectionGrid: number[][], rowGrid: number[][], columnGrid : number[][]) : number{
  let validNumbers : number[] = [1,2,3,4,5,6,7,8,9];

  //check section
  validNumbers = removeUsedNumber(validNumbers, sectionGrid[sectionIndex]);

  console.log("valid Numbers: " + validNumbers);

  //check row
  let rowIndex = (((Math.floor(sectionIndex / 3)) * 3)+Math.floor(cellIndex / 3));
  validNumbers = removeUsedNumber(validNumbers, rowGrid[rowIndex]);
  console.log("valid Numbers: " + validNumbers);

  //check column
  let columnIndex = (((sectionIndex % 3) * 3)+(cellIndex % 3));
  validNumbers = removeUsedNumber(validNumbers, columnGrid[columnIndex]);
  console.log("valid Numbers: " + validNumbers);

  //With only the valid numbers remaining, find the next one at random
  let selectedNumber = validNumbers[Math.floor(Math.random()*validNumbers.length)];
  if(!Number.isInteger(selectedNumber)){
    console.error(selectedNumber);
  }

  //console.log("rowIndex: " + rowIndex + " columnIndex: " + columnIndex + " selectedNumber: " + selectedNumber);

  //add selected number to each grid
  sectionGrid[sectionIndex].push(selectedNumber);
  rowGrid[rowIndex].push(selectedNumber);
  columnGrid[columnIndex].push(selectedNumber);

  return selectedNumber;
}

function removeUsedNumber(validNumbers : number[], usedNumbers : number[]) : number[] {
  for(let usedNum of usedNumbers){
    validNumbers = validNumbers.filter(validNum => validNum != usedNum);
  }

  return validNumbers;
}