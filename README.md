# @d4c/numjs

[![npm version](https://img.shields.io/npm/v/%40d4c/numjs.svg)](https://www.npmjs.com/package/@d4c/numjs) ![example workflow](https://github.com/grimmerk/numjs/actions/workflows/node.js.yml/badge.svg)

> **Maintenance Status:** This project is in **passive maintenance** mode — critical bug fixes and small improvements may be accepted, but no active feature development is planned.
>
> That said, `@d4c/numjs` remains a **stable, ready-to-use** NumPy-like library with TypeScript typings out of the box — if you need basic ndarray operations without dealing with unstable APIs or a steep learning curve, it still works well.
>
> For more comprehensive alternatives, consider:
> - [numpy-ts](https://github.com/nicktakpk/numpy-ts) — aims to cover 94% of NumPy's API in pure TypeScript (still in early/unstable stage)
> - [@stdlib/ndarray](https://github.com/stdlib-js/ndarray) — mature and rigorous, but with a different API style

__NumJs__ is built on top of [ndarray](https://scijs.net/packages/#scijs/ndarray) and uses many [scijs packages](https://scijs.net/packages/). `ndarray` is exported as `nj.ndarray`, and any `NdArray` instance's property `selection` is a `ndarray` object.

This project is modified from https://github.com/nicolaspanel/numjs and does below modifications 
- Remove the feature of images manipulation whose dependencies may result in some installation failure on Mac M1 ARM machine. You could consider [ndarray-pixels](https://github.com/donmccurdy/ndarray-pixels) if you need this feature. 
- Add TypeScript typings and `.d.ts` is out of box, JavaScript is supported, too. Also, it includes 
    - ES6 build (ES2015) with CommonJS module for main build in package.json.
    - ES6 build (ES2015) with ES6 module for module build. Some tools will follow the module field in package.json, like Rollup, Webpack, or Parcel.
- Refactor internal code via ES6 syntax and does not change the core algorithm code.
- Add "uint8_clamped" (Uint8ClampedArray) support. 
- Other improvements.

You can check the [changelog](https://github.com/grimmerk/numjs/blob/master/CHANGELOG.md).

## Features

__NumJs__ is a npm package for scientific computing with JavaScript. It contains among other things:
 - a powerful N-dimensional array object, `NdArray`
 - linear algebra function
 - fast Fourier transform

Besides its obvious scientific uses, __NumJs__ can also be used as an efficient multi-dimensional container of generic data.

It works both in node.js and in the browser.

__NumJs__ is licensed under the [MIT license](https://github.com/grimmerk/numjs/blob/master/LICENSE), enabling reuse with almost no restrictions.

Try this [jsfiddle](https://jsfiddle.net/grimmerk/8jft09q3) to play around with the library.
## Installation

```sh
npm install @d4c/numjs 
# or 
yarn add @d4c/numjs
```

then using ES6 import: 

```ts
import nj from "@d4c/numjs"; 
```
Or CommonJS require:

```ts
// TypeScript users will not get typings when using require
const nj = require('@d4c/numjs').default; 
```

Or download from CDN: 
```html
<script type="module">
    import nj from 'https://cdn.jsdelivr.net/npm/@d4c/numjs/build/module/numjs.min.js';
    // optional: assign to global to let other code can use: globalThis.nj = nj;
</script>
```

If using `ES6 import` or `CommonJS require` resuls in some errors, please try to use `import nj from "@d4c/numjs/build/module/numjs.min.js` in your environments. 
## Basics

### Array Creation

```ts
> const a = nj.array([2,3,4]);
> a
array([ 2, 3, 4])
> const b = nj.array([[1,2,3], [4,5,6]]);
> b
array([[ 1, 2, 3],
       [ 4, 5, 6]])
```

__Note__: Default data container is JavaScript `Array` object. If needed, you can also use typed array such as `Uint8Array`:

```ts
> const a = nj.uint8([1,2,3]);
> a
array([ 1, 2, 3], dtype=uint8)
```

Below are alternative ways to create same `NdArray`.

```ts
const a = nj.array([1, 2, 3], "uint8");
const b = nj.array([1, 2, 3], Uint8Array);
const c = nj.array(new Uint8Array([1, 2, 3]));
const d = nj.arange(3,"uint8"); // results in array([ 0, 1, 2], dtype=uint8) 
// but we want [1,2,3], how?  
// we can manually create a scijs/ndarray object, then assign it as selection property 
d.selection = nj.ndarray(new Uint8Array([1, 2, 3]));
// d.selection.data is the stored raw Uint8Array([1, 2, 3])
```

__Note__: possible types are int8, uint8, int16, uint16, int32, uint32, float32, float64, uint8_clamped and array (the default)

To create arrays with a given shape, you can use `zeros`, `ones` or `random` functions:

```ts
> nj.zeros([2,3]);
array([[ 0, 0, 0],
       [ 0, 0, 0]])
> nj.ones([2,3,4], 'int32')     // dtype can also be specified
array([[[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]],
       [[ 1, 1, 1, 1],
        [ 1, 1, 1, 1],
        [ 1, 1, 1, 1]]], dtype=int32)

> nj.random([4,3])
array([[ 0.9182 , 0.85176, 0.22587],
       [ 0.50088, 0.74376, 0.84024],
       [ 0.74045, 0.23345, 0.20289],
       [ 0.00612, 0.37732, 0.06932]])
```

To create sequences of numbers, __NumJs__ provides a function called `arange`:

```ts
> nj.arange(4);
array([ 0, 1, 2, 3])

> nj.arange( 10, 30, 5 )
array([ 10, 15, 20, 25])

> nj.arange(1, 5, 'uint8');
array([ 1, 2, 3, 4], dtype=uint8)
```

#### Optional NdArray constructor parameters, stride and offset

The code is like 

```ts
// pass data, shape, stride, offset arguments.
// this will call nj.ndarray([2, 3, 4], [3], [1], 0) and assign it to NdArray's selection property
const a = new nj.NdArray([2, 3, 4], [3], [1], 0);
```

Or you want to apply on a raw scijs ndarray object

```ts
// scijs ndarray object
const a = nj.ndarray([2, 3, 4], [3], [1], 0);
```


`NdArray and ndarray` are also exported. You can also use 
```ts
import { NdArray, ndarray } from "@d4c/numjs"
// or CommonJS:
const NdArray = require('numjs').NdArray;
const ndarray = require('numjs').ndarray;
```
to reduce typing "`nj.`".

### More info about the array

__NumJs__’s array class is called `NdArray`. It is also known by the alias `array`. The more important properties of an `NdArray` object are:
 - `NdArray#ndim`: the number of axes (dimensions) of the array.
 - `NdArray#shape`: the dimensions of the array. This is a list of integers indicating the size of the array in each dimension. For a matrix with n rows and m columns, shape will be [n,m]. The length of the shape is therefore the number of dimensions, ndim.
 - `NdArray#size`: the total number of elements of the array. This is equal to the product of the elements of shape.
 - `NdArray#dtype`: a string describing the type of the elements in the array. `int32`, `int16`, and `float64` are some examples. Default dtype is `array`.

An `NdArray` can always be converted to a native JavaScript `Array` using `NdArray#tolist()` method.


Example:
```ts
> a = nj.arange(15).reshape(3, 5);
array([[  0,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14]])

> a.shape
[ 3, 5]
> a.ndim
2
> a.dtype
'array'
> a instanceof nj.NdArray
true
> a.tolist() instanceof Array
true
> a.get(1,1)
6
> a.set(0,0,1)
> a
array([[  1,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14]])

```

### Printing arrays

Use `nj.array([2,3,4]` as an example. In Node.js, `console.log(nj.array([2,3,4])` will print beautified content, `array([ 2, 3, 4])`. In browser or using debugger in Node.js, please use `console.log(nj.array([2,3,4].toString())` to print its beautified content. `toString()` is working in browser/Node.js.

When you print the beautified content of an array, __NumJs__ displays it in a similar way to nested lists, but with the following layout:
 - the last axis is printed from left to right,
 - the second-to-last is printed from top to bottom,
 - the rest are also printed from top to bottom, with each slice separated from the next by an empty line.

One-dimensional arrays are then printed as rows, bidimensionals as matrices and tridimensionals as lists of matrices.

```ts
> const a = nj.arange(6);                 // 1d array
> console.log(a);
array([ 0, 1, 2, 3, 4, 5])
>
> const b = nj.arange(12).reshape(4,3);   // 2d array
> console.log(b);
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8],
       [  9, 10, 11]])
>
> const c = nj.arange(24).reshape(2,3,4); // 3d array
> console.log(c);
array([[[  0,  1,  2,  3],
        [  4,  5,  6,  7],
        [  8,  9, 10, 11]],
       [[ 12, 13, 14, 15],
        [ 16, 17, 18, 19],
        [ 20, 21, 22, 23]]])

```

If an array is too large to be printed, __NumJs__ automatically skips the central part of the array and only prints the corners:

```ts
> console.log(nj.arange(10000).reshape(100,100))
array([[    0,    1, ...,   98,   99],
       [  100,  101, ...,  198,  199],
        ...
       [ 9800, 9801, ..., 9898, 9899],
       [ 9900, 9901, ..., 9998, 9999]])
```

To customize this behaviour, you can change the printing options using `nj.config.printThreshold` (default is `7`):
```ts
> nj.config.printThreshold = 9;
> console.log(nj.arange(10000).reshape(100,100))
array([[    0,    1,    2,    3, ...,   96,   97,   98,   99],
       [  100,  101,  102,  103, ...,  196,  197,  198,  199],
       [  200,  201,  202,  203, ...,  296,  297,  298,  299],
       [  300,  301,  302,  303, ...,  396,  397,  398,  399],
        ...
       [ 9600, 9601, 9602, 9603, ..., 9696, 9697, 9698, 9699],
       [ 9700, 9701, 9702, 9703, ..., 9796, 9797, 9798, 9799],
       [ 9800, 9801, 9802, 9803, ..., 9896, 9897, 9898, 9899],
       [ 9900, 9901, 9902, 9903, ..., 9996, 9997, 9998, 9999]])

```

### Indexing

Single element indexing  uses `get` and `set` methods. It is 0-based, and accepts negative indices for indexing from the end of the array:
```ts
> const a = nj.array([0,1,2]);
> a.get(1)
1
>
> a.get(-1)
2
>
> const b = nj.arange(3*3).reshape(3,3);
> b
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8])
>
> b.get(1, 1);
4
>
> b.get(-1, -1);
8
> b.set(0,0,1);
> b
array([[ 1, 1, 2],
       [ 3, 4, 5],
       [ 6, 7, 8]])
```


### Slicing and Striding

It is possible to slice and stride arrays to extract arrays of the same number of dimensions, but of different sizes than the original. The slicing and striding works exactly the same way it does in NumPy:

```ts
> const a = nj.arange(5);
> a
array([  0,  1,  2,  3,  4])
>
> a.slice(1) // skip the first item, same as a[1:]
array([ 1, 2, 3, 4])
>
> a.slice(-3) // takes the last 3 items, same as a[-3:]
array([ 2, 3, 4])
>
> a.slice([4]) // takes the first 4 items, same as a[:4]
array([ 0, 1, 2, 3])
>
> a.slice([-2]) // skip the last 2 items, same as a[:-2]
array([ 0, 1, 2])
>
> a.slice([1,4]) // same as a[1:4]
array([ 1, 2, 3])
>
> a.slice([1,4,-1]) // same as a[1:4:-1]
array([ 3, 2, 1])
>
> a.slice([null,null,-1]) // same as a[::-1]
array([ 4, 3, 2, 1, 0])
>
> const b = nj.arange(5*5).reshape(5,5);
> b
array([[  0,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14],
       [ 15, 16, 17, 18, 19],
       [ 20, 21, 22, 23, 24]])
>
> b.slice(1,2) //  skip the first row and the 2 first  columns, same as b[1:,2:]
array([[  7,  8,  9],
       [ 12, 13, 14],
       [ 17, 18, 19],
       [ 22, 23, 24]])
>
> b.slice(null, [null, null, -1]) // reverse rows, same as b[:, ::-1]
array([[  4,  3,  2,  1,  0],
       [  9,  8,  7,  6,  5],
       [ 14, 13, 12, 11, 10],
       [ 19, 18, 17, 16, 15],
       [ 24, 23, 22, 21, 20]])
```

Note that slices do not copy the internal array data, it produces a new views of the original data.

### Basic operations

Arithmetic operators such as `*` (`multiply`), `+` (`add`), `-` (`subtract`), `/` (`divide`), `**` (`pow`), `=` (`assign`) apply elemen-twise. A new array is created and filled with the result:

```ts
> zeros = nj.zeros([3,4]);
array([[ 0, 0, 0, 0],
       [ 0, 0, 0, 0],
       [ 0, 0, 0, 0]])
>
> ones = nj.ones([3,4]);
array([[ 1, 1, 1, 1],
       [ 1, 1, 1, 1],
       [ 1, 1, 1, 1]])
>
> ones.add(ones)
array([[ 2, 2, 2, 2],
       [ 2, 2, 2, 2],
       [ 2, 2, 2, 2]])
>
> ones.subtract(ones)
array([[ 0, 0, 0, 0],
       [ 0, 0, 0, 0],
       [ 0, 0, 0, 0]])
>
> zeros.pow(zeros)
array([[ 1, 1, 1, 1],
       [ 1, 1, 1, 1],
       [ 1, 1, 1, 1]])
>
```

To modify an existing array rather than create a new one you can set the `copy` parameter to `false`:

```ts
> ones = nj.ones([3,4]);
array([[ 1, 1, 1, 1],
       [ 1, 1, 1, 1],
       [ 1, 1, 1, 1]])
>
> ones.add(ones, false)
array([[ 2, 2, 2, 2],
       [ 2, 2, 2, 2],
       [ 2, 2, 2, 2]])
>
> ones
array([[ 2, 2, 2, 2],
       [ 2, 2, 2, 2],
       [ 2, 2, 2, 2]])
>
> zeros = nj.zeros([3,4])
> zeros.slice([1,-1],[1,-1]).assign(1, false);
> zeros
array([[ 0, 0, 0, 0],
       [ 0, 1, 1, 0],
       [ 0, 0, 0, 0]])
```
__Note__: available for `add`, `subtract`, `multiply`, `divide`, `assign` and `pow` methods.


The matrix product can be performed using the `dot` function:

```ts
> a = nj.arange(12).reshape(3,4);
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> nj.dot(a.T, a)
array([[  80,  92, 104, 116],
       [  92, 107, 122, 137],
       [ 104, 122, 140, 158],
       [ 116, 137, 158, 179]])
>
> nj.dot(a, a.T)
array([[  14,  38,  62],
       [  38, 126, 214],
       [  62, 214, 366]])
```

Many unary operations, such as computing the sum of all the elements in the array, are implemented as methods of the `NdArray` class:

```ts
> a = nj.random([2,3])
array([[0.62755, 0.8278,0.21384],
       [ 0.7029,0.27584,0.46472]])
> a.sum()
3.1126488673035055
>
> a.min()
0.2138431086204946
>
> a.max()
0.8278025290928781
>
> a.mean()
0.5187748112172509
>
> a.std()
0.22216977543691244
```

### Universal Functions
__NumJs__ provides familiar mathematical functions such as `sin`, `cos`, and `exp`. These functions operate element-wise on an array, producing an `NdArray` as output:

```ts
> a = nj.array([-1, 0, 1])
array([-1, 0, 1])
>
> nj.negative(a)
array([ 1, 0,-1])
>
> nj.abs(a)
array([ 1, 0, 1])
>
> nj.exp(a)
array([ 0.36788,       1, 2.71828])
>
> nj.tanh(a)
array([-0.76159,       0, 0.76159])
>
> nj.softmax(a)
array([ 0.09003, 0.24473, 0.66524])
>
> nj.sigmoid(a)
array([ 0.26894,     0.5, 0.73106])
>
> nj.exp(a)
array([ 0.36788,       1, 2.71828])
>
> nj.log(nj.exp(a))
array([-1, 0, 1])
>
> nj.sqrt(nj.abs(a))
array([ 1, 0, 1])
>
> nj.sin(nj.arcsin(a))
array([-1, 0, 1])
>
> nj.cos(nj.arccos(a))
array([-1, 0, 1])
>
> nj.tan(nj.arctan(a))
array([-1, 0, 1])
```

### Shape Manipulation
An array has a shape given by the number of elements along each axis:

```ts
> a = nj.array([[  0,  1,  2,  3], [  4,  5,  6,  7], [  8,  9, 10, 11]]);
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])

> a.shape
[ 3, 4 ]
```

The shape of an array can be changed with constious commands:
```ts
> a.flatten();
array([  0,  1,  2, ...,  9, 10, 11])
>
> a.T                   // equivalent to a.transpose(1,0)
array([[  0,  4,  8],
       [  1,  5,  9],
       [  2,  6, 10],
       [  3,  7, 11]])
>
> a.reshape(4,3)
array([[  0,  1,  2],
       [  3,  4,  5],
       [  6,  7,  8],
       [  9, 10, 11]])
>
```

Since `a` is matrix we may want its diagonal:
```ts
> nj.diag(a)
array([  0,  5, 10])
>
```

### Identity matrix
The identity array is a square array with ones on the main diagonal:

```ts
> nj.identity(3)
array([[ 1, 0, 0],
       [ 0, 1, 0],
       [ 0, 0, 1]])
```

### Concatenate different arrays

Several arrays can be stacked together using `concatenate` function:

```ts
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = nj.arange(3)
array([ 0, 1, 2])
>
> nj.concatenate(a,b.reshape(3,1))
array([[  0,  1,  2,  3,  0],
       [  4,  5,  6,  7,  1],
       [  8,  9, 10, 11,  2]])
```

__Notes__:
 - the arrays must have the same shape, except in the last dimension
 - arrays are concatenated along the last axis

It is still possible to concatenate along other dimensions using transpositions:

```ts
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = nj.arange(4)
array([ 0, 1, 2, 3])
>
> nj.concatenate(a.T,b.reshape(4,1)).T
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11],
       [  0,  1,  2,  3]])
```


### Stack multiple arrays

```ts
> a = nj.array([1, 2, 3])
> b = nj.array([2, 3, 4])

> nj.stack([a, b])
array([[1, 2, 3],
       [2, 3, 4]])
> nj.stack([a, b], -1)
array([[1, 2],
       [2, 3],
       [3, 4]])
```

__Notes__:
 - the arrays must have the same shape
 - take an optional axis argument which can be negative

### Deep Copy
The `clone` method makes a complete copy of the array and its data.

```ts
> a = nj.arange(12).reshape(3,4)
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> b = a.clone()
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
>
> a === b
false
>
> a.set(0,0,1)
> a
array([[  1,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
> b
array([[  0,  1,  2,  3],
       [  4,  5,  6,  7],
       [  8,  9, 10, 11]])
```

### Fast Fourier Transform (FFT)
`fft` and `ifft` functions can be used to compute the N-dimensional discrete Fourier Transform and its inverse.

Example:
```ts
> RI = nj.concatenate(nj.ones([10,1]), nj.zeros([10,1]))
array([[ 1, 0],
       [ 1, 0],
       [ 1, 0],
        ...
       [ 1, 0],
       [ 1, 0],
       [ 1, 0]])
>
> fft = nj.fft(RI)
array([[ 10,  0],
       [  0,  0],
       [  0,  0],
        ...
       [  0,  0],
       [  0,  0],
       [  0,  0]])
>
> nj.ifft(fft)
array([[ 1, 0],
       [ 1, 0],
       [ 1, 0],
        ...
       [ 1, 0],
       [ 1, 0],
       [ 1, 0]])
```
__Note__: both `fft` and `ifft` expect last dimension of the array to contain 2 values: the real and the imaginary value


### Convolution

`convolve` function compute the discrete, linear convolution of two multi-dimensional arrays.

__Note__: The convolution product is only given for points where the signals overlap completely. Values outside the signal boundary have no effect. This behaviour is also known as the 'valid' mode.


Example:
```ts
> x = nj.array([0,0,1,2,1,0,0])
array([ 0, 0, 1, 2, 1, 0, 0])
>
> nj.convolve(x, [-1,0,1])
array([-1,-2, 0, 2, 1])
>
> const a = nj.arange(25).reshape(5,5)
> a
array([[  0,  1,  2,  3,  4],
       [  5,  6,  7,  8,  9],
       [ 10, 11, 12, 13, 14],
       [ 15, 16, 17, 18, 19],
       [ 20, 21, 22, 23, 24]])
> nj.convolve(a, [[ 1, 2, 1], [ 0, 0, 0], [-1,-2,-1]])
array([[ 40, 40, 40],
       [ 40, 40, 40],
       [ 40, 40, 40]])
> nj.convolve(nj.convolve(a, [[1, 2, 1]]), [[1],[0],[-1]])
array([[ 40, 40, 40],
       [ 40, 40, 40],
       [ 40, 40, 40]])
```

__Note__: `convolve` uses Fast Fourier Transform (FFT) to speed up computation on large arrays.


### Other utils
`rot90`
```ts
> m = nj.array([[1,2],[3,4]], 'int8')
> m
array([[1, 2],
       [3, 4]])
> nj.rot90(m)
array([[2, 4],
       [1, 3]])
> nj.rot90(m, 2)
array([[4, 3],
       [2, 1]])
> m = nj.arange(8).reshape([2,2,2])
> nj.rot90(m, 1, [1,2])
array([[[1, 3],
        [0, 2]],
      [[5, 7],
       [4, 6]]])
```

`mod` (since v0.16.0)
```ts
> nj.mod(nj.arange(7), 5)
> m
array([0, 1, 2, 3, 4, 0, 1])
```

## Contributors

This project is a TypeScript port of [numjs](https://github.com/nicolaspanel/numjs) by [@nicolaspanel](https://github.com/nicolaspanel).

Thanks to the following people for their contributions:

- [@pppp606](https://github.com/pppp606) — scalar support for `multiply` and `divide` ([#14](https://github.com/grimmerk/numjs/pull/14))

## Documentation
- [@d4c/numjs](https://grimmerk.github.io/numjs/)
    - [numjs module (nj) doc](https://grimmerk.github.io/numjs/modules/)
    - [NdArray doc](https://grimmerk.github.io/numjs/classes/ndarray.NdArray.html)
