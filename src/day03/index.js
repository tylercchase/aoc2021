import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const moreOnesThanZeros = (input, index) => {
  let ones = 0;
  let zeros = 0;
  for (let report of input) {
    if (report[index] === '0') {
      zeros += 1;
    } else {
      ones += 1;
    }
  }
  return ones >= zeros
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let diagnostics = Array(input[0].length).fill(0);
  for (let i = 0; i < diagnostics.length; i++) {
    diagnostics[i] = moreOnesThanZeros(input, i) ? 1 : 0;
  }
  let gamma = parseInt(diagnostics.join(''), 2)
  let epsilon = parseInt(diagnostics.map(x => { return x == '0' ? '1' : '0' }).join(''), 2)
  return gamma * epsilon;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let copy1 = input;
  for (let i = 0; i < input[0].length; i++) {
    let match = moreOnesThanZeros(copy1, i) ? '1' : '0';
    copy1 = copy1.filter(x => x[i] === match);
    if (copy1.length === 1) {
      break;
    }
  }
  let copy2 = input;
  for (let i = 0; i < input[0].length; i++) {
    let match = !moreOnesThanZeros(copy2, i) ? '1' : '0';
    copy2 = copy2.filter(x => x[i] === match);
    if (copy2.length === 1) {
      break;
    }
  }
  const oxygen = parseInt(copy1.join(''), 2)
  const CO2 = parseInt(copy2.join(''), 2)
  return oxygen * CO2;
}

run({
  part1: {
    tests: [
      {
        input: `
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
      01010`, expected: 198
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
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
      01010`, expected: 230
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
