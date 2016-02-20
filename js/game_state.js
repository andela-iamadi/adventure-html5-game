KodingGame.gameState = function(game){
  this.background;
  this.player;
  this.cursors;
  this.pauseButton;
  this.map;
  this.backgroundlayer;
  this.blockedLayer;
  this.items;
  this.questions;
  this.stars;
  this.frame = 0;
  this.score = 0;
  this.starsCount = 0;
}

KodingGame.gameState.prototype = {
  preload: function(){
    game.load.tilemap(assets.gameLevelOne.name, assets.gameLevelOne.url, null, Phaser.Tilemap.TILED_JSON);
    game.load.image(assets.gameBackground.name, assets.gameBackground.url);
    game.load.image(assets.pauseButton.name, assets.pauseButton.url);
    game.load.image(assets.tiles.name, assets.tiles.url);
    game.load.image(assets.star.name, assets.star.url);
    game.load.image(assets.questionMark.name, assets.questionMark.url)
    game.load.spritesheet(assets.player.name, assets.player.url, 31, 60);
    this.showHelpText();
  },

  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.background = game.add.sprite(0, 0, assets.gameBackground.name);
    this.background.scale.set(2, 2);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.pauseButton = game.add.button(game.world.width - 60, 5, assets.pauseButton.name,  this.pauseClickAction, this)
    this.pauseButton.scale.set(0.4, 0.4);

    this.map = game.add.tilemap('level1');
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', assets.tiles.name);

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    this.initPlayer();
    this.createQuestions();
    this.createStars();
  },

  update: function(){
    game.physics.arcade.collide(this.player, this.blockedLayer);
    game.physics.arcade.collide(this.player, this.questions, this.askQuestion);
    game.physics.arcade.overlap(this.player, this.stars, this.collect, null, this);
    this.setPlayerMotion();
  },

  render: function() {
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.spriteCoords(this.player, 32, 500);

  },

  pauseClickAction: function() {
    game.state.start(gameStates.paused)
  },

  initPlayer: function() {
    this.player = game.add.sprite(5, game.world.height - 100, assets.player.name, 36)
    game.physics.arcade.enable(this.player);
    this.player.scale.set(0.9, 0.9);
    this.player.collideWorldBounds = true;
    this.player.animations.add('down', [1, 2, 3, 4, 5, 6], 5, true )
    this.player.animations.add('up', [13, 14, 15, 16, 17, 18], 5, true )
    this.player.animations.add('left', [26, 27, 28, 29, 30], 5, true )
    this.player.animations.add('right', [37, 38, 39, 40, 41, 42], 5, true )
    game.camera.follow(this.player,  Phaser.Camera.FOLLOW_LOCKON);
  },

  createQuestions: function() {
    //create items
    this.questions = game.add.group();
    this.questions.enableBody = true;
    var question;
    result = this.findObjectsByType('question_mark', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.questions);
    }, this);
  },

  createStars: function() {
    //create items
    this.stars = game.add.group();
    this.stars.enableBody = true;
    result = this.findObjectsByType('star', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.createFromTiledObject(element, this.stars);
    }, this);
  },

  setPlayerMotion: function() {
   this.player.body.velocity.x = 0;
   this.player.body.velocity.y = 0;
   if (this.cursors.left.isDown) {
     this.setPlayerLeftMotion();
   } else if (this.cursors.right.isDown) {
     this.setPlayerRightMotion();
   } else if (this.cursors.up.isDown) {
     this.setPlayerUpMotion();
   } else if (this.cursors.down.isDown) {
     this.setPlayerDownMotion();
   } else {
     this.player.animations.stop();
     this.player.frame = this.frame;
   }
 },

 setPlayerLeftMotion: function() {
   this.player.body.velocity.x = -70;
   this.frame = 24
   this.player.animations.play('left')
  //  this.player.frame = this.frame;
   if (this.player.body.touching.down) {
   } else {
   }
 },

 setPlayerRightMotion: function() {
   this.player.body.velocity.x = 70;
   this.frame = 42
   this.player.animations.play('right')
   if (this.player.body.touching.down) {
   } else {
    //  this.player.frame = this.frame;
   }
 },

 setPlayerUpMotion: function() {
   this.player.body.velocity.y = -70;
   this.frame = 13;
   this.player.animations.play('up')
 },

 setPlayerDownMotion: function() {
   this.player.body.velocity.y = 70;
   this.frame = 0
   this.player.animations.play('down')

 },

 findObjectsByType: function(spriteType, map, layer) {
   var result = new Array();
   map.objects[layer].forEach(function(element){
     if(element.properties.sprite === spriteType) {
       element.y -= map.tileHeight;
       result.push(element);
     }
   });
   return result;
 },

 createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
    //copy all properties to the sprite
    Object.keys(element.properties).forEach(function(key){
      sprite[key] = element.properties[key];
    });
    if (element.properties.sprite == "question_mark") {
      sprite.body.immovable = true;
    }
  },

  collect: function(player, star){
    this.score += 10;
    this.starsCount++;
    document.getElementById("score").innerHTML = this.score
    document.getElementById("starsCount").innerHTML = this.starsCount
    star.kill();
  },

  askQuestion: function(player, question) {
    question.kill();
  },

  showHelpText: function() {
    document.getElementById("gameInfo").innerHTML = "Welcome, we'd have to think of a help to show the user as this point, but displaying it might be a problem? <br /> <p>But you can display them over the top using positioning and z-index and control them just as you would any web page.</p>";

    el = document.getElementsByClassName("game-board")[0];
    el.className = el.className.replace("hide", "")
  }

}
