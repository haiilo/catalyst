import { describe, it, expect } from '@stencil/vitest';
import { catNotificationService } from './cat-notification';

describe('CatNotificationService', () => {
  it('exists', async () => {
    expect(catNotificationService).toBeTruthy();
  });
});
