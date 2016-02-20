KodingGame.entryState = function(game){
  this.background;
  this.startButton;
}


KodingGame.entryState.prototype = {
  preload: function(){
    game.load.image(assets.entryBackground.name, assets.entryBackground.url)
    game.load.image(assets.startButton.name, assets.startButton.url)
  },

  create: function(){
    this.background = game.add.sprite(0, 0, assets.entryBackground.name)
    this.background.scale.set(2, 3)
    game.add.text(game.world.width * 0.25, game.world.height * 0.3, 'Koding Medical Game', { fontSize: '40px', fill: '#444' });
    this.startButton = game.add.button(game.world.width * 0.4, game.world.height * 0.5, assets.startButton.name,  this.startClickAction, this)
    //scaling options
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

  },

  update: function(){

  },

  startClickAction: function() {
    // this.background.visible =! this.background.visible
    game.state.start(gameStates.game)
  }
}
