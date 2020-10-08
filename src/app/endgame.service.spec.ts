import { TestBed } from '@angular/core/testing';

import { gameStateService } from './game-state/services/game-state.service';

describe('EndgameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: gameStateService = TestBed.get(gameStateService);
    expect(service).toBeTruthy();
  });
});
