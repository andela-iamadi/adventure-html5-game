//loading the game assets
KodingGame.preloadState = function(){};

KodingGame.preloadState.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    game.load.image(assets.entryBackground.name, assets.entryBackground.url)
    game.load.image(assets.startButton.name, assets.startButton.url)
    game.load.spritesheet(assets.player.name, assets.player.url, 31, 60);

    game.load.tilemap(assets.gameLevelOne.name, assets.gameLevelOne.url, null, Phaser.Tilemap.TILED_JSON);
    game.load.image(assets.gameBackground.name, assets.gameBackground.url);
    game.load.image(assets.tiles.name, assets.tiles.url);
    game.load.image(assets.star.name, assets.star.url);
    game.load.image(assets.firstAidBox.name, assets.firstAidBox.url);
    game.load.image(assets.pauseButton.name, assets.pauseButton.url);
    game.load.spritesheet(assets.questionMark.name, assets.questionMark.url, 32, 32)
    game.load.spritesheet(assets.player.name, assets.player.url, 31, 60);
    game.load.spritesheet(assets.door.name, assets.door.url, 34, 60);
    game.load.audio(assets.soundEffects.name, assets.soundEffects.files);
    game.load.audio(assets.music.name, assets.music.files);

    game.load.image(assets.endBackground.name, assets.endBackground.url)
    game.load.image(assets.startButton.name, assets.startButton.url)
    game.load.image(assets.youWinText.name, assets.youWinText.url)

    game.load.image(assets.pauseBackground.name, assets.pauseBackground.url)
    game.load.image(assets.pauseText.name, assets.pauseText.url)
    game.load.image(assets.playButton.name, assets.playButton.url)
    game.load.image(assets.quitButton.name, assets.quitButton.url)

    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

  },
  create: function() {
    this.state.start(gameStates.entry);
  }
};
