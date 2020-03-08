function eval() {
  // Do not use eval!!!
  return;
}



function expressionCalculator(expr) {
  if (typeof expr === 'string') {
    let left = expr.split('').filter((x) => x === '(');
    let right = expr.split('').filter((x) => x === ')');
    if (!(left.length === right.length)) throw 'ExpressionError: Brackets must be paired';
    expr = expr.trim();
    let bracket;
    while ((bracket = expr.match(/\(\s*([\d\s\/\*\+-\.]+)\s*\)/))) {
      expr = expr.replace(bracket[0], ' ' + expressionCalculator(bracket[1]) + ' ');
    }
    expr = expr.replace(/\s*([\/\*\+-])\s*/g, ' $1 ');
    expr = expr.trim();
    expr = expr.replace(/-\s+-/g, ' + ');
    while ((bracket = expr.match(/([-\d\.]+)\s+-\s+([\.\d]+)/))) {

      expr = expr.replace(/([-\d\.]+)\s+-\s+([\.\d]+)/g, ' $1 + - $2 ');
    }
    expr = expr.replace(/\s+([\/\*])\s+-\s+([\.\d]+)/g, ' $1 - $2 ');
    expr = expr.replace(/-\s+([\d\.]+)/g, '-$1 ');

    expr = (expr.trim()).split(/\s+/);
  }

  while (expr.length > 1) {
    let index;
    while ((index = expr.indexOf('/')) >= 0) {
      if (+expr[index + 1] === 0) throw 'TypeError: Division by zero.';
      expr.splice(index - 1, 3, +expr[index - 1] / +expr[index + 1]);
    }
    while ((index = expr.indexOf('*')) >= 0) {
      expr.splice(index - 1, 3, expr[index - 1] * expr[index + 1]);
    }
    while ((index = expr.indexOf('-')) >= 0) {
      expr.splice(index - 1, 3, expr[index - 1] - expr[index + 1]);
    }
    while ((index = expr.indexOf('+')) >= 0) {
      expr.splice(index - 1, 3, +expr[index - 1] + +expr[index + 1]);
    }
  }
  return expr[0];
}

module.exports = {
  expressionCalculator
}