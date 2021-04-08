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
    var grid : Cell[][] = [];
    service.getCells().subscribe(
      returnGrid => {
        grid = returnGrid;
      }
    );

    let invalidRangeIssues : number = 0;
    let duplicateIssues  : number = 0;

    invalidRangeIssues += checkOutOfRange(grid);

    duplicateIssues += checkSections(grid);
    duplicateIssues += checkRows(grid);
    duplicateIssues += checkColumns(grid);

    expect(invalidRangeIssues).withContext("valid numbers will be between 1-9, number of cells were out of range").toBe(0)
    expect(duplicateIssues).withContext("valid sudoku grids will have zero repeats per grouping, found").toBe(0);  

  });

});

function checkOutOfRange(grid : Cell[][]) : number{
  let issues : number = 0;
  for (let group of grid){
    for (let check of group){
      if(check.correctNumber < 1 || check.correctNumber > 9){
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
      let cellsNewSection : number = (((section % 3) + 3)+(cell % 3));
      columnTransformedGrid[cellsNewSection].push(grid[section][cell].correctNumber);
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
