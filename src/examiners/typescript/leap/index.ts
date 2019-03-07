import { SolutionRecommendation } from '@src/definitions';
import ts from 'typescript';

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

  const file = ts.createSourceFile('solution', code, ts.ScriptTarget.ES2015);

  if (file.statements.length === 0) {
    recommendation.required.push('Your submission doesn\'t contain any actual code.');

    return recommendation;
  }

  return recommendation;
}
