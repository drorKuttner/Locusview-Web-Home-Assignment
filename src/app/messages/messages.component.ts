import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {PlayersNames} from '../set-players/models/players-names.model';
import {WinnerIndex} from '../models/winner-indexes.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent {
  @Input() public set playersNamesValues(playersNames: PlayersNames) {
    if (!!playersNames) {
      this.playersNames = [playersNames.playerName1, playersNames.playerName2];
    }
  };
  @Input() public set currentPlayerIdxValue(currentPlayerIdx: number) {
    this.currentPlayerIdx = currentPlayerIdx;
  };

  @Input() public set winnerIndexValue(currentPlayerIdx: WinnerIndex) {
    this.winnerIndex = currentPlayerIdx;
  };

  public winnerIndex: WinnerIndex
  public currentPlayerIdx: number;
  public playersNames: Array<string>;
  public winnerIndexType = WinnerIndex;
}
