/* eslint-env mocha */
'use strict';

import { expect } from 'chai';

import nj from "../../src";

describe('multiply', function () {
  it('can multiply a vector with a scalar and create a new copy', function () {
    const x = nj.arange(3);
    const scalar = 2;
    const expected = [0, 2, 4];
    const newX = x.multiply(scalar);
    expect(newX).not.to.equal(x);
    expect(newX.tolist())
      .to.eql(expected);
  });
  it('can multiply a vector with a scalar without creating a copy', function () {
    const x = nj.arange(3);
    const scalar = 2;
    const expected = [0, 2, 4];
    const newX = x.multiply(scalar, false);
    expect(newX).to.equal(x);
    expect(newX.tolist())
      .to.eql(expected);
  });
  it('can multiply two vectors', function () {
    const v = nj.arange(3);
    expect(v.multiply(v).tolist())
      .to.eql([0, 1, 4]);
  });
  it('can multiply two matrix with the same shape', function () {
    const m = nj.arange(6).reshape([3, 2]);
    expect(m.multiply(m).tolist())
      .to.eql([
      [0, 1],
      [4, 9],
      [16, 25]]);
  });
  it('should throw an error when multiplying an array with a vector', function () {
    expect(function () {
      const x1 = nj.arange(9).reshape(3, 3);
      const x2 = nj.arange(3);
      nj.multiply(x1, x2);
    }).to.throw();
  });
  it('can set a number to the argument', function () {
    const a = 2;
    const b = 3;
    const numberResult = nj.multiply(a, b);
    const arrayResult = nj.multiply(nj.array([a]), nj.array([b]));
    expect(numberResult).to.eql(arrayResult);
  });
});
