const { getIsWindows, getWindowsVersion } = require('./utils')
const { noop, NoopClass } = require('./noops')
const win = getWindowsVersion()

/**
 * Overrides the logger on all methods and classes.
 *
 * @param {function} fn - Logger function to use
 */
function setLogger (fn) {
  exp.forEach((klass) => klass.setLogger(fn))
}

let exp = {
  Notification: require('./notification'),
  history: require('./history'),
  setLogger
}

// Requiring native Windows stuff on a non-windows machine isn't a great idea,
// so we just export no-ops with console warnings.
if (!getIsWindows() || !(win === '10.0' || win === '8.1' || win === '8')) {
  Object.keys(exports).forEach((k) => {
    exports[k] = k === 'Notification' ? NoopClass : noop
  })
}

module.exports = exp
