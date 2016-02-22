KodingGame.bootState = function(){};

//setting game configuration and loading the assets for the loading screen

KodingGame.bootState.prototype = {
  preload: function() {
    game.load.image('preloadbar', 'assets/preloader-bar.png');
  },
  create: function() {
    //loading screen will have a white background
    game.stage.backgroundColor = '#fff';

    //scaling options
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    game.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.state.start(gameStates.preload);
  }
};
