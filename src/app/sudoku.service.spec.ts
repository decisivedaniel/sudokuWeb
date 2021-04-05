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
  expect(issues).toEqual(0);  
};

function checkSections(grid : Cell[][]) : number{
  var issues : number = 0;
  for (var i = 0; i < 9; i++){
    var sectionSum : number = 0;
    for (var j = 0; j < 9; j++){
      sectionSum += grid[i][j].correctNumber;
    }
    if (sectionSum != 45){
      issues++;
    }
  }
  return issues
};

function checkRows(grid : Cell[][]) : number{
  var issues : number = 0;
  return issues
};

function checkColumns(grid : Cell[][]) : number{
  var issues : number = 0;
  return issues;
};
