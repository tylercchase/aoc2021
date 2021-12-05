import run from "aocrunner"
import { cp } from "fs";

const parseInput = (rawInput) => rawInput.split('\n')
const winningBoard = (board) => {
  for(let row of board){
    if(row.every(x=>x.called)){
      return true;
    }
  }

  let tracker = 0;
  for(let col = 0; col<5; col++){
    for(let row=0; row < 5; row++) {
      if(board[row][col].called === true){
        tracker++;
      }
    }
    if(tracker === 5) {
      return true
    } else {
      tracker = 0;
    }
  }
  return false;
}
const callNumber = (boards, number) => {
  for(let board of boards) {
    for(let row of board){
      for(let num of row){
        if(num.number === number){
          num.called = true;
        }
      }
    }
  }
}

const addUp = (board) => {
  let sum = 0;
  for(let row of board){
    for(let num of row) {
      if(!num.called) {
        sum += num.number;
      }
    }
  }
  return sum;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const calls = input[0].split(',').map(x=>+x);
  let boards = [];
  input.splice(0,2)
  let board = [];
  for(let line of input){
    if(line === ''){
      continue
    }
    board.push(line.match(/.{1,3}/g).map(x=>{return {number: +x,called : false}}));
    if(board.length === 5){
      boards.push(board)
      board = []
    }
  }
  let wonBoard;
  let lastCalled = 1;
  for(let call of calls) {
    callNumber(boards, call);
    for(let board of boards) {
      if(winningBoard(board)){
        wonBoard = board;
      break;

      }
    }
    if(wonBoard){
      lastCalled = call
      break;
    }
  }
  let sum = addUp(wonBoard);
  return sum * lastCalled;
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const calls = input[0].split(',').map(x=>+x);
  let boards = [];
  input.splice(0,2)
  let board = [];
  for(let line of input){
    if(line === ''){
      continue
    }
    board.push(line.match(/.{1,3}/g).map(x=>{return {number: +x,called : false}}));
    if(board.length === 5){
      boards.push(board)
      board = []
    }
  }
  let wonBoard;
  let lastCalled = 1;
  let currentWin = false;
  for(let call of calls) {
    callNumber(boards, call);
    for(let i=0; i < boards.length; i++) {
      if(winningBoard(boards[i])){
        wonBoard = boards[i];
        if(boards.length === 1 ) {
          currentWin = true;
        } else {
        boards.splice(i,1);

        }
      }
    }
    lastCalled = call
    if(boards.length === 1 && currentWin) {
      break
    }
  }
  let sum = addUp(wonBoard);
  return sum * lastCalled;
}

run({
  part1: {
    tests: [
      { input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19
      
       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6
      
      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 4512 },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      { input: `
      7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

      22 13 17 11  0
       8  2 23  4 24
      21  9 14 16  7
       6 10  3 18  5
       1 12 20 15 19
      
       3 15  0  2 22
       9 18 13 17  5
      19  8  7 25 23
      20 11 10 24  4
      14 21 16 12  6
      
      14 21 17 24  4
      10 16 15  9 19
      18  8 23 26 20
      22 11 13  6  5
       2  0 12  3  7`, expected: 1924 },
    ],
    solution: part2,
  },
  trimTestInputs: true,
})
