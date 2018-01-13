///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// status.js
//
// Show or update player status
//
///////////////////////////////////////////////////////////////

import { Player } from "./player";

export const STATS = {
    Level: 0,
    HP: 1,
    Power: 2,
    Gold: 3,
    Attributes: 4
}

function clearStatRow(stats, row) {
    for (var x = 0; x < stats.width; ++x ) {
        stats.display.draw(x + stats.statx,row + stats.staty,' ');
    }
}

function drawBar(stats, y, filled, empty, percent) {
    const filledSpaces = Math.round((stats.width - 1) * percent);
    const emptySpaces = stats.width - 1 - filledSpaces;

    for(var x = 0; x < filledSpaces; ++x ) {
        stats.display.draw(x+stats.statx, y+stats.staty, ' ', filled, filled);
    }
    for(var x = 0; x < emptySpaces; ++x ) {
        stats.display.draw(x+stats.statx+filledSpaces, y+stats.staty, ' ', empty, empty);
    }
}

export class StatusPanel {
    constructor(player, display, statx, staty, width, height) {
        this.player = player;
        this.display = display;

        this.statx = statx;
        this.staty = staty;
        this.width = width;
        this.height = height;
    }

    update(stat) {
        if (stat == STATS.Level) {
            clearStatRow(this,0);
            this.display.drawText(0,this.staty, `%c{#888888}Experience level %c{#FFFFFF}${this.player.level}`);
            clearStatRow(this,1);
            this.display.drawText(0,this.staty + 1, `%c{#888888}XP %c{#FFFFFF}${this.player.xp}`);
            clearStatRow(this,2);
            this.display.drawText(0,this.staty + 2, `%c{#888888}XP next lvl: %c{#FFFFFF}${this.player.xp_next}`);
        }
        if (stat == STATS.Gold) {
            clearStatRow(this,4);
            this.display.drawText(0,this.staty + 4, `%c{#888888}Gold %c{#FFFF00}${this.player.gold}`);
        }
        if (stat == STATS.HP) {
            clearStatRow(this,6);
            clearStatRow(this,7);
            this.display.drawText(0,this.staty + 6, `%c{#888888}HP %c{#FFA0A0}${this.player.hp} / ${this.player.max_hp}`);
            drawBar(this, 7, "#FF0000", "#400000", this.player.hp / this.player.max_hp);
        }
        if (stat == STATS.Power) {
            clearStatRow(this,9);
            clearStatRow(this,10);
            this.display.drawText(0,this.staty + 9, `%c{#888888}Power %c{#A0A0FF}${this.player.power} / ${this.player.max_power}`);
            drawBar(this, 10, "#0000FF", "#000040", this.player.max_power == 0 ? 0 : this.player.power / this.player.max_power);
        }
        if (stat == STATS.Attributes) {
            let row = 12;
            
            clearStatRow(this,row);
            this.display.drawText(0,this.staty + row, `%c{#888888}STR %c{#FFFFFF}${this.player.strength}`);
            row++;

            clearStatRow(this,row);
            this.display.drawText(0,this.staty + row, `%c{#888888}DEX %c{#FFFFFF}${this.player.dexterity}`);
            row++;

            clearStatRow(this,row);
            this.display.drawText(0,this.staty + row, `%c{#888888}INT %c{#FFFFFF}${this.player.intelligence}`);
            row++;

            clearStatRow(this,row);
            this.display.drawText(0,this.staty + row, `%c{#888888}CON %c{#FFFFFF}${this.player.constitution}`);
            row++;
        }        
    }

    updateAll() {
        this.update(STATS.Level);
        this.update(STATS.HP);
        this.update(STATS.Power);
        this.update(STATS.Gold);
        this.update(STATS.Attributes);
    }
}