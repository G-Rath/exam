import { SolutionRecommendation } from '@src/definitions';
import { strings, t } from '@src/I18n';
import ts from 'typescript';

/**
 * Checks if the given `file` is a TypeScript test file.
 *
 * A `file` is considered to be a "test file" if has at least one `CallExpression`
 * that identifies as `describe`.
 *
 * @param {ts.SourceFile} file
 *
 * @return {boolean}
 */
const isTestFile = (file: ts.SourceFile): boolean => file.statements.some(
  statement => ts.isExpressionStatement(statement)
               && ts.isCallExpression(statement.expression)
               && ts.isIdentifier(statement.expression.expression)
               && statement.expression.expression.text === 'describe'
);

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

  if (isTestFile(file)) {
    recommendation.required.push(t(strings.generic.test_file_submitted));

    return recommendation;
  }

  return recommendation;
}
