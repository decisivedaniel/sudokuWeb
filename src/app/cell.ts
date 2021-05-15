export interface ICell {
    displayNumber?: number;
    correctNumber: number;
    isInitial: boolean;
}

export class Cell implements ICell{
    _displayNumber? : number;
    correctNumber : number;
    isInitial : boolean;

    get displayNumber() {
        if (this.isInitial){
            return this.correctNumber;
        }
        else{
            return this._displayNumber;
        }
    }
    set displayNumber(value){
        this._displayNumber = value;
    }

    constructor(correctNumber : number){
        this.correctNumber = correctNumber;
        this.isInitial = true;
    }
}