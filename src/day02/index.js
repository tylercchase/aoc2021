import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let horizontal = 0;
  let vertical = 0;
  for ( let line of input) {
    const splitStuff = line.split(' ');
    switch (splitStuff[0]) {
      case 'forward':
        horizontal += parseInt(splitStuff[1]);
        break;
      case 'up':
        vertical -= parseInt(splitStuff[1]);
        break;
      case 'down':
        vertical += parseInt(splitStuff[1]);
        break;
      default:
        break;
    }
  }
  return horizontal * vertical;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let horizontal = 0;
  let vertical = 0;
  let aim = 0;
  for (let line of input) {
    const splitStuff = line.split(' ');
    switch (splitStuff[0]) {
      case 'forward':
        horizontal += parseInt(splitStuff[1]);
        vertical += aim * parseInt(splitStuff[1]);
        break;
      case 'up':
        aim -= parseInt(splitStuff[1]);
        break;
      case 'down':
        aim += parseInt(splitStuff[1]);
        break;
      default:
        break;
    }
  }
  return horizontal * vertical;
}

run({
  part1: {
    tests: [
      { input: `
      forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`, expected: 150 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      forward 5
      down 5
      forward 8
      up 3
      down 8
      forward 2`, expected: 900 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
