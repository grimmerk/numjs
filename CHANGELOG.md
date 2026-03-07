# Changelog

### [0.17.35](https://github.com/grimmer0125/numjs/compare/v0.17.34...v0.17.35) (2026-03-07)

- Allow scalar numbers for both arguments in `multiply` and `divide` functions (#14, thanks @pppp606)

### [0.17.34](https://github.com/grimmer0125/numjs/compare/v0.17.32...v0.17.34) (2021-11-22)

- Improve exported nj as a default export module instead of nj object for better IDE intelligence
### [0.17.32](https://github.com/grimmer0125/numjs/compare/v0.17.30...v0.17.32) (2021-11-21)

- Define DType instead of DataType.
- Make codes compatible latest @types/ndarray.
- Improve NdArray constructor typings. 

### [0.17.30](https://github.com/grimmer0125/numjs/compare/v0.17.28...v0.17.30) (2021-11-20)

- Use DataType instead of string for dtype autocomplete.
- Fix some tpyo dtype "int" in unit tests and README.  

### [0.17.28](https://github.com/grimmer0125/numjs/compare/v0.17.25...v0.17.28) (2021-11-20)

- Improve NdArray constructor parameter typing.

- Improve documentation. 

### [0.17.25](https://github.com/grimmer0125/numjs/compare/v0.17.19...v0.17.25) (2021-11-20)

- Fix wrong internal ndarray container when using TypedArray in nj.array #9

- Improve documentation. 

### [0.17.19](https://github.com/grimmer0125/numjs/compare/v0.17.16...v0.17.19) (2021-11-12)

- Add CDN parcel build. 
### [0.17.16](https://github.com/grimmer0125/numjs/compare/v0.17.14...v0.17.16) (2021-11-11)

- Improve documentation. 
- Remove lodash dependency.

### [0.17.14](https://github.com/grimmer0125/numjs/compare/v0.17.11...v0.17.14) (2021-11-10)

- Improve a little documentation and typings. 
- Rename nj.uint8_clamped to nj.uint8Clamped

### [0.17.11](https://github.com/grimmer0125/numjs/compare/v0.17.10...v0.17.11) (2021-11-09)

Fix nj.array and nj.int8, nj.int16...nj.uint8_clamped parameter typings. 

### [0.17.10](https://github.com/grimmer0125/numjs/compare/v0.17.0...v0.17.10) (2021-11-09)

- Improve documentation.
- Improve typings (mainly concatenate return type and dtype ArrayLikeConstructor). 
- Add data container "uint8_clamped" / Uint8ClampedArray support (experimental).  
### [0.17.0](https://github.com/grimmer0125/numjs/compare/v0.16.0.1...v0.17.0) (2021-11-08)

- Remove image manipulation which may cause mac m1 installation failure, also it may be not needed in some use cases. 
- Add TypeScript and typing for parameters and return value.
- Use ES6 syntax: const/let, and class and `import` 
- Remove karma tests
- Building results can be used by `require (commonjs)` and es6 `import`, including TypeScript typing. Use https://github.com/bitjson/typescript-starter to build instead of grunt. Also, it ships with a main.js, and a  javascript  tree-shakable javascript module.
- Remove `expect.js` and use built-in chai test api (`expect().to.throw()`) instead.
- Fix rot90 missing ndim comparison bug, [commit](https://github.com/grimmer0125/numjs/pull/4/commits/dbf70845cbb784748fbc16d87bfb69b47053f7c2)
- Fix inspect log part using util.inspect.custom on Node.js
- Add Istanbul nyc coverage
- Use yarn stead
- Fix function return type, [commit](https://github.com/grimmer0125/numjs/pull/4/commits/d77f2a0788353f4680ec0befd3b974969d8524d2)