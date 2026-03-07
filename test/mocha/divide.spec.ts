/* eslint-env mocha */
'use strict';

import { expect } from 'chai';

import nj from "../../src";

describe('divide', function () {
  it('can divide a vector with a scalar and create a new copy', function () {
    const x = nj.arange(3);
    const scalar = 2;
    const newX = x.divide(scalar);
    expect(newX).not.to.equal(x);
    expect(newX.tolist())
      .to.eql([0, 0.5, 1]);
  });
  it('can divide a vector with a scalar without creating a copy', function () {
    const x = nj.arange(3);
    const scalar = 2;
    const newX = x.divide(scalar, false);
    expect(newX).to.equal(x);
    expect(newX.tolist())
      .to.eql([0, 0.5, 1]);
  });
  it('can divide two vectors', function () {
    const v = nj.ones([3]);
    expect(v.divide(v).tolist())
      .to.eql(v.tolist());
  });
  it('can divide two matrix with the same shape', function () {
    const m = nj.ones(6).reshape([3, 2]);
    expect(m.divide(m).tolist())
      .to.eql(m.tolist());
  });
  it('should throw an error when dividing an array with a vector', function () {
    expect(function () {
      const x1 = nj.arange(9).reshape(3, 3);
      const x2 = nj.arange(3);
      nj.divide(x1, x2);
    }).to.throw();
  });
  it('can set a number to the argument', function () {
    const a = 2;
    const b = 3;
    const numberResult = nj.divide(a, b);
    const arrayResult = nj.divide(nj.array([a]), nj.array([b]));
    expect(numberResult).to.eql(arrayResult);
  });
});
