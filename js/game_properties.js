var KodingGame = {};

var gameProperties = {
  screenWidth: 800,
  screenHeight: 600
}

var gameStates = {
  entry: "entryState",
  game: "gameState",
  paused: "pauseState",
  end: "endState"
}

var assets = {
  entryBackground: {name: "entryBackground", url: "/assets/sky.png"},
  gameBackground: {name: "gameBackground", url: "/assets/field.jpg"},
  pauseBackground: {name: "pauseBackground", url: "/assets/green_locks.png"},
  startButton: {name: "startButton", url: "/assets/start_button.png"},
  pauseButton: {name: "pauseButton", url: "/assets/pause_button.png"},
  playButton: {name: "playButton", url: "/assets/play_button.png"},
  quitButton: {name: "quitButton", url: "/assets/quit_button.png"},
  player: {name: "player", url: "/assets/player.png"},
  pauseText: {name: "pauseText", url: "/assets/pause_text.png"},
  gameLevelOne: {name: "level1", url: "/assets/tilemaps/level1.json"},
  tiles: {name: "gameTiles", url: "/assets/tiles.png" },
  star: {name:"star", url: "/assets/star.png"},
  questionMark: {name: "question_mark", url: "/assets/question_mark.png"}
}
