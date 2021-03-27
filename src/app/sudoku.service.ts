import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Cell } from './cell';
import { CELLS } from './mock-cells';


@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  constructor() { }

  getCells(): Observable<Cell[][]> {
    const cells = of(CELLS);
    return cells;
  }
}
