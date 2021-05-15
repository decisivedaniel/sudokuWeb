import { TestBed } from '@angular/core/testing';

import { SudokuService } from './sudoku.service';
import { Cell } from './cell';

fdescribe('SudokuService', () => {
  let service: SudokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a valid sudoku board', () => {
    //Arrange
    var grid : Cell[][] = [];
    var maskedRatio : number = 0;

    //Act
    service.getCells().subscribe(
      returnGrid => {
        grid = returnGrid;
      }
    );

    //Assert
    //Asserts for Correct Number
    expect(checkOutOfRange(grid)).withContext("valid numbers will be between 1-9, number of cells were out of range").toBe(0)
    expect(checkSections(grid)).withContext("valid sudoku grids will have zero repeats per section, found").toBe(0);  
    expect(checkRows(grid)).withContext("valid sudoku grids will have zero repeats per row, found").toBe(0); 
    expect(checkColumns(grid)).withContext("valid sudoku grids will have zero repeats per column, found").toBe(0); 

    //Asserts for Masking
    maskedRatio = checkMasking(grid);
    expect(maskedRatio).withContext("isInitial masking ratio should be greater than").toBeGreaterThan(0.4);
    expect(maskedRatio).withContext("isInitial masking ratio should be less than").toBeLessThan(0.7);
  });

});

function checkOutOfRange(grid : Cell[][]) : number{
  let issues : number = 0;
  for (let group of grid){
    for (let check of group){
      if(!Number.isInteger(check.correctNumber) || check.correctNumber < 1 || check.correctNumber > 9){
        issues++;
      }
    }
  }
  return issues;
}

function checkSections(grid : Cell[][]) : number{
  return checkUniqueNumber(grid.map(section => section.map(cell => cell.correctNumber)));
};

function checkRows(grid : Cell[][]) : number{
  //transform sections -> rows
  let rowTransformedGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
  for (let section : number = 0; section < 9; section++){
    for (let cell : number = 0; cell < 9; cell++){
      //Need to convert 9 sections arrays into similar sized 9 rows arrays
      let cellsNewRow : number = (((Math.floor(section / 3)) * 3)+Math.floor(cell / 3));
      rowTransformedGrid[cellsNewRow].push(grid[section][cell].correctNumber);
    }
  }
  return checkUniqueNumber(rowTransformedGrid);
};

function checkColumns(grid : Cell[][]) : number{
  //transform sections -> columns
  let columnTransformedGrid : number[][] = [[],[],[],[],[],[],[],[],[]];
  for (let section : number = 0; section < 9; section++){
    for (let cell : number = 0; cell < 9; cell++){
      //Need to convert 9 sections arrays into similar sized 9 columns arrays
      let cellsNewColumn : number = (((section % 3) * 3)+(cell % 3));
      columnTransformedGrid[cellsNewColumn].push(grid[section][cell].correctNumber);
    }
  }
  return checkUniqueNumber(columnTransformedGrid);

};

function checkUniqueNumber(grid : number[][]) : number {
  let issues : number = 0;
  for (let group of grid){
    for (let check of group){
      if(group.indexOf(check) != group.lastIndexOf(check)){
        issues++;
      }
    }
  }
  return issues;
};

function checkMasking(grid: Cell[][]) : number {
  let numOfCells : number = 0;
  let numCellsMasked : number = 0;

  //Loop through Grid and get the masked count
  for(let section of grid){
    for(let cell of section){
      numOfCells++;
      if(!cell.isInitial){
        numCellsMasked++;
      }
    }
  }

  //check if cells are zero
  if (!numOfCells){
    throw new Error('zero cells in grid');
  }
  //Return the ratio of masked cells to total cells
  return (numCellsMasked / numOfCells);
}
