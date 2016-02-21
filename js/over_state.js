KodingGame.overState = function(game){
  this.background;
  this.startButton;
}

KodingGame.overState.prototype = {
  preload: function(){
    game.load.image(assets.endBackground.name, assets.endBackground.url)
    game.load.image(assets.startButton.name, assets.startButton.url)
    game.load.image(assets.gameOverText.name, assets.gameOverText.url)
  },

  create: function(){
    this.background = game.add.sprite(0, 0, assets.endBackground.name)
    this.background.scale.set(0.5, 0.7);
    this.startButton = game.add.button(game.world.centerX - 200, game.world.height * 0.1, assets.gameOverText.name,  this.startClickAction, this);
    this.startButton.scale.set(0.8, 0.8)
    // game.add.text(game.world.width * 0.25, game.world.height * 0.2, 'You win!!', { fontSize: '40px', fill: '#444' });
  },

  update: function(){

  },

  startClickAction: function() {
    game.state.start(gameStates.game)
  }
}
