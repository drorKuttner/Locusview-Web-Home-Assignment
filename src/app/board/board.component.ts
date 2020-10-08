import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Board} from '../models/board.model';
import {Sequence} from '../models/sequence.model';
import {SquareValue} from '../models/square-value.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.less']
})
export class BoardComponent {
  @Input() public set boardInput(board: Board) {
    this.board = board;
  };
  @Input() public set winningSequenceInput(winningSequence: Sequence) {
    this.winningSequence = winningSequence;
  }
  @Output() public setSquareValue: EventEmitter<number>;

  public squareValueType: typeof SquareValue;
  public board: Board;
  public winningSequence: Sequence;

  constructor() {
    this.squareValueType = SquareValue;
    this.setSquareValue = new EventEmitter<number>();
  }

  public onSetSquareValue(index: number): void {
    this.setSquareValue.emit(index);
  }
}
