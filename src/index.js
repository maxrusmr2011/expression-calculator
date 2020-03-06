function eval() {
  // Do not use eval!!!
  return;
}



function expressionCalculator(expr) {
  if (typeof expr === 'string') {
    // console.log(1, expr);
     expr = expr.replace(/\s*([\(\)\/\*\+-])\s*/g, ' $1 ');
    // console.log(2, expr);
    let bracket;
    while (bracket = expr.match(/\((\s.+\s)\)/)) {
      // console.log(1, expr);
      expr = expr.replace(bracket[0], ' ' + expressionCalculator(bracket[1]) + ' ');
      // console.log(2, expr);
    }

    expr = (expr.trim()).split(/\s+/);
  }
  // console.log(expr);

  while (expr.length > 1) {
    let index;
    // console.log('start',expr);
    while ((index = expr.indexOf('/')) >= 0) {
      // console.log('1/',expr);
      if(+expr[index + 1] === 0) throw 'TypeError: Division by zero.';
      expr.splice(index - 1, 3, +expr[index - 1] / +expr[index + 1]);
      // console.log('2/',expr);
    }
    while ((index = expr.indexOf('*')) >= 0) {
      // console.log('1*',expr);
      expr.splice(index - 1, 3, expr[index - 1] * expr[index + 1]);
      // console.log('2*',expr);
    }
    while ((index = expr.indexOf('-')) >= 0) {
      // console.log('1-',expt);
      expr.splice(index - 1, 3, expr[index - 1] - expr[index + 1]);
      // console.log('2-',expr);
    }    
    while ((index = expr.indexOf('+')) >= 0) {
      // console.log('1+',expr);
      expr.splice(index - 1, 3, +expr[index - 1] + +expr[index + 1]);
      // console.log('2+',expr);
    }

  }


  return expr[0];
}

module.exports = {
  expressionCalculator
}