import { SolutionRecommendation } from '@src/definitions';
import leapExaminer from '@src/examiners/typescript/leap/index.ts';
import { cases } from '@test/examiners/typescript/leap/test-cases';
import chai, { expect } from 'chai';

chai.config.truncateThreshold = 0;

describe('ts/leap', () => {
  it('is a function', () => {
    expect(leapExaminer).to.be.a('function');
  });

  describe.each(cases)('submission %#', (code: string, expectedRecommendation: SolutionRecommendation) => {
    it('returns a SolutionRecommendation', () => {
      const resultingRecommendation = leapExaminer(code);

      expect(resultingRecommendation).to.have.property('required').and.be.an('array');
      expect(resultingRecommendation).to.have.property('optional').and.be.an('array');
    });

    it('has the expected required recommendations', () => {
      const { required } = leapExaminer(code);

      expect(required).to.contain.members(expectedRecommendation.required);
      expect(required).to.have.lengthOf(expectedRecommendation.required.length);
    });

    it('has the expected optional recommendations', () => {
      const { optional } = leapExaminer(code);

      expect(optional).to.contain.members(expectedRecommendation.optional);
      expect(optional).to.have.lengthOf(expectedRecommendation.optional.length);
    });
  });
});
