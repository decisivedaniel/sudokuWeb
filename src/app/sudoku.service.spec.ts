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
    service.getCells().subscribe(
      grid => checkValidityOfGrid(grid)
    )
  });


});

function checkValidityOfGrid(grid : Cell[][]): void {
  var issues : number = 0;
  issues += checkSections(grid);
  issues += checkRows(grid);
  issues += checkColumns(grid);
  expect(issues).withContext("valid sudoku grids will have zero repeats per grouping, found").toEqual(0);  
};

function checkSections(grid : Cell[][]) : number{
  var issues : number = 0;
  for (var section of grid){
    issues += checkUniqueNumber(section.map(cell => cell.correctNumber));
  }
  return issues
};

function checkRows(grid : Cell[][]) : number{
  var issues : number = 0;
  //transform sections -> rows
  
  //run checkUniqueNumber
  return issues
};

function checkColumns(grid : Cell[][]) : number{
  var issues : number = 0;
  //transform sections -> columns
  
  //run checkUniqueNumber
  return issues;
};

function checkUniqueNumber(group : number[]) : number {
  var issues : number = 0;
  for (var check of group){
    if(group.indexOf(check) != group.lastIndexOf(check)){
      issues++;
    }
  }
  return issues;
};
