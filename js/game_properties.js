var KodingGame = {};

var gameProperties = {
  screenWidth: 460,
  screenHeight: 460
}

var gameStates = {
  entry: "entryState",
  game: "gameState",
  paused: "pauseState",
  over: "overState",
  end: "endState"
}

var assets = {
  entryBackground: {name: "entryBackground", url: "assets/hospital_room.jpg"},
  endBackground: {name: "endBackground", url: "assets/hospital_bg.png"},
  gameBackground: {name: "gameBackground", url: "assets/field.jpg"},
  pauseBackground: {name: "pauseBackground", url: "assets/green_locks.png"},
  startButton: {name: "startButton", url: "assets/start_button.png"},
  pauseButton: {name: "pauseButton", url: "assets/pause_button.png"},
  playButton: {name: "playButton", url: "assets/play_button.png"},
  quitButton: {name: "quitButton", url: "assets/quit_button.png"},
  player: {name: "player", url: "assets/player.png"},
  pauseText: {name: "pauseText", url: "assets/pause_text.png"},
  gameLevelOne: {name: "level1", url: "assets/tilemaps/level1.json"},
  tiles: {name: "gameTiles", url: "assets/tiles.png" },
  star: {name:"star", url: "assets/star.png"},
  questionMark: {name: "question_mark", url: "assets/question_mark.png"},
  door: {name: "door", url: "assets/door.png"},
  firstAidBox: {name: "first_aid_box", url: "assets/first_aid_box.png"},
  youWinText: {name: "you_win_text", url: "assets/you_win.png"},
  gameOverText: {name: "game_over_text", url: "assets/game_over2.png"},
  soundEffects: {
    name: "game_audio",
    files: [
      'assets/audio/magical_horror_audiosprite.mp3',
      'assets/audio/magical_horror_audiosprite.ogg'
    ]
  },
  music: {
    name: 'boden',
    files: [
      'assets/audio/bodenstaendig_2000_in_rock_4bit.mp3',
      'assets/audio/bodenstaendig_2000_in_rock_4bit.ogg'
    ]
  }
}
