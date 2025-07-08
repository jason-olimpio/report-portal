import getTimeAgo from '../getTimeAgo';
import {TFunction} from 'i18next';

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDistanceToNow: jest.fn((date, options) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      return '2 days ago';
    }
    return 'Invalid date';
  }),
}));

// Mock utils
jest.mock('@utils', () => ({
  getLocaleForDateFns: jest.fn(() => undefined),
}));

const mockT = jest.fn((key: string) => {
  const translations: Record<string, string> = {
    invalidDate: 'Invalid date',
  };
  return translations[key] || key;
}) as unknown as TFunction;

describe('getTimeAgo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted time ago for valid date', () => {
    const validDate = new Date('2023-01-01');
    const result = getTimeAgo(validDate, 'en', mockT);
    
    expect(result).toBe('2 days ago');
  });

  it('should return invalid date message for invalid date', () => {
    const invalidDate = new Date('invalid');
    const result = getTimeAgo(invalidDate, 'en', mockT);
    
    expect(result).toBe('Invalid date');
    expect(mockT).toHaveBeenCalledWith('invalidDate');
  });

  it('should work with default language parameter', () => {
    const validDate = new Date('2023-01-01');
    const result = getTimeAgo(validDate, undefined, mockT);
    
    expect(result).toBe('2 days ago');
  });

  it('should handle different languages', () => {
    const validDate = new Date('2023-01-01');
    const result = getTimeAgo(validDate, 'it', mockT);
    
    expect(result).toBe('2 days ago');
  });
});
