import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getOrCreateSessionUserKey } from './userKey';

describe('userKey', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('creates and returns a new session user key if none exists', () => {
    const key = getOrCreateSessionUserKey();
    expect(key).toMatch(/^uk_/);
    expect(sessionStorage.getItem('loungemesh_user_key')).toBe(key);
  });

  it('returns the existing session user key if present', () => {
    sessionStorage.setItem('loungemesh_user_key', 'uk_existing_123');
    const key = getOrCreateSessionUserKey();
    expect(key).toBe('uk_existing_123');
  });

  it('falls back safely if sessionStorage throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementationOnce(() => {
      throw new Error('Access denied');
    });
    const key = getOrCreateSessionUserKey();
    expect(key).toMatch(/^uk_/);
    spy.mockRestore();
  });
});
