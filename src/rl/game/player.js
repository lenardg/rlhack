
function Player() {
    this.symbol = '@';
    this.color = '#FFFFFF';
    this.level = 1;

    this.hp = 10;

    this.fullness = 100; // how full are we, when we need to eat again?

    this.location.y = 14;
    this.location.x = 43;
}

Player.prototype = new Monster();

var me = new Player();