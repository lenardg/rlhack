///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// monster.js
//
// Defines the monster class to show monsters
//
///////////////////////////////////////////////////////////////

export class Monster {
    constructor(name, symbol, color, minlevel, maxlevel, hp, strength, armor) {
        this.name = name;
        this.isPlayer = false;
        
        this.symbol = symbol;
        this.color = color;
        this.minlevel = minlevel;
        this.maxlevel = maxlevel;
        
        this.hp = hp;
        this.armor = armor;

        this.strength = strength;
        
        this.location = { x: 1, y: 1 };
    }

    move(dx,dy) {
        this.location.x += dx;
        this.location.y += dy;
    }

    moveTo(x,y) {
        this.location.x = x;
        this.location.y = y;
    }
}

export const monsters = [
    new Monster("kobold", "k", "#207020", 1, 5, 10),
    new Monster("goblin", "g", "#707020", 1, 5, 10),
    new Monster("orc", "o", "#207020", 2, 5, 15),
    new Monster("Haskell", "H", "#ed9797", 2, 6, 35)
];
