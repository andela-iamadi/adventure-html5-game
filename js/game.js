
var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, '')
game.state.add(gameStates.entry, KodingGame.entryState)
game.state.add(gameStates.game, KodingGame.gameState)
game.state.add(gameStates.paused, KodingGame.pauseState)
game.state.add(gameStates.over, KodingGame.overState)
game.state.add(gameStates.end, KodingGame.endState)

game.state.start(gameStates.entry)
