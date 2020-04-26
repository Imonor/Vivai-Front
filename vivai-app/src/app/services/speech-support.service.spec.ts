import { TestBed } from '@angular/core/testing';

import { SpeechSupportService } from './speech-support.service';

describe('SpeechSupportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechSupportService = TestBed.get(SpeechSupportService);
    expect(service).toBeTruthy();
  });
});
