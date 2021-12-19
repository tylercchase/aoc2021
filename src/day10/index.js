import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n')

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  let characters = {
    '<': {
      closing: '>',
      value: 25137
    },
    '[': {
      closing: ']',
      value: 57
    },
    '(' : {
      closing: ')',
      value: 3
    },
    '{': {
      closing: '}',
      value: 1197
    }
  }
  let total = 0;
  for(let line of input) {
    let stack = [];
    for(let symbol of line) {
        if(Object.keys(characters).includes(symbol)){
          stack.push(symbol)
        } else {
          let lastChar = stack.pop()
          if(characters[lastChar].closing !== symbol){
            for(let key of Object.keys(characters)) {
              if(characters[key].closing === symbol){
                total += characters[key].value
              }
            }
          }
        }
    }
  }
  return total
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  let characters = {
    '<': {
      closing: '>',
      value: 4
    },
    '[': {
      closing: ']',
      value: 2
    },
    '(' : {
      closing: ')',
      value: 1
    },
    '{': {
      closing: '}',
      value: 3
    }
  }
  let total = 0;
  let stacks = [];
  for(let line = 0; line < input.length; line++) {
    let stack = [];
    for(let symbol of input[line]) {
        if(Object.keys(characters).includes(symbol)){
          stack.push(symbol)
        } else {
          let lastChar = stack.pop()
          if(characters[lastChar].closing !== symbol){
            stack = [];
            break
          }
        }
    }
    stacks.push(stack)
  }
  let stackTotals = [];
   stacks = stacks.filter(x=>x.length > 0)
  for(let stack of stacks) {
    let stackTotal = 0;
    for(let x = stack.length; x >= 0; x--){
      stackTotal = stackTotal * 5;
      if(characters[stack[x]]?.value){
        stackTotal += characters[stack[x]]?.value
      }
    }
    stackTotals.push(stackTotal)
  }
  stackTotals.sort((a,b)=>a-b)
  return stackTotals[Math.floor(stackTotals.length / 2)]
}

run({
  part1: {
    tests: [
      { input: `
        [({(<(())[]>[[{[]{<()<>>
        [(()[<>])]({[<{<<[]>>(
        {([(<{}[<>[]}>{[]{[(<()>
        (((({<>}<{<{<>}{[]{[]{}
        [[<[([]))<([[{}[[()]]]
        [{[{({}]{}}([{[{{{}}([]
        {<[[]]>}<{[{[{[]{()[[[]
        [<(<(<(<{}))><([]([]()
        <{([([[(<>()){}]>(<<{{
        <{([{{}}[<[[[<>{}]]]>[]]`, expected: 26397 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      [({(<(())[]>[[{[]{<()<>>
      [(()[<>])]({[<{<<[]>>(
      {([(<{}[<>[]}>{[]{[(<()>
      (((({<>}<{<{<>}{[]{[]{}
      [[<[([]))<([[{}[[()]]]
      [{[{({}]{}}([{[{{{}}([]
      {<[[]]>}<{[{[{[]{()[[[]
      [<(<(<(<{}))><([]([]()
      <{([([[(<>()){}]>(<<{{
      <{([{{}}[<[[[<>{}]]]>[]]`, expected: 288957 },

    ],
    solution: part2,
  },
  trimTestInputs: true,
})
