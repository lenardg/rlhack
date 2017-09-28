
function Player() {
    this.symbol = '@';
    this.color = '#FFFFFF';
    this.level = 1;
    this.hp = 10;

    this.location.y = 14;
    this.location.x = 43;
}

Player.prototype = new Monster();

var me = new Player();