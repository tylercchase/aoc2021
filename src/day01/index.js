import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(x=>+x)

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let increments = 0;
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i] < input[i + 1]) {
      increments++;
    }
  }
  return increments;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let increments = 0;
  const slidingNumbers = [];
  for (let i = 0; i < input.length; i++) {
    slidingNumbers.push(input[i] + input[i + 1] + input[i + 2]);
  }
  for (let i = 0; i < slidingNumbers.length - 1; i++) {
    if (slidingNumbers[i] < slidingNumbers[i + 1]) {
      increments++;
    }
  }
  return increments;
}

run({
  part1: {
    tests: [
      { input: `
      199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 7 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      199
      200
      208
      210
      200
      207
      240
      269
      260
      263`, expected: 5 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
