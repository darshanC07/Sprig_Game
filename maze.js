/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze
@author: Darshan Choudhary
@tags: []
@addedOn: 2024-00-00
*/
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/gh/hackclub/sprig@1.1.0/dist/sprig.min.js';
document.head.appendChild(script);

const player = "p"
const border = "b"
const coin = "c"
const exit = "e"
const bg = "f"
const background_grass = "g"


setLegend(
  [player, bitmap`
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
................`],
  [border, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [coin, bitmap`
................
....66666666....
...6666666666...
..666CCCCCC666..
.666CCCCCCCC666.
.66CCCCCCCCCC66.
.66CCC6666CCC66.
.66CCC6CCCCCC66.
.66CCC6CCCCCC66.
.66CCC6666CCC66.
.66CCCCCCCCCC66.
.666CCCCCCCC666.
..666CCCCCC666..
...6666666666...
....66666666....
................`],
  [exit, bitmap`
................
................
................
................
................
................
................
................
................
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [bg, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [background_grass,bitmap`
DD44DDDDDDDDD4DD
D44D4DD44DDDDD4D
D44DD44DD4DD4D4D
D444DDD444444D4D
D444DD444DDD4D4D
44D4DDDD44D44D44
4DD4DD4D44D4D444
4D4DDD4D44D4D44D
DD4DDD4D4DD4D44D
DD4D4D4D4D44D44D
DD4D4DDD4D44D44D
D4DD4DD44D4444D4
DDDDDD4D4D4D44D4
4DDDDDD4D4DDD444
4DD4444444D444D4
DDDDDDDDD44DDDDD`]
)

setSolids([player, border])

let level = 3
const levels = [
  map`
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff
ffffffffff`,
  map`
..............
..............
bbbbbbbbbbbbbb
b......b.....b
b.c....b.bbbbb
b..bbb.b.b...b
b....b.b.b.b.b
bbbb.b.b.b.b.b
.....b.b...b.b
p....b.b.c.b.b
bbbbbb.bbb.b.b
b......b...b.b
b.bbbbbb.bbbcb
b.b......b...b
b.b..c...b.b.b
b.bbbbb..b.b.b
b...c....b.b.b
bbbbbbbbbb.bbb
..............
..............`,
  map`
.....................
.....................
bp.bbbbbbbbbbbbbbbbbb
b...cb.....b.......cb
b.bb.b.....b........b
b.b..b.bbb...bbbbb..b
b.b.cb..cb...bcb....b
b.bbbbbb.bbb.b.b.bbbb
b......b...b...b.bc.b
bbbb...b...bbbbb.bb.b
bc...bbb.b...b......b
b..bbb...b..cb......b
b.bb...b.bbbbb..bbbbb
b......b...b....c...b
b..cb..bc..b....b...b
bbbbbbbbbbbbbbbbbb..b
.....................
.....................`,
  map`
...................
...................
b.bbbbbbbbbbbbbbbbb
b.b...c.b...cb...cb
b.b.bbb.bbbb.b.bb.b
b.c.bc..b....b.b..b
b.bbb.bbbb.bbb.bcbb
b.b...b...c....b..b
bbb.bbb.bbbbbbbbb.b
bc..b.bcb...c.....b
b.bbb.b.bb.b.b.bb.b
b.b.....b..b.bbbbbb
b.b.bbbbb..b.....cb
b.b.bcb....bbbbbb.b
b.bcb.bbbb.b..b..pb
b...b...c..b.c...cb
bbbbbbbbbbbbbbbbb.b
...................
...................`,
  map`
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffffff
fffffffffffcfff
fffffffffffffff
fffffffffffffff
fffffffffffffff`
]

setMap(levels[level])

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
onInput("j", () => {
  setMap(levels[level]);
})


if (level == 0) {
  addText("Maze Game", {
    x: 6,
    y: 2,
    size: 1,
    color: color`6`
  })
  addText("Goal is to come out\n of maze and also \nearn COINS in this\n      journey", {
    x: 1,
    y: 5,
    size: 0.5,
    color: color`2`
  })
  addText("\nPress 'k' to start", {
    x: 1,
    y: 10,
    size: 0.5,
    color: color`4`
  })
  addText("-Darshan", {
    x: 12,
    y: 15,
    size: 0.5,
    color: color`2`
  })
  onInput("k", () => {
    clearText()
    next_level()
  })
}

function isTouchingAny(tileTypes) {
  let playerTile = getFirst(player)
  if (!playerTile) return false;

  let tiles = tileTypes.map((tileType) => getAll(tileType)).flat()
  let result = false

  tiles.forEach((tile) => {
    if ((tile.x == playerTile.x) && (tile.y == playerTile.y)) {
      // Doesn't work without a variable for some reason. It should!
      result = {
        x: tile.x,
        y: tile.y,
      }
    }
  })
  return result
}


let totalCoins = 0

//funct to set new level
function next_level() {
  if(level!=0){
    // pausePlayback(playback)
    playTune(win, 1)
    // resumePlayback(playback)
  }
  clearText()
  totalCoins += coins_earned
  coins_earned = 0
  level += 1
  setMap(levels[level])
  if (level == 1) {
    addText("LEVEL=" + level, {
      x: 8,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 2) {
    addText("LEVEL=" + level, {
      x: 10,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 3) {
    addText("LEVEL=" + level, {
      x: 10,
      y: 15,
      size: 0.5,
      color: color`0`
    })
  } else if (level == 4) {
    addText("Congratulations!! \n\nYou  successfully \ncame out of maze.", {
      x: 1,
      y: 5,
      size: 1,
      color: color`2`
    })
    addText("Total Coins =   " + totalCoins, {
      x: 1,
      y: 11,
      size: 1,
      color: color`6`
    })
    addText(" press 'i' to\n  open shop", {
      x: 3,
      y: 13,
      size: 1,
      color: color`4`
    })
  }
}

let coins_earned = 0

const moveNotesUp = () => {
  const noteTypes = [up, down, left, right];
  for (const type of noteTypes) {
    const noteSprites = getAll(type);
    for (const note of noteSprites) {
      if (note.y > 0) {
        note.y -= 1;
      } else {}
    }
  }
};

setInterval(() => {
  moveNotesUp();
}, 80);



//music for different events
const bgm = tune`
144.92753623188406: D5-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406 + D5-144.92753623188406,
144.92753623188406: undefined/144.92753623188406 + C5-144.92753623188406,
144.92753623188406,
144.92753623188406: C5-144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: B4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: G4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: A4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
289.8550724637681,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: C5-144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406,
144.92753623188406: D5-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: D4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: D4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: D4-144.92753623188406 + undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
144.92753623188406: undefined/144.92753623188406,
289.8550724637681`;

const win = tune`
208.33333333333334: C4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: D4-208.33333333333334,
208.33333333333334: E4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: F4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: G4-208.33333333333334,
208.33333333333334: A4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: G4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: C5-208.33333333333334,
208.33333333333334: B4-208.33333333333334 + undefined/208.33333333333334,
208.33333333333334: C5-208.33333333333334 + undefined/208.33333333333334,
4583.333333333334`;

const coin_music = tune`
164.83516483516485: E5-164.83516483516485,
164.83516483516485: A5-164.83516483516485,
4945.054945054945`;

const playback = playTune(bgm, Infinity)

afterInput(() => {

  if (level == 1) {
    addText("Coins : " + coins_earned, {
      x: 6,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  } else if (level == 2) {
    addText("Coins : " + coins_earned, {
      x: 8,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  } else if (level == 3) {
    addText("Coins : " + coins_earned, {
      x: 8,
      y: 0,
      size: 0.1,
      color: color`0`
    })
  }

  let player_tile_x = getFirst(player).x
  let player_tile_y = getFirst(player).y
  console.log(player_tile_x, player_tile_y)
  let items = getTile(player_tile_x, player_tile_y);
  console.log(items);
  if (items.length > 1) {
    if (items[1].type == coin) {
      playTune(coin_music,1)
      items[1].remove();
      coins_earned += 1
    }
  }
  //checking if the player reached end - level 1
  if (level == 1) {
    if (player_tile_x == 10 && player_tile_y == 17) {
      let winning_msg = addText("You Won!!!", {
        x: 5,
        y: 7,
        size: 5,
        color: color`0`
      })
      setTimeout(next_level, 2000)

    }
  } else if (level == 2) {
    if ([player_tile_x, player_tile_y].toString() == [18, 15].toString() || [player_tile_x, player_tile_y].toString() == [19, 15].toString()) {
      let winning_msg = addText("You Won!!", {
        x: 6,
        y: 7,
        size: 5,
        color: color`0`
      })
      setTimeout(next_level, 2000)
    }
  } else if (level == 3) {
    if (player_tile_x == 17 && player_tile_y == 16) {
      let winning_msg = addText("You Won!!!", {
        x: 5,
        y: 7,
        size: 5,
        color: color`0`
      })
      setTimeout(next_level, 2000)
    }
  }

  if (thinksdestoy == destroyabelthinksperlevel){
    if (tilesWith(player, hous).length >= 1) {
      addText("Level " + text_level + ", compleated", { x: 1, y: 7, color: color`9` })
      level = level + 1
      text_level = text_level + 1
      thinksdestoy = 0
      setMap(levels[level])
    }
  }
  if (level >= playable_levels) {
    addText("You won!", { x: 7, y: 7, color: color`9` })
    addText("Game is Finish!", { x: 2, y: 9, color: color`9` })
  }
})
