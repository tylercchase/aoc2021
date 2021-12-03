import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let diagnotic = [];
  for(let i = 0; i < input[0].length; i++){
    diagnotic.push(0);
  }
  for(let i=0; i < diagnotic.length; i++) {
    let ones = 0;
    let zeros = 0;
    for(let report of input){
      if(report[i]==='0'){
        zeros += 1;
      } else {
        ones += 1;
      }
    }
    diagnotic[i] = (ones > zeros) ? 1 : 0;
  }
  let gamma = parseInt(diagnotic.join(''), 2)
  let epsilon = parseInt(diagnotic.map(x=> {return x=='0'? '1' : '0'}).join(''),2)
  return gamma * epsilon;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let diagnotic = [];
  for(let i = 0; i < input[0].length; i++){
    diagnotic.push(0);
  }
  let copy = input;
  for(let i=0; i < diagnotic.length; i++) {
    let ones = 0;
    let zeros = 0;
    for(let report of copy){
      if(report[i]==='0'){
        zeros += 1;
      } else {
        ones += 1;
      }
    }
    diagnotic[i] = (ones >= zeros) ? 1 : 0;
    copy = copy.filter(x => x[i] === diagnotic[i].toString());
    if(copy.length === 1){
      break;
    }
  }
  let copy2 = input;
  for(let i=0; i < diagnotic.length; i++) {
    let ones = 0;
    let zeros = 0;
    for(let report of copy2){
      if(report[i]==='0'){
        zeros += 1;
      } else {
        ones += 1;
      }
    }
    diagnotic[i] = (ones < zeros) ? 1 : 0;
    copy2 = copy2.filter(x => x[i] === diagnotic[i].toString());
    if(copy2.length === 1){
      break;
    }
  }
  let gamma = parseInt(copy.join(''), 2)
  let e = parseInt(copy2.join(''), 2)
  return gamma * e;
}

run({
  part1: {
    tests: [
      { input: `
      00100
      11110
      10110
      10111
      10101
      01111
      00111
      11100
      10000
      11001
      00010
      01010`, expected: 198 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`, expected: 230 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
