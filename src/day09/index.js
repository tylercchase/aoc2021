import run from "aocrunner"

const parseInput = (rawInput) => rawInput.split('\n').map(y=> y.split('').map(x=>+x))
let getNumber = (board, x, y) => {
  if(board?.[x]?.[y] !== undefined) {
    return board[x][y];
  } else {
    return  9999999999;
  }
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const riskPoints = [];
  for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[0].length; y++) {
      const current = input[x][y];
      if(current < getNumber(input,x-1,y) && current < getNumber(input,x+1,y) && current < getNumber(input,x,y-1) && current < getNumber(input,x,y+1)) {
        riskPoints.push(current)
      }
    }
  }
  if(riskPoints.length === 0){
    return 0;
  }
  let total = 0;
  riskPoints.forEach(x => {total += x+1})
  return total//riskPoints.reduce((prev, curr) => {return prev + curr + 1} )
}

const findBasin = (board, point)  =>{
  let total = 1;
  if(point.depth+1 === getNumber(board,point.x-1,point.y) && getNumber(board,point.x-1,point.y) != 9){
    total += findBasin(board, {x: point.x-1, y: point.y, depth: point.depth +1})
  }
  if(point.depth+1 === getNumber(board,point.x+1,point.y) && getNumber(board,point.x+1,point.y) != 9){
    total += findBasin(board, {x: point.x+1, y: point.y, depth: point.depth +1})
  }
  if(point.depth+1 === getNumber(board,point.x,point.y-1) && getNumber(board,point.x,point.y-1) != 9){
    total += findBasin(board, {x: point.x, y: point.y-1, depth: point.depth +1})
  }
  if(point.depth+1 === getNumber(board,point.x,point.y+1) && getNumber(board,point.x,point.y+1) != 9){
    total += findBasin(board, {x: point.x, y: point.y+1, depth: point.depth +1})
  }
  return total;
}
const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const riskPoints = [];
  for(let x = 0; x < input.length; x++){
    for(let y = 0; y < input[0].length; y++) {
      const current = input[x][y];
      if(current < getNumber(input,x-1,y) && current < getNumber(input,x+1,y) && current < getNumber(input,x,y-1) && current < getNumber(input,x,y+1)) {
        riskPoints.push({x: x, y: y, depth: current})
      }
    }
  }
  if(riskPoints.length === 0){
    return 0;
  }
  let total = 0;
  let basins = riskPoints.map(x => findBasin(input, x)).sort((a,b)=>b-a)
  console.log(basins)
  return basins?.[0] * basins?.[1] * basins?.[2];
}

run({
  part1: {
    tests: [
      { input: `
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678`, expected: 15 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      2199943210
      3987894921
      9856789892
      8767896789
      9899965678`, expected: 1134 }
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
