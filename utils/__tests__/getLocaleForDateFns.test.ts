import getLocaleForDateFns from '../localization/getLocaleForDateFns';

jest.mock('date-fns/locale', () => ({
  enUS: {code: 'en-US'},
  it: {code: 'it'},
  es: {code: 'es'},
  fr: {code: 'fr'},
  de: {code: 'de'},
}));

describe('getLocaleForDateFns', () => {
  it('should return enUS for undefined language', () => {
    const result = getLocaleForDateFns(undefined);

    expect(result).toEqual({code: 'en-US'});
  });

  it('should return enUS for empty string', () => {
    const result = getLocaleForDateFns('');

    expect(result).toEqual({code: 'en-US'});
  });

  it('should return correct locale for English', () => {
    const result = getLocaleForDateFns('en');

    expect(result).toEqual({code: 'en-US'});
  });

  it('should return correct locale for Italian', () => {
    const result = getLocaleForDateFns('it');

    expect(result).toEqual({code: 'it'});
  });

  it('should return correct locale for Spanish', () => {
    const result = getLocaleForDateFns('es');

    expect(result).toEqual({code: 'es'});
  });

  it('should return enUS for unsupported language', () => {
    const result = getLocaleForDateFns('unsupported');

    expect(result).toEqual({code: 'en-US'});
  });

  it('should handle null input', () => {
    const result = getLocaleForDateFns(null as any);

    expect(result).toEqual({code: 'en-US'});
  });
});
