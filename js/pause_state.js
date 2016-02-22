KodingGame.pauseState = function(game){
  this.background;
  this.playButton;
  this.quitButton;
}

KodingGame.pauseState.prototype = {
  preload: function(){

  },

  create: function(){
    this.background = game.add.sprite(0, 0, assets.pauseBackground.name)
    this.background.scale.set(2, 2);
    game.add.sprite(game.world.width * 0.4, game.world.height * 0.2, assets.pauseText.name)
    this.playButton = game.add.button(game.world.centerX - 150, game.world.height * 0.5, assets.playButton.name, this.playButtonAction, this)
    this.playButton.scale.set(0.38, 0.4);
    this.quitButton = game.add.button(game.world.centerX + 10, game.world.height * 0.51, assets.quitButton.name, this.quitButtonAction, this)
  },

  update: function(){

  },

  playButtonAction: function(){
    game.state.start(gameStates.game)
  },

  quitButtonAction: function() {
    if (confirm("Are you sure you want to quit current game?")) {
      game.state.start(gameStates.entry)
    }
  }
}
