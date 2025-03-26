import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms'

import { Cell } from '../cell';
import { SudokuService } from '../sudoku.service'; 
import { CheckValue } from '../../shared/checkValue.validator';

@Component({
    selector: 'app-sudoku',
    templateUrl: './sudoku.component.html',
    styleUrls: ['./sudoku.component.less'],
    standalone: false
})
export class SudokuComponent implements OnInit {

  sudokuForm : FormGroup = new FormGroup({});

  get sections(): FormArray {
    return this.sudokuForm.get('sections') as FormArray;
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
      sections: this.makeGrid(grid)
    });
  }

  makeGrid(grid: Cell[][]) : FormArray {
    const sectionArray = grid.map(section => { return this.makeSectionGroup(section);});
    return this.formBuilder.array(sectionArray);

  }

  makeSectionGroup(section: Cell[]) : FormGroup {
    return this.formBuilder.group({
      section: this.makeSection(section)
    })
  }

  makeSection(section : Cell[]) : FormArray {
    const cellArray = section.map(sudokuCell => { return this.formBuilder.group({
        cell: [{value: sudokuCell.displayNumber, disabled: sudokuCell.isInitial }, [Validators.required, CheckValue(sudokuCell.correctNumber)]],
        isInitial: []
      }); 
    });
    return this.formBuilder.array(cellArray);
  }

}
