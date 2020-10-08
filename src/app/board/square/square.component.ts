import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SquareValue} from '../../models/square-value.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SquareComponent {

  @Input() public set value(val: SquareValue) {
      this.squareValue = val;
  }
  @Input() public isWinningSequence: boolean;

  public squareValueType = SquareValue;
  public squareValue: SquareValue = SquareValue.Empty;
  constructor() { }
}
