import leapExaminer from '@src/examiners/typescript/leap/index.ts';
import { expect } from 'chai';

describe('ts/leap', () => {
  it('is a function', () => {
    expect(leapExaminer).to.be.a('function');
  });
});
