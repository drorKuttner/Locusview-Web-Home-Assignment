import {Component, HostListener, OnDestroy, OnInit,} from '@angular/core';
import {SetPlayersComponent} from './set-players/set-players.component';
import {MatDialog} from '@angular/material';
import {gameStateService} from './game-state/services/game-state.service';
import {Subscription} from 'rxjs';
import {SquareValue} from './models/square-value.model';
import {EmptyBoardConf} from './configuration/empty-board.conf';
import {WinnerIndex} from './models/winner-indexes.model';
import {PlayersNames} from './set-players/models/players-names.model';
import {Board} from './models/board.model';
import {GameState} from './models/game-state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'Tic Tac Toe';
  public playersNames: PlayersNames;
  public currentPlayerIdx: number;
  public winnerIndex = WinnerIndex.Empty;
  public winningSequence: Array<number> = [];

  public board: Board = EmptyBoardConf();

  private gameStateSubscription: Subscription;

  public constructor(private dialog: MatDialog, private gameStateService: gameStateService) {}

  public ngOnInit(): void {
    this.currentPlayerIdx = 0;
    this.openSetPlayersDialog();

    this.gameStateSubscription = this.gameStateService.gameState.subscribe((gameState: GameState) => {
      this.winningSequence = gameState[0];
      if (!!this.winningSequence) {
        this.winnerIndex = this.currentPlayerIdx;
      } else {
        if (gameState[1]) {
          this.winnerIndex = WinnerIndex.Draw;
        }
      }
    })
  }

  public ngOnDestroy(): void {
    if (!!this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
  }

  @HostListener('document:keypress', ['$event'])
  public resetGame(): void {
    if (this.winnerIndex !== WinnerIndex.Empty) {
      this.board = EmptyBoardConf();
      this.gameStateService.resetBoard();
      this.winnerIndex = WinnerIndex.Empty;
    }
  }

  public openSetPlayersDialog() {
    const dialogRef = this.dialog.open(SetPlayersComponent,  {
      width: '250px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      (playersNames: PlayersNames) => {
        this.playersNames = playersNames;
      }
    );
  }

  public setSquareValue(idx: number): void {
    if (this.winnerIndex !== WinnerIndex.Empty) {
      return;
    }
    if (this.board[idx] === SquareValue.Empty && this.winnerIndex === WinnerIndex.Empty) {
      this.board[idx] = this.currentPlayerIdx;
      this.gameStateService.updateBoard(this.board, this.currentPlayerIdx);
      this.checkGameState();
      this.switchPlayer();
    }
  }

  private switchPlayer(): void {
    this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
  }

  private checkGameState(): void {
      // impossible to win in less than 5 moves
      if (this.board.filter((squareValue: SquareValue) => squareValue === SquareValue.Empty).length > 4) {
        return;
      }
  }
}
