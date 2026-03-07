// Minimal browser shim for Node.js `util` module.
// Only provides util.inspect.custom (a Symbol), which is used
// by NdArray for custom Node.js console.log formatting.
module.exports = {
  inspect: {
    custom: Symbol.for('nodejs.util.inspect.custom')
  }
};
