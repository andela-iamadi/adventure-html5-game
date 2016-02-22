KodingGame.gameState = function(game){
  this.background;
  this.player;
  this.cursors;
  this.pauseButton;
  this.map;
  this.backgroundlayer;
  this.blockedLayer;
  this.items;
  this.bugs;
  this.stars;
  this.firstAidBoxes;
  this.door;
  this.soundEffects;
  this.music;
  this.frame = 0;
  this.score = 0;
  this.starsCount = 0;
  this.correctAnswer = "";
  this.options = [];
  this.displayedQuestion = {};
  this.currentBug = {};
  this.dataMap = Object.keys(data);
  this.askedQuestions = [];
  this.currQuestionIndex;
}
var pauseText = {}

KodingGame.gameState.prototype = {
  init: function() {

  },
  preload: function(){

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
    this.createBugs();
    this.createStars();
    this.createFirstAidBoxes();
    this.initAudio();
    this.pauseButton = game.add.button(game.width - 50, 5, assets.pauseButton.name,  this.pauseClickAction, this)
    this.pauseButton.scale.set(0.3, 0.3);
    this.pauseButton.fixedToCamera = true;
    this.initVars();
  },

  update: function(){
    game.physics.arcade.collide(this.player, this.blockedLayer);
    game.physics.arcade.collide(this.player, this.bugs, this.askQuestion, null, this);
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
    pauseText = this.annoucementText("Game paused. Click Anywhere to continue", "#fff")
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

  createBugs: function() {
    //create items
    this.bugs = game.add.group();
    this.bugs.enableBody = true;
    var bug;
    result = this.findObjectsByType('question_mark', this.map, 'objectsLayer');
    result.forEach(function(element){
      bug = this.createFromTiledObject(element, this.bugs);
      bug.body.immovable = true;
      bug.animations.add('walk', [0,1,2,3], 1, true);
      setTimeout(this.startWalking, parseInt(1000 + Math.random() * 5000), bug)
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
    return sprite;
  },

  startWalking: function(sprite) {
    sprite.animations.play('walk');
  },

  collect: function(player, star){
    var bonusText = this.annoucementText("Bonus points: +5!!", "#F5F10D")
    this.starsCount++;
    this.score += 5
    this.updateGameStat();
    setTimeout(this.killObject, 2000, bonusText);
    star.kill();
    this.soundEffects.play('spell');
  },

  updateGameStat: function() {
    document.getElementById("score").innerHTML = this.score
    document.getElementById("starsCount").innerHTML = this.starsCount
  },

  askQuestion: function(player, bug) {
    if (!this.displayedQuestion.alive) {
      var questionToAsk = this.getQuestion();
      this.displayedQuestion = game.add.text(bug.position.x + bug.body.width, bug.position.y,  questionToAsk, { font: '10px sans-serif', fill: '#444', backgroundColor: '#eee', boundsAlignH: 'left', width: '200', wordWrap: 'true', wordWrapWidth: '195' });
      this.displayedQuestion.position.y -= this.displayedQuestion.height;
      this.displayedQuestion.padding.set(10, 16)
      this.appendOptions(this);
      this.soundEffects.play('fireball');
      this.currentBug = bug;
      this.hideAnswerSummary();
    }
  },

  getQuestion: function() {
    var index = this.nextQuestionIndex();
    var content = data[index].content
    content += "\n";
    data[index].symptoms.forEach(function(symptom) {
      content += symptom + ", "
    })
    content += "\n" + data[index].question
    this.storeIndex(index);
    return content;
  },

  storeIndex: function(index) {
    this.currQuestionIndex = index;
    this.askedQuestions.push(index);
  },

  appendOptions: function() {
    var currX = this.displayedQuestion.position.x
    var currY = this.displayedQuestion.position.y + this.displayedQuestion.height
    var index = this.currQuestionIndex;
    var option, text;
     for (var key in data[index].options) {
      text = data[index].options[key];
      option = game.add.text(currX, currY,  `\n ${key}) ` + text, { font: '10px sans-serif', fill: '#00ff00', backgroundColor: 'rgba(0,0,0,0.8)', width: '200', boundsAlignH: 'left', wordWrap: 'true', wordWrapWidth: '200', boundsAlignV: 'middle' });
      option.inputEnabled = true;
      option.name = text;
      option.events.onInputOver.add(this.mouseOver, this);
      option.events.onInputOut.add(this.mouseOut, this);
      option.events.onInputDown.add(this.clickAnswer, this);

      option.padding.set(10, 0)
      this.options.push(option)
      currY += option.height;
    }
    this.correctAnswer = data[index].answer;

  },

  showAnswerSummary: function(disease, summary, rightAnswer) {
    var title = rightAnswer ? `<h3>Corect Answer: ${disease}</h3>` : `<h3>The answer was: ${disease}</h3>`
    if (summary) {
      this.appendToDiv(`${title}<p>${summary || "Loading summary..."}</p>`)
    } else {
      var that = this;
      wikipedia(disease, function(status, data){
        that.appendToDiv(`${title}<p>${data || "Loading summary..."}</p>`)
      });
    }
  },

  appendToDiv: function(text) {
    document.getElementById("gameInfo").innerHTML = text
    el = document.getElementsByClassName("game-board")[0];
    el.className = el.className.replace("hide", "")
  },

  hideAnswerSummary: function() {
    el = document.getElementsByClassName("game-board")[0];
    el.className = el.className.replace("hide", "")
    el.className += " hide"
  },

  unpause: function(){
    if (game.paused) {
      game.paused = false;
      if (pauseText.alive) { pauseText.kill(); }
    }
  },

  mouseOut: function(text){
    text.fill = '#00ff00';
  },

  mouseOver: function(text) {
    text.fill = '#ff00ff';
  },

  clickAnswer: function(text) {
    var index = this.currQuestionIndex;
    var responseText, color;
    var correct = text.name === this.correctAnswer;
    if (correct) {
      responseText = "Correct!! +10 Points", color = '#00ff00';
      this.score += 10
      this.updateGameStat();
    } else {
      responseText = "Wrong Answer! Try again", color = '#ff0000';
      game.state.start(gameStates.over)
    }
    this.showAnswerSummary(this.correctAnswer, data[index].answer_summary, correct);
    userCorrect = this.annoucementText(responseText, color)
    setTimeout(this.killObject, 2000, userCorrect);

    this.displayedQuestion.kill();
    this.currentBug.kill();
    this.options.forEach(function(option){
      option.kill();
    })
    this.correctAnswer = "";
    this.displayedQuestion = {}
  },

  killObject: function(object) {
    object.kill();
  },

  nextQuestionIndex: function(){
    var limit = this.dataMap.length;
    var index = parseInt(Math.random() * limit);
    while (this.askedQuestions.indexOf(index) != -1) {
      index = parseInt(Math.random() * limit);
    }
    return index;
  },

  initVars: function() {
    this.frame = 0;
    this.score = 0;
    this.starsCount = 0;
    this.correctAnswer = "";
    this.options = [];
    this.displayedQuestion = {};
    this.currentBug = {};
    this.askedQuestions = [];
  },

  annoucementText: function(responseText, color) {
    var text = game.add.text((game.width /2) - 100, game.height / 2, responseText, { font: '30px sans-serif', fill: color, backgroundColor: 'rgba(0,0,0,0.8)', width: '200', align: 'center', wordWrap: 'true', wordWrapWidth: '200', boundsAlignV: 'middle' });
    text.align = 'center';
    text.padding.set(16, 10, 75)
    text.stroke = '#000000';
    text.strokeThickness = 2;
    text.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    return text;
  }

}
