import {SquareValue} from '../models/square-value.model';
import {Board} from '../models/board.model';

export function EmptyBoardConf(): Board {
  return [SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty, SquareValue.Empty,
    SquareValue.Empty, SquareValue.Empty, SquareValue.Empty]
}
