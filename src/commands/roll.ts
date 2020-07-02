export default function (roll?: string) {
  const cMessageRegex = /(?:\#)(\s|\w)+/;
  const dndRollRegex = /^\d+?d\d+/;
  const regRollRegex = /^\d+$/;
  const results = [];

  let message = 'Rolled';
  let count = 1;
  let faces = 20;
  let sum = 0;
  if (roll) {
    if (cMessageRegex.test(roll)) {
      // roll has a custom message
      const match = roll.match(cMessageRegex);
      if (match) {
        message = match[0].replace(/\#\s?/, '');
        roll = roll.replace(cMessageRegex, '');
      }
    }
    if (dndRollRegex.test(roll)) {
      // standard x rolls of x faces, separated by d
      let exp = roll.split('d');
      if (exp[0] && exp[1]) {
        count = +exp[0];
        faces = +exp[1];
      }
    } else if (regRollRegex.test(roll)) {
      // is a regular roll out of x
      count = 1;
      faces = +roll;
    }
  }

  for (let i = 1; i <= count; i++) {
    // do the rolls
    const ran = Math.floor(Math.random() * faces) + 1;
    sum += ran;
    results.push(ran);
  }
  return {
    message,
    count,
    faces,
    results,
    sum,
  };
}
