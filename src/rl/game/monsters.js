
function Monster(name, symbol, color, minlevel, maxlevel, hp) {
    this.name = name;
    this.symbol = symbol;
    this.color = color;
    this.minlevel = minlevel;
    this.maxlevel = maxlevel;
    this.hp = hp;

    this.location = { x: 39, y: 12 };
}

var monsters = [
    new Monster("kobold", "k", "#207020", 1, 5, 10),
    new Monster("Haskell perhonen", "H", "#ed9797", 2, 6, 35)
];