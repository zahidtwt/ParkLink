import convertTo12Hour from './convertTo12Hour';

const mock = {
  testCase1: {
    input: '13:00',
    output: '1:00 PM',
  },
};

describe('Time conversiton to 12 hours format', () => {
  test('it should return 1 PM', () => {
    const result = convertTo12Hour(mock.testCase1.input);
    expect(result).toBe(mock.testCase1.output);
  });
  test('it should return a string', () => {
    const result = convertTo12Hour(mock.testCase1.input);
    expect(typeof result).toBe('string');
  });
});
