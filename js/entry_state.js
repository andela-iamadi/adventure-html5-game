KodingGame.entryState = function(game){
  this.background;
  this.startButton;
  this.player;
  this.music;
}


KodingGame.entryState.prototype = {
  preload: function(){

  },

  create: function(){
    this.background = game.add.sprite(0, 0, assets.entryBackground.name, 0)
    this.background.scale.set(0.4, 0.6);
    var title = game.add.text(game.world.centerX - 60, game.world.height * 0.1, 'MEG',  { fontSize: '50px',  fill: '#F3CF0D', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', align: 'center', wordWrap: 'true',  boundsAlignV: 'middle' });
    game.add.text(105, game.world.height * 0.1 + title.height, 'Medical Education Game', { fontSize: '20px', fill: '#000', backgroundColor: 'rgba(0,0,0,0.2)', width: '100%', align: 'center',  boundsAlignV: 'middle' });
    this.startButton = game.add.button(game.world.width * 0.3, game.world.height * 0.45, assets.startButton.name,  this.startClickAction, this)

    //scaling options
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    this.initPlayer();
    // this.background.animations.add('slide', [0, 1], 10, true)
    // this.background.animations.play('slide');
  },

  update: function(){

  },

  startClickAction: function() {
    // this.background.visible =! this.background.visible
    this.music.stop();
    game.state.start(gameStates.game)
  },

  initPlayer: function() {
    this.player = game.add.sprite(5, game.world.centerY + 40, assets.player.name, 24)
    game.physics.enable(this.player);
    this.player.scale.set(2.9, 2.9);
    this.player.collideWorldBounds = true;
    this.player.animations.add('down', [1, 2, 3, 4, 5, 6], 5, true )
    this.player.animations.add('up', [13, 14, 15, 16, 17, 18], 5, true )
    this.player.animations.add('left', [26, 27, 28, 29, 30], 5, true )
    this.player.animations.add('right', [37, 38, 39, 40, 41, 42], 5, true )
    this.player.animations.play('right');
    this.initAudio();
  },

  initAudio: function() {
    this.music = game.add.audio(assets.music.name);
    this.music.play();
  }
}
