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
    constructor(name, symbol, color, minlevel, maxlevel, hp, strength, armor, dmgmin, dmgmax) {
        this.name = name;
        this.isPlayer = false;
        
        this.symbol = symbol;
        this.color = color;
        this.minlevel = minlevel;
        this.maxlevel = maxlevel;
        this.dmgmin = dmgmin;
        this.dmgmax = dmgmax;
        
        this.hp = hp;
        this.armor = armor;

        this.strength = strength;
        this.dexterity = strength;
        
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

    attack(othermob) {
        let hitpercent = 50 + (this.getStrength() - othermob.getDexterity()) * 0.5 - othermob.getArmor() * 0.5;
        hitpercent /= 100;

        if ( ROT.RNG.getUniform() < hitpercent ) {
            return this.getDamage();
        } else {
            return false;
        }
    }

    takeDamage(hp) {
        this.hp -= hp;
        if ( this.hp < 1 ) {
            this.hp = 0;
            return false;
        } else {
            return true;
        }
    }

    getArmor() {
        return this.armor;
    }

    getStrength() {
        return this.strength;
    }

    getDexterity() {
        return this.dexterity;
    }

    getDamage() {
        return this.dmgmin + Math.floor((this.dmgmax - this.dmgmin + 1)*ROT.RNG.getUniform());
    }
}

export const monsters = [
    new Monster("bat", "b", "#804000", 1, 3, 3, 4, 0, 1, 2),
    new Monster("wolf", "w", "#707070", 1, 4, 6, 4, 0, 1, 2),
    new Monster("kobold", "k", "#207020", 1, 5, 10, 4, 0, 2, 3),
    new Monster("rat", "r", "#905050", 1, 5, 5, 7, 0, 1, 2),
    new Monster("goblin", "g", "#707020", 2, 5, 10, 8, 0, 2, 4),
    new Monster("orc", "o", "#207020", 2, 6, 15, 15, 0, 2, 4),
    new Monster("troll", "T", "#205090", 3, 8, 25, 20, 3, 4, 10),
    new Monster("Haskell", "H", "#ed9797", 3, 10, 35, 10, 0, 5, 10)
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

    return new Monster(mob.name, mob.symbol, mob.color, mob.minlevel, mob.maxlevel, mob.hp, mob.strength, mob.armor, mob.dmgmin, mob.dmgmax);
}
