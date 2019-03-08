import { SolutionRecommendation } from '@src/definitions';
import { strings, t } from '@src/I18n';
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
    recommendation.required.push(t(strings.generic.no_code_in_submission));

    return recommendation;
  }

  const file = ts.createSourceFile('solution', code, ts.ScriptTarget.ES2015);

  if (file.statements.length === 0) {
    recommendation.required.push(t(strings.generic.no_code_in_submission));

    return recommendation;
  }

  return recommendation;
}
