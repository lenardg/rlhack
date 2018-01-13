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
    new Monster("kobold", "k", "#207020", 0, 5, 10, 4, 0, 1, 2),
    new Monster("goblin", "g", "#707020", 0, 5, 10, 8, 0, 1, 2),
    new Monster("orc", "o", "#207020", 2, 5, 15, 15, 0, 1, 2),
    new Monster("Haskell", "H", "#ed9797", 2, 6, 35, 10, 0, 1, 2)
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
