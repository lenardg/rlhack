///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// player.js
//
// Player related things
//
///////////////////////////////////////////////////////////////

import { Monster } from "./monsters";
import { ITEMS } from "./maps";

export class Player extends Monster {
    constructor() {
        super("ME", "@", "#FFFFFF", 1, 999, 10, 0, 0, 0, 0 );
        this.isPlayer = true;

        this.level = 1;
        this.xp = 0;
        this.xp_next = 10;

        this.strength = 20;
        this.dexterity = 20;
        this.intelligence = 20;
        this.constitution =20;

        this.hp = 10;
        this.max_hp = 10;
        this.power = 0;
        this.max_power = 0;

        this.gold = 0; // how many gold we have?
    
        this.fullness = 100; // how full are we, when we need to eat again?
    
        this.location.y = 14;
        this.location.x = 43;

        this.updated = undefined;

        this.inventory = [];
    }

    takeGold(gold) {
        this.gold += gold;
        this.queueUpdate();
    }

    takeItem(item) {
        this.inventory.push(item);
    }

    takeDamage(hp) {
        let r = super.takeDamage(hp);
        this.queueUpdate();

        return r;
    }

    addItemToInventory(item) {
        if (item.type === ITEMS.Gold) {
            this.takeGold(item.amount);
        } else {
            this.takeItem(item);
        }
    }

    queueUpdate() {
        if ( !!this.updated ) { 
            this.updated();
        }
    }

    onUpdated(callback) {
        this.updated = callback;
    }
}
