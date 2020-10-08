import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {GameState} from '../../models/game-state.model';
import {SquareValue} from '../../models/square-value.model';
import {WINNING_SEQUENCES} from '../../configuration/winning-sequences.conf';
import {Sequence} from '../../models/sequence.model';
import {Board} from '../../models/board.model';
import {EmptyBoardConf} from '../../configuration/empty-board.conf';

@Injectable({
  providedIn: 'root'
})
export class gameStateService {
  private readonly winningSequenceSubject: BehaviorSubject<Sequence>;
  private readonly isDrawSubject: BehaviorSubject<boolean>;
  private board: Board;

  constructor() {
    this.board = [];
    this.winningSequenceSubject = new BehaviorSubject<Sequence>(null);
    this.isDrawSubject = new BehaviorSubject<boolean>(null);
  }

  public get gameState(): Observable<GameState> {
    return combineLatest([this.winningSequenceSubject, this.isDrawSubject]);
  }

  public updateBoard(board: Board, lastSquareValue: SquareValue): void {
    this.board = board;

    // before 5'th move no chance to win
    if (this.getEmptySquaresNumber() <= 4) {
      this.updateWinningSequence(lastSquareValue);
      this.updateIsDraw(lastSquareValue);
    }
  }

  public resetBoard(): void {
    this.board = EmptyBoardConf();
    this.winningSequenceSubject.next(null);
    this.isDrawSubject.next(null);
  }

  private updateIsDraw(lastValueType: SquareValue): boolean {
    if(!!this.winningSequenceSubject.getValue()) {
      return false;
    }

    const numberOfEmptySquares: number = this.getEmptySquaresNumber();

    // Draw state is when: 1) all possible winning sequences are filled with both X and O
    // or 2) when it will be certainly happens after the next move
    this.isDrawSubject.next((this.winningSequencesWithoutValue(SquareValue.X) ===
      0 && this.winningSequencesWithoutValue(SquareValue.O) === 0) ||
      (this.winningSequencesWithoutValue(SquareValue.X) + this.winningSequencesWithoutValue(SquareValue.O) === 1 &&
        (numberOfEmptySquares < 2 ||  (numberOfEmptySquares === 2 && this.areTwoLastEmptySquaresinSameSequence()))));
  }

  private winningSequencesWithoutValue(squareValue: SquareValue): number {
    let a = WINNING_SEQUENCES.filter((sequence: Sequence) => {
      return sequence.every((squareValueInsSequence: SquareValue) => {
        return this.board[squareValueInsSequence] !== squareValue;
      })
    });
    return a.length;
  }

  private areTwoLastEmptySquaresinSameSequence(): boolean {
    const emptySquaresIndexes: number[] = (Object.keys(this.board)).filter((key: string) => {
      const index: number = Number(key);
      return this.board[index] === SquareValue.Empty;
    }).map((key: string) => Number(key));

    return WINNING_SEQUENCES.some((winningSequence: Sequence) => {
      return emptySquaresIndexes.every((index: number) => {
        return winningSequence.includes(index);
      });
    })
  }


  private getEmptySquaresNumber(): number {
    return this.board.filter((squareValue: SquareValue) => squareValue === SquareValue.Empty).length;
  }

  // check if the last move have won
  private updateWinningSequence(lastValueType: SquareValue): void {
    let winningSequence: Sequence = null;
    WINNING_SEQUENCES.forEach((sequence: Sequence) => {
      if (sequence.every((n: SquareValue) => this.board[n] === lastValueType)) {
        winningSequence = sequence;
        return;
      }
    });
    this.winningSequenceSubject.next(winningSequence);
  }
}
