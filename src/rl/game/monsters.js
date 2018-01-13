///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// monster.js
//
// Defines the monster class to show monsters
//
///////////////////////////////////////////////////////////////

import { choice } from "./util";

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
    new Monster("kobold", "k", "#207020", 0, 5, 10),
    new Monster("goblin", "g", "#707020", 0, 5, 10),
    new Monster("orc", "o", "#207020", 2, 5, 15),
    new Monster("Haskell", "H", "#ed9797", 2, 6, 35)
];

export function GenerateRandomMonster(dungeonlevel) {
    let possibleMonsters = [];
    for( let midx in monsters) {
        let m = monsters[midx];
        if ( m.minlevel <= dungeonlevel && dungeonlevel <= m.maxlevel) {
            possibleMonsters.push(m);
        }
    }    

    let mob = choice(possibleMonsters);

    return new Monster(mob.name, mob.symbol, mob.color, mob.minlevel, mob.maxlevel, mob.hp, mob.strength, mob.armor);
}
