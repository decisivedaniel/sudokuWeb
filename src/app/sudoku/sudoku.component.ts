import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms'

import { Cell } from '../cell';
import { SudokuService } from '../sudoku.service'; 
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.less']
})
export class SudokuComponent implements OnInit {

  //cells: Cell [][] = [];
  sudokuForm : FormGroup = new FormGroup({});

  get rows(): FormArray {
    return this.sudokuForm.get('rows') as FormArray;
  }

  constructor(private sudokuService: SudokuService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCells();
  }

  getCells(): void {
    this.sudokuService.getCells()
      .subscribe(grid => this.makeForm(grid));
  }

  makeForm(grid: Cell[][]) : void {
    this.sudokuForm = this.formBuilder.group({
      rows: this.makeGrid(grid)
    });
  }

  makeGrid(grid: Cell[][]) : FormArray {
    const rowArray = grid.map(row => { return this.makeRowGroup(row);});
    return this.formBuilder.array(rowArray);

  }

  makeRowGroup(row: Cell[]) : FormGroup {
    return this.formBuilder.group({
      row: this.makeRow(row)
    })
  }

  makeRow(row : Cell[]) : FormArray {
    const cellArray = row.map(sudokuCell => { return this.formBuilder.group({
        cell: [{value: sudokuCell.displayNumber, disabled: sudokuCell.isInitial }],
        isInitial: []
      }); 
    });
    return this.formBuilder.array(cellArray);
  }

}
