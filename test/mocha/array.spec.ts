/* eslint-env mocha */
'use strict';

import { expect } from 'chai';
import nj from "../../src";

describe('array', function () {
  it('can be empty', function () {
    const arr = nj.array([]);
    expect(arr.tolist()).to.eql([]);
    expect(arr.toString()).to.eql('array([])');
    expect(arr.toJSON()).to.eql('[]');
    expect(arr.shape).to.eql([0]);
  });

  it('can use a given dtype', function () {
    expect(nj.array([], 'uint8').dtype).to.eql('uint8');
    expect(nj.uint8([]).dtype).to.eql('uint8');
  });

  it('should infer the dtype from a TypedArray input (#13)', function () {
    expect(nj.array(new Uint8Array([1, 2, 3])).dtype).to.eql('uint8');
    expect(nj.array(new Uint8Array([1, 2, 3])).tolist()).to.eql([1, 2, 3]);
    expect(nj.array(new Float32Array([1.5, 2.5])).dtype).to.eql('float32');
    expect(nj.array(new Int16Array([1, 2])).dtype).to.eql('int16');
    expect(nj.array(new Uint8Array([1, 2, 3]), 'float64').dtype).to.eql('float64');
  });

  it('should create a copy of the given multi dimensionnal array', function () {
    const init = [[0, 1], [2, 3]];
    const arr = nj.array(init);
    expect(arr.shape).to.eql([2, 2]);
    expect(arr.tolist()).to.eql(init);
    init[0][0] = 1;
    expect(arr.tolist()).to.eql([[0, 1], [2, 3]]);
  });

  it('should not create a copy of the given vector', function () {
    const init = [0, 1, 2, 3];
    const arr = nj.array(init);
    expect(arr.shape).to.eql([4]);
    expect(arr.tolist()).to.eql(init);
    init[0] = 1;
    expect(arr.tolist()).to.eql(init);
  });
  it('should considere numbers as a 1 element array', function () {
    const arr = nj.array(2);
    expect(arr.shape).to.eql([1]);
    expect(arr.tolist()).to.eql([2]);
  });
  it('can be converted to uint8', function () {
    const vect = nj.zeros(12);
    expect(vect.dtype).to.equal('array');
    vect.dtype = 'uint8';
    expect(vect.dtype).to.equal('uint8');
  });
  it('should keep the dtype of a TypedArray when given without an explicit dtype', function () {
    const a = nj.array(new Uint8Array([1, 2, 3]));
    expect(a.dtype).to.eql('uint8');
    expect(a.tolist()).to.eql([1, 2, 3]);
    expect(nj.array(new Float64Array([1.5, 2.5])).dtype).to.eql('float64');
  });
});
