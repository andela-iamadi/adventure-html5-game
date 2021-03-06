KodingGame.endState = function(game){
  this.background;
  this.startButton;
}

KodingGame.endState.prototype = {
  preload: function(){

  },

  create: function(){
    this.background = game.add.sprite(0, 0, assets.endBackground.name)
    this.background.scale.set(0.5, 0.7);
    this.startButton = game.add.button(game.world.centerX - 150, game.world.height * 0.1, assets.youWinText.name,  this.startClickAction, this);
    this.startButton.scale.set(0.8, 0.8)
    // game.add.text(game.world.width * 0.25, game.world.height * 0.2, 'You win!!', { fontSize: '40px', fill: '#444' });
  },

  update: function(){
    // game.state.start(gameStates.game)
  },

  startClickAction: function() {
    // this.background.visible =! this.background.visible
    game.state.start(gameStates.game)
  }
}
