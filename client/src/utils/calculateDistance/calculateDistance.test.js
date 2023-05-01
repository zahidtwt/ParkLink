import claculateDistance from './calculateDistance';
const mock = {
  testCase1: {
    input: [23.7983962, 90.4219536, 23.7983962, 90.4219536],
    output: 0,
  },
  testCase2: {
    input: [28.7983962, 80.4219536, 34.7983962, 101.4219536],
    output: 2088, //in km //https://www.nhc.noaa.gov/gccalc.shtml
  },
};

describe('Calculate Distance.', () => {
  test('it should return 0.', () => {
    const result = claculateDistance(...mock.testCase1.input);
    expect(result).toBe(mock.testCase1.output);
    expect(typeof result).toBe('number');
  });
  test('it should return 0.', () => {
    const result = claculateDistance(...mock.testCase2.input);
    expect(Math.floor(result)).toBe(mock.testCase2.output);
    expect(typeof result).toBe('number');
  });
});
