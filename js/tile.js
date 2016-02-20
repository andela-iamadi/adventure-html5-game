var Tile = function (column, row, group) {
    
    var states = {
        ZERO: 0,
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
        SIX: 6,
        SEVEN: 7,
        EIGHT: 8,
        DEFAULT: 9,
        FLAG: 10,
        WRONG_FLAG: 11,
        UNKNOWN: 12,
        MINE: 13,
    };

    var currentFrame = states.DEFAULT;
    var currentState = states.ZERO;
    
    var sprite = game.add.sprite(column * gameProperties.tileWidth, row * gameProperties.tileHeight, graphicAssets.tiles.name, currentFrame, group);
    
};