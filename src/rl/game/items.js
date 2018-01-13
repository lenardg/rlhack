///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// items.js
//
// Item handling
//
///////////////////////////////////////////////////////////////

import { ITEMS } from "./maps";

export class Item {
    constructor(type) {
        this.type = type;
        this.attack = 0; // used for weapons
        this.defense = 0; // used for armor
    }
}

export function GenerateRandomItem ( itemtype ) {

}