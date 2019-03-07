import { SolutionRecommendation } from '@src/definitions';

/**
 * Examines TypeScript `code`, submitted as a solution to the `leap` typescript exercise.
 *
 * @param {string} code
 *
 * @return {SolutionRecommendation}
 */
export default (code: string): SolutionRecommendation => {
  const recommendation: SolutionRecommendation = {
    required: [],
    optional: []
  };

  if (!code) {
    recommendation.required.push('Your submission doesn\'t contain any actual code.');

    return recommendation;
  }

  return recommendation;
}
