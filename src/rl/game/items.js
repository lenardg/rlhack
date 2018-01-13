///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// items.js
//
// Item handling
//
///////////////////////////////////////////////////////////////

import { ITEMS } from "./maps";
import { choice } from "./util";

export class Item {
    constructor(type, name) {
        this.type = type;
        this.name = name;
        this.attack = 0; // used for weapons
        this.defense = 0; // used for armor
        this.amount = 0; // if the item is countable
    }
}

export function GenerateRandomItem ( itemtype, dungeonlevel ) {
    if ( typeof dungeonlevel === "undefined" ) {
        dungeonlevel = 1;
    }

    if ( itemtype == ITEMS.Gold ) {
        let item = new Item(ITEMS.Gold);
        item.amount = Math.round(dungeonlevel * 5 * ROT.RNG.getUniform() + 1);
        return item;
    } else if ( itemtype == ITEMS.Weapon) {
        const variants = [
            {name: "Long sword", minatt: 10, maxatt: 10},
            {name: "Short sword", minatt: 6, maxatt: 6 }];

        let variant = choice(variants);
        let item = new Item(ITEMS.Weapon, variant.name);
        item.defense = variant.mindef;
        return item;
    } else if ( itemtype == ITEMS.HardArmor) {
        const variants = [
            {name: "Ringmail", mindef: 10, maxdef: 10}];

        let variant = choice(variants);
        let item = new Item(ITEMS.HardArmor, variant.name);
        item.defense = variant.mindef;
        return item;
    } else if ( itemtype == ITEMS.SoftArmor ) {
        const variants = [
            {name: "Leather armor", mindef: 5, maxdef: 5}];

        let variant = choice(variants);
        let item = new Item(ITEMS.SoftArmor, variant.name);
        item.defense = variant.mindef;
        return item;
    } else if ( itemtype == ITEMS.Shield) {
        const variants = [
            {name: "Small shield", mindef: 2, maxdef: 2},
            {name: "Large shield", mindef: 4, maxdef: 4 }];

        let variant = choice(variants);
        let item = new Item(ITEMS.Shield, variant.name);
        item.defense = variant.mindef;
        return item;
    }
}