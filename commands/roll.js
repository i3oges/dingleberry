const winston = require('winston')
module.exports = function (roll) {
  const cMessageRegex = /(?:\#)(\s|\w)+/
  const dndRollRegex = /^\d+?d\d+/
  const regRollRegex = /^\d+$/

  let message = 'Rolled'
  let count = 1
  let faces = 20
  let results = []
  let sum = 0
  if (cMessageRegex.test(roll)) { // roll has a custom message
  	winston.info(roll.match(cMessageRegex)[0])
  	message = roll.match(cMessageRegex)[0].replace(/\#\s?/, '')
  	roll = roll.replace(cMessageRegex, '')
  }
  if (dndRollRegex.test(roll)) {  // standard x rolls of x faces, separated by d
	  let exp = roll.split('d')
	  winston.info(exp)
	  if (exp[0] && exp[1]) {
	  	count = +(exp[0])
	  	faces = +(exp[1])
	  }
  } else if (regRollRegex.test(roll)) { // is a regular roll out of x
  	count = 1
  	faces = +(roll)
  }

  for (let i = 1; i <= count; i++) { // do the rolls
  	let ran = Math.floor(Math.random() * faces) + 1
  	sum += ran
  	results.push(ran)
  }
  winston.info(`count: ${count}, faces: ${faces}, results: ${results}, sum: ${sum}`)
  return {
  	'message': message,
  	'count': count,
  	'faces': faces,
  	'results': results,
  	'sum': sum
  }
}
