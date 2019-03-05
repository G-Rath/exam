/**
 * An Examiners recommendation about a solution, made up of required & optional changes.
 */
export interface SolutionRecommendation {
  /**
   * Collection of changes that are required for the examiner to approve the examined solution.
   *
   * Some examples would be:
   *   * "You've not submitted any code!"
   *   * "Make sure to run the test suite when you think you've solved the exercise. Currently some tests are failing!"
   *   * "Try solving this one without using x!"
   *
   */
  required: Array<string>;
  /**
   * Collection of changes that could be made to improve the examined solution.
   *
   * Some examples would be:
   *    * "Remember to run ESLint on your solution, to ensure consistent styling. That makes it easier for us mentors to read!"
   *    * "When working with magic numbers, its often good practice to use a global constant - that way you know what the number represents!"
   */
  optional: Array<string>;
}
