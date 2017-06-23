const winston = require('winston')
module.exports = function (roll) {
  let rollString = `\`\`\`Rolling ${roll}:\n`
  if (/^\d?d\d+$/.test(roll)) {  // standard x rolls of x faces, separated by d
	  let exp = roll.split('d')
	  let count = 1
	  let faces = 20
	  console.log(roll)
	  if (exp[0] && exp[1]) {
	  	count = exp[0]
	  	faces = exp[1]
	  }
	  let results = []
	  let sum = 0

	  for (let i = 1; i <= count; i++) { // do the rolls
	  	let ran = Math.floor(Math.random() * faces)
	  	sum += ran
	  	results.push(ran)
	  	rollString += `Die ${i}: ${ran}\n`
	  }
	  winston.info(`count: ${count}, faces: ${faces}, results: ${results}, sum: ${sum}`)
	  rollString += `Rolled: ${sum}\`\`\``
  }
  return rollString
}
