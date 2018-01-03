
function Monster(name, symbol, color, minlevel, maxlevel, hp, strength, armor) {
    this.name = name;
    this.symbol = symbol;
    this.color = color;
    this.minlevel = minlevel;
    this.maxlevel = maxlevel;
    
    this.hp = hp;
    this.strength = strength;
    this.armor = armor;

    this.location = { x: 39, y: 12 };
}

extend(Monster.prototype, {
    move: function(dx,dy) {
        this.location.x += dx;
        this.location.y += dy;
    }
});

var monsters = [
    new Monster("kobold", "k", "#207020", 1, 5, 10),
    new Monster("Haskell perhonen", "H", "#ed9797", 2, 6, 35)
];