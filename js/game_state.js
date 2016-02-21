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
  this.firstAidBoxes;
  this.door;
  this.soundEffects;
  this.music;
  this.frame = 0;
  this.score = 0;
  this.starsCount = 0;
}

KodingGame.gameState.prototype = {
  init: function() {

  },
  preload: function(){
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
    this.showHelpText();
  },

  create: function(){
    game.physics.startSystem(Phaser.Physics.P2JS);

    this.background = game.add.sprite(0, 0, assets.gameBackground.name);
    this.background.scale.set(2, 2);
    this.cursors = game.input.keyboard.createCursorKeys();

    this.map = game.add.tilemap('level1');
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    this.map.addTilesetImage('tiles', assets.tiles.name, 5, 0);

    //create layer
    this.backgroundlayer = this.map.createLayer('backgroundLayer');
    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer
    this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions
    this.backgroundlayer.resizeWorld();
    this.createDoor();
    this.initPlayer();
    this.createQuestions();
    this.createStars();
    this.createFirstAidBoxes();
    this.initAudio();
    this.pauseButton = game.add.button(gameProperties.screenWidth - 100, gameProperties.screenHeight - 100, assets.pauseButton.name,  this.pauseClickAction, this)
    this.pauseButton.scale.set(0.2, 0.2);
    this.pauseButton.anchor.setTo(1, 1)
  },

  update: function(){
    game.physics.arcade.collide(this.player, this.blockedLayer);
    game.physics.arcade.collide(this.player, this.questions, this.askQuestion, null, this);
    game.physics.arcade.overlap(this.player, this.stars, this.collect, null, this);
    game.physics.arcade.overlap(this.player, this.firstAidBoxes, this.collect, null, this);
    game.physics.arcade.overlap(this.player, this.door, this.finishGame, null, this);
    game.input.onDown.add(this.unpause, self);
    this.setPlayerMotion();
  },

  render: function() {

  },

  pauseClickAction: function() {
    game.paused = true;
    choiseLabel = game.add.text(game.world.centerX, game.world.centerY, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
    choiseLabel.anchor.setTo(0.5, 0.5);
    // game.state.start(gameStates.paused)
  },

  initPlayer: function() {
    this.player = game.add.sprite(5, game.world.height - 70, assets.player.name, 24)
    game.physics.enable(this.player);
    this.player.scale.set(0.9, 0.9);
    this.player.collideWorldBounds = true;
    this.player.animations.add('down', [1, 2, 3, 4, 5, 6], 5, true )
    this.player.animations.add('up', [13, 14, 15, 16, 17, 18], 5, true )
    this.player.animations.add('left', [26, 27, 28, 29, 30], 5, true )
    this.player.animations.add('right', [37, 38, 39, 40, 41, 42], 5, true )
    game.camera.follow(this.player,  Phaser.Camera.FOLLOW_LOCKON);
  },

  initAudio: function() {
    this.soundEffects = game.add.audio(assets.soundEffects.name);
    this.soundEffects.allowMultiple = false;

    this.soundEffects.addMarker('charm', 0, 2.7);
    this.soundEffects.addMarker('curse', 4, 2.9);
    this.soundEffects.addMarker('fireball', 8, 5.2);
    this.soundEffects.addMarker('spell', 14, 4.7);
    this.soundEffects.addMarker('soundscape', 20, 18.8);
    this.music = game.add.audio(assets.music.name);
    this.music.play();
  },

  createQuestions: function() {
    //create items
    this.questions = game.add.group();
    this.questions.enableBody = true;
    var question;
    result = this.findObjectsByType('question_mark', this.map, 'objectsLayer');
    result.forEach(function(element){
      question = this.createFromTiledObject(element, this.questions);
      question.body.immovable = true;
      question.animations.add('walk', [0,1,2,3], 1, true);
      setTimeout(this.startWalking, parseInt(1000 + Math.random() * 5000), question)
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

  createFirstAidBoxes: function() {
    //create items
    this.firstAidBoxes = game.add.group();
    this.firstAidBoxes.enableBody = true;
    var box;
    result = this.findObjectsByType('first_aid_box', this.map, 'objectsLayer');
    result.forEach(function(element){
      box = this.createFromTiledObject(element, this.firstAidBoxes);
      box.scale.set(0.8, 0.8);
    }, this);
  },

  createDoor: function() {
    var doors = game.add.group();
    doors.enableBody = true;
    result = this.findObjectsByType('door', this.map, 'objectsLayer');
    result.forEach(function(element){
      this.door = this.createFromTiledObject(element, doors);
    }, this);
    this.door.frame = 7;
    this.door.animations.add('open', [5, 6, 7], 1);
  },

  finishGame: function(player, door) {
    this.music.stop();
    game.state.start(gameStates.end);
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
 },

 setPlayerRightMotion: function() {
   this.player.body.velocity.x = 70;
   this.frame = 36
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
   debugger;
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
    return sprite;
  },

  startWalking: function(sprite) {
    sprite.animations.play('walk');
  },

  collect: function(player, star){
    this.score += 10;
    this.starsCount++;
    document.getElementById("score").innerHTML = this.score
    document.getElementById("starsCount").innerHTML = this.starsCount
    star.kill();
    this.soundEffects.play('spell');
  },

  askQuestion: function(player, question) {
    question.animations.stop();
    question.kill();
    this.soundEffects.play('fireball');

  },

  showHelpText: function() {
    document.getElementById("gameInfo").innerHTML = "Welcome, we'd have to think of a help to show the user as this point, but displaying it might be a problem? <br /> <p>But you can display them over the top using positioning and z-index and control them just as you would any web page.</p>";

    el = document.getElementsByClassName("game-board")[0];
    el.className = el.className.replace("hide", "")
  },

  unpause: function(){
    if (game.paused) {
      game.paused = false;
    }
  }

}
