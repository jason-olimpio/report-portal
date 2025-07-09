const mockDB = {
  transaction: jest.fn(cb => cb({
    executeSql: jest.fn((_sql, _params, success, _error) => success && success({}, { rows: { length: 0, item: () => ({}) } })),
  })),
};

export default {
  openDatabase: jest.fn(() => mockDB),
};
