import { SolutionRecommendation } from '@src/definitions';
import { strings, t } from '@src/I18n';

type TestCase = [string, SolutionRecommendation];

/**
 * Creates a `TestCase` to be used for testing an `Examiner`.
 *
 * The `code` parameter is trimmed.
 *
 * The `ignore` parameter is completely ignored; it can be used to include information
 * about the test case in the actual code itself, rather than having to do so as comments.
 *
 * @param {string} code
 * @param {SolutionRecommendation["required"]} required
 * @param {SolutionRecommendation["required"]} optional
 * @param {string} [ignore] this parameter is ignored completely. Useful for writing notes.
 *
 * @return {TestCase}
 */
const createTestCase = (
  code: string,
  required: SolutionRecommendation['required'],
  optional: SolutionRecommendation['optional'],
  ignore: string = ''
): TestCase => [code.trim(), { required, optional }];

/**
 * Creates `TestCase`s to be used for testing an `Examiner`, based off an array of code variations,
 * that all have the same `SolutionRecommendation`s.
 *
 * The `code` parameter is trimmed.
 *
 * The `ignore` parameter is completely ignored; it can be used to include information
 * about the test case in the actual code itself, rather than having to do so as comments.
 *
 * @param {Array<string>} codes
 * @param {SolutionRecommendation["required"]} required
 * @param {SolutionRecommendation["required"]} optional
 * @param {string} ignore
 * @return {Array<TestCase>}
 */
const createTestCases = (
  codes: Array<string>,
  required: SolutionRecommendation['required'],
  optional: SolutionRecommendation['optional'],
  ignore: string = ''
): Array<TestCase> => codes.map(code => createTestCase(code, required, optional, ignore));

// TODO: maybe export an object with properties of like "standard", "perfect", "misc", etc?
//    might be nice to have a way to attach "comments" about each test case
export const cases: Array<TestCase> = [
  // region blank submissions
  ...createTestCases([
      '', `
// export default (year: number): boolean => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
`
    ],
    [t(strings.generic.no_code_in_submission)],
    []
  ),
  // endregion
  // region "test file submitted" submissions
  ...createTestCases([
      `
describe('A leap year', () => {
  it('is not very common', () => {
    expect(isLeapYear(2015)).toBeFalsy();
  });
});
`, `
import isLeapYear from './leap';

describe('A leap year', () => {
  it('is not very common', () => {
    expect(isLeapYear(2015)).toBeFalsy();
  });

  it('is introduced every 4 years to adjust about a day', () => {
    expect(isLeapYear(2016)).toBeTruthy();
  });

  it('is skipped every 100 years to remove an extra day', () => {
    expect(isLeapYear(1900)).toBeFalsy();
  });

  it('is reintroduced every 400 years to adjust another day', () => {
    expect(isLeapYear(2000)).toBeTruthy();
  });

  describe('Additional example of a leap year that', () => {

    it('is not a leap year', () => {
      expect(isLeapYear(1978)).toBeFalsy();
    });

    it('is a common leap year', () => {
      expect(isLeapYear(1992)).toBeTruthy();
    });

    it('is skipped every 100 years', () => {
      expect(isLeapYear(2100)).toBeFalsy();
    });

    it('is reintroduced every 400 years', () => {
      expect(isLeapYear(2400)).toBeTruthy();
    });
  });
});
`
    ],
    [t(strings.generic.test_file_submitted)],
    []
  ),
  // endregion
  // region "standard" submissions
  ...createTestCases([
      `
function isLeapYear(year: number) {
    // Your code here
    if (year % 4 !== 0) {
        return false
    } else if (year % 100 !== 0) {
        return true
    } else if (year % 400 !== 0) {
        return false
    } else {
        return true
    }
}

export default isLeapYear
`, `
export const isLeap = (year: number) => {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return true;
      }
      return false;
    }
    return true;
  }
  return false;
};
`, `
export const isLeap = (year: number) => {
  if (year % 4 == 0) {
    if (year % 100 == 0) {
      if (year % 400 == 0) {
        return true;
      }
      return false;
    }
    return true;
  } else {
    return false;
  }
};
`
    ],
    [t(strings.typescript.leap.required.mix_logical_operators_instead_of_ifs)],
    []
  ),
  createTestCase(
    `
function isLeapYear( year: number ) {
  return year % 4 === 0 && (year % 100 !== 0 || (year % 100 === 0 && year % 400 === 0))
}

export default isLeapYear
`,
    [t(strings.typescript.leap.required.eliminate_duplicate_conditional)],
    []
  ),
  // endregion
  // region "correct" submissions
  ...createTestCases([
      `
function isLeapYear(year: number) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
}

export default isLeapYear
`, `
/**
 * Checks if the given \`year\` is considered a "leap year" in the Gregorian calendar.
 *
 * A year is considered a leap year if it is evenly divisible by 4,
 * except if that year is also evenly divisible by 100,
 * in which case it's only a leap year if it's also evenly divisible by 400.
 *
 * @param {number} year
 *
 * @return {boolean} \`true\` if the given \`year\` is a leap year, otherwise \`false\`.
 */
export default (year: number): boolean => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
`
    ],
    [],
    []
  ),
  createTestCase(
    `
function isLeapYear(year: number): boolean {
  if (year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0)) {
    return true;
  }

  return false;
}

export default isLeapYear;
`,
    [],
    [t(strings.typescript.leap.optional.can_return_conditionals)]
  )
  // endregion
];
