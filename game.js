/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Incredible
@author: 
@tags: []
@addedOn: 2024-00-00
*/
/*[ bg_sprite ,bitmap`
// 0000....0000....
// 0000....0000....
// 0000....0000....
// 0000....0000....
// ....0000....0000
// ....0000....0000
// ....0000....0000
// ....0000....0000
// 0000....0000....
// 0000....0000....
// 0000....0000....
// 0000....0000....
// ....0000....0000
// ....0000....0000
// ....0000....0000
// ....0000....0000` ],
[bg, map`
mmmmmm
mmmmmm
mmmmmm
mmmmmm
mmmmmm
mmmmmm`]*/
console.log("start");
const player = "p"
const trash = "t"
const dustbin = "b"
const outline = "o"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ trash, bitmap`
................
................
................
................
................
................
.....00000......
....C00C0C0.....
....00C0000.....
....0C0C0C0.....
....0000000.....
.....0C00C......
................
................
................
................` ],
  [ dustbin, bitmap`
................
................
................
................
..00000000000...
..0CCCCCCCCC0...
..0000.00.000...
...00.00.000....
...0.00.00.0....
...000.00.00....
...00.00.000....
...0.00.00.0....
...000.00.00....
...0.000.000....
...000000000....
................` ],
  [ outline, bitmap`
0000000000000000
0000000000000000
00CCCCCCCCCCCC00
00CCCCCCCCCCCC00
00CC00000000CC00
00CC00000000CC00
00CC00CCCC00CC00
00CC00CCCC00CC00
00CC00CCCC00CC00
00CC00CCCC00CC00
00CC00000000CC00
00CC00000000CC00
00CCCCCCCCCCCC00
00CCCCCCCCCCCC00
0000000000000000
0000000000000000`],

)

setSolids([player,trash])

let level = 0
const levels = [
  map`
oooooooooooooo
o............o
o............o
oooooooooooooo
..............
..............
.....p..t.....
..............
.....t........
.........b....`,
  map`
oooooooooooooo
o............o
o............o
oooooooooooooo
..............
.....tt.t.....
.....p.t.t....
.....t........
......t.t.....
.....t..b.....`,
  
  
]

setMap(levels[level])

setPushables({
  [ player ]: [trash],
  [ trash ]: [trash]
})



onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

/*code to reset the current level*/
onInput("j",()=>{
  setMap(levels[level]);
})

afterInput(() => {
  number_of_trash = getAll(trash).length
  addText("No. of trash \nremaining = "+number_of_trash,{
    x : 4,
    y : 3,
    size : 0.5
  })
  
  const dustbin_x = getFirst(dustbin).x;
  const dustbin_y = getFirst(dustbin).y;
  console.log(dustbin_x, dustbin_y);
  const elements = getTile(dustbin_x, dustbin_y);
  // console.log(elements);
  if (elements.length>1){
    console.log("delete");
    if(elements[0].type != player){
    elements[0].remove();}
  }
  console.log(getAll(trash).length);
  /*checking is level is completed or not*/
  if (getAll(trash).length == 0){
    level+=1;
    setMap(levels[level])
  }
})

let currentLevelText;

let mainMenuTitle = `
  Up  Down
  
  Top-Down
`;

let mainMenuOptions = `
  Start Game
  ----------
  
  Guide
  -----
`;

let backButton = `
Back
----
`;

let tutorial1 = `
Double-click
the jump button 
to get higher
`;

let tutorial2 = `
Get on 
top the
Gravity 
Block to
activate`;

let errorSpawn = `
Error: Couldn't 
find empty tile
for player spawn`;

let deathText = `You died`;

let finishText = `
You completed
  the game!


  
 Thanks for
  playing!`;

// Guide Texts
let menuGuide = `Press   

to activate`;
// Controls
let upLGuide = `Moves player 
upward in 
Top-down mode`;
let leftLGuide = `Moves player to 
the left`;
let downLGuide = `Moves player 
downward in
Top-down mode`;
let rightLGuide = `Moves player to 
the right`;
let upRGuide = `Makes player jump`;
let leftRGuide = `Returns to menu
(Level is saved)`;
let downRGuide = `Makes player jump,
also acts as the
back button in
the menu`;
let rightRGuide = `Confirm menu
selection, also 
acts as level skip`;
// Blocks
let playerGuide = `It's you!`;
let blockGuide = `A solid platform,
good for standing
on`;
let magicBlockGuide = `???`;
let flagGuide = `Get near it
and you complete
the level`;
let gravityBlockGuide = `Stand on this
block and watch
as you flip
upside down`;

function gameFinished(winner) {
  gameover = true
  if (winner == "x") {
    addText(`Game over. X won!`, {
      y: 5,
      size: 1,
      color: color`3`
    })
  } else if (winner == "o") {
    addText(`Game over. O won!`, {
      y: 5,
      color: color`4`
    })
  } else {
    addText(`Game over.`, {
      x: 6,
      y: 3,
      color: color`9`
    })
    addText(`It's a draw!`, {
      x: 5,
      y: 5,
      color: color`9`
    })
  }
  addText(`Press J to restart`, {
    x: 1,
    y: 10,
    size: 1,
    color: color`H`
  })
}

function resetCurrentLevel() {
  if (!isInMainMenu && isGameStarted) {
    if (easyLevels.includes(currentLevel)) {
      setMap(currentLevel);
    } else if (mediumLevels.includes(currentLevel)) {
      setMap(currentLevel);
    } else if (hardLevels.includes(currentLevel)) {
      setMap(currentLevel);
    }
  }
}

// Start game functions for each difficulty
function startEasyGame() {
  currentLevel = easyLevels[easyLevel];
  setMap(currentLevel);
  clearText();
  isGameStarted = true;

  afterInput(() => {
    checkCompletion(easyLevels);
  });
}
