import { Component, OnInit } from '@angular/core';

import { Cell } from '../cell';
import { SudokuService } from '../sudoku.service'; 

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.less']
})
export class SudokuComponent implements OnInit {

  cells: Cell [][] = [];

  constructor(private sudokuService: SudokuService) { }

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.sudokuService.getCells()
      .subscribe(cells => this.cells = cells);
  }

}
