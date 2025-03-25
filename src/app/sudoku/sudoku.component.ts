import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, UntypedFormArray, Validators, UntypedFormBuilder } from '@angular/forms'

import { Cell } from '../cell';
import { SudokuService } from '../sudoku.service'; 
import { CheckValue } from '../../shared/checkValue.validator';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.less']
})
export class SudokuComponent implements OnInit {

  sudokuForm : UntypedFormGroup = new UntypedFormGroup({});

  get sections(): UntypedFormArray {
    return this.sudokuForm.get('sections') as UntypedFormArray;
  }

  constructor(private sudokuService: SudokuService, private formBuilder: UntypedFormBuilder) { }

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

  makeGrid(grid: Cell[][]) : UntypedFormArray {
    const sectionArray = grid.map(section => { return this.makeSectionGroup(section);});
    return this.formBuilder.array(sectionArray);

  }

  makeSectionGroup(section: Cell[]) : UntypedFormGroup {
    return this.formBuilder.group({
      section: this.makeSection(section)
    })
  }

  makeSection(section : Cell[]) : UntypedFormArray {
    const cellArray = section.map(sudokuCell => { return this.formBuilder.group({
        cell: [{value: sudokuCell.displayNumber, disabled: sudokuCell.isInitial }, [Validators.required, CheckValue(sudokuCell.correctNumber)]],
        isInitial: []
      }); 
    });
    return this.formBuilder.array(cellArray);
  }

}
