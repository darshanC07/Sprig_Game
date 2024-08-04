/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const border = "b"
const coin = "c"
const exit = "e"


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
  [ border, bitmap`
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
DDDDDDDDDDDDDDDD`]
)

setSolids([player, border])

let level = 2
const levels = [
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
bpbbbbbbbbbbbbbbbbb
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
b.bcb.bbbb.b..b...b
b...b...c..b.c...cb
bbbbbbbbbbbbbbbbb.b
...................
...................`,
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
onInput("j",()=>{
  setMap(levels[level]);
})

if (level==0){
  addText("LEVEL="+(level+1),{
      x : 8,
      y : 15,
      size : 0.5,
      color : color`0`
  })
} 

let totalCoins = 0

//funct to set new level
function next_level(){
    clearText()
    totalCoins += coins_earned
    coins_earned = 0
    level += 1
    setMap(levels[level])
    if(level==1){
      addText("LEVEL="+(level+1),{
          x : 10,
          y : 15,
          size : 0.5,
          color : color`0`
      })
    } else if(level==2){
      addText("LEVEL="+(level+1),{
          x : 10,
          y : 15,
          size : 0.5,
          color : color`0`
      })
    }
}

let coins_earned = 0

afterInput(() => {

  if (level==0){ 
    addText("Coins : "+ coins_earned,{
      x : 6,
      y : 0,
      size : 0.1,
      color : color`0`
    })
  } else if(level==1){
      addText("Coins : "+ coins_earned,{
        x : 8,
        y : 0,
        size : 0.1,
        color : color`0`
      })
  } else if(level==2){
      addText("Coins : "+ coins_earned,{
        x : 8,
        y : 0,
        size : 0.1,
        color : color`0`
      })
  }

  let player_tile_x = getFirst(player).x
  let player_tile_y = getFirst(player).y
  console.log(player_tile_x,player_tile_y)
  let items = getTile(player_tile_x,player_tile_y);
  console.log(items);
  if (items.length>1){
    if(items[1].type == coin){
      items[1].remove();
      coins_earned +=1
    }
  }
  //checking if the player reached end - level 1
  if(level==0){
    if (player_tile_x==10 && player_tile_y==17){
        let winning_msg = addText("You Won!!!" ,{
            x : 5,
            y : 7,
            size : 5,
            color : color`0`
        })
        setTimeout(next_level, 2000)
      
    }
  } else if(level==1){
    if ([player_tile_x,player_tile_y].toString() == [18,15].toString() || [player_tile_x,player_tile_y].toString() == [19,15].toString()){
        let winning_msg = addText("You Won!!" ,{
          x : 6,
          y : 7,
          size : 5,
          color : color`0`
        })
        setTimeout(next_level, 2000)
    }
  } else if(level==2){
    if (player_tile_x==17 && player_tile_y==16){
        let winning_msg = addText("You Won!!!" ,{
            x : 5,
            y : 7,
            size : 5,
            color : color`0`
        })
        setTimeout(next_level, 2000)
    }
  } 
})
