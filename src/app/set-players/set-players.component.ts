import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {PlayersNames} from './models/players-names.model';

@Component({
  selector: 'app-set-players',
  templateUrl: './set-players.component.html'
})
export class SetPlayersComponent {

  public players: PlayersNames = {
    playerName1: '',
    playerName2: ''
  };

  constructor(public dialogRef: MatDialogRef<SetPlayersComponent>) {}

  public done() {
    this.dialogRef.close(this.players);
  }
}
