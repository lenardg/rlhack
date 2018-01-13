///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// game.js
//
// Main game file
//
///////////////////////////////////////////////////////////////

import { keyboard } from "./keyboard";
import { extend } from "./util";
import { Player } from "./player";
import { Messages } from "./messages";
import { Inventory } from "./inventory";
import { Map, TILES, TutorialMap } from "./maps";

export const game = (function(root) {

    var opts = {
        screenWidth: 100,
        screenHeight: 33,
        mapWidth: 80,
        mapHeight: 30,
        statusWidth: 20,
        statusHeight: 33,
        messagesHeight: 3,
        messagesLeft: 20
    };

    var gamestate = {
        me: new Player(),
        currentMap: {left: 0, top: 0},
        level: 0,
    };

    function getWindowSize() {
        return [root.innerWidth, root.innerHeight];
    }

    function onResize() {
        var size = getWindowSize();
        this.display.setOptions({fontSize: this.display.computeFontSize(size[0], size[1])});        
    }

    function move(mob,dx,dy) {
        if ( gamestate.currentMap.isPassable( mob.location.x + dx, mob.location.y + dy)) {
            gamestate.currentMap.drawTile( mob.location.x, mob.location.y );
            mob.move(dx, dy);
            game.drawMonster(mob);
        }
    }

    function process_direction(dx,dy) {
        game.waitCallback(dx,dy);
        game.mode = 0;
    }

    function move_left() {
        if (game.mode == 1 ) { process_direction(-1, 0); return; } 
        move(gamestate.me,-1,0);
    }

    function move_right() {
        if (game.mode == 1 ) { process_direction(1, 0); return; } 
        move(gamestate.me,1,0);
    }

    function move_up() {
        if (game.mode == 1 ) { process_direction(0, -1); return; } 
        move(gamestate.me,0,-1);
    }

    function move_down() {
        if (game.mode == 1 ) { process_direction(0, 1); return; } 
        move(gamestate.me,0,1);
    }

    function cmd_open() {
        game.messages.addMessage("Which direction you want to open the door? -");
        game.waitDirection(function(dx, dy) {
            var x = gamestate.me.location.x + dx;
            var y = gamestate.me.location.y + dy;
            if ( gamestate.currentMap.getTile(x, y) == TILES.ClosedDoor ) {
                gamestate.currentMap.setTile(x, y, TILES.OpenedDoor);
                gamestate.currentMap.drawTile(x, y);
                game.messages.addMessage("Opened.");        
            } else {
                game.messages.addMessage("I see no door there to open");        
            }
        });
    }

    function cmd_close() {
        game.messages.addMessage("Which direction you want to close the door? -");
        game.waitDirection(function(dx, dy) {
            var x = gamestate.me.location.x + dx;
            var y = gamestate.me.location.y + dy;
            if ( gamestate.currentMap.getTile(x, y) == TILES.OpenedDoor ) {
                gamestate.currentMap.setTile(x, y, TILES.ClosedDoor);
                gamestate.currentMap.drawTile(x, y);
                game.messages.addMessage("Closed.");        
            } else {
                game.messages.addMessage("I see no door there to close");                        
            }
        });        
    }

    function cmd_toggleInventory() {
        if (!gamestate.inventory.visible) {
            gamestate.inventory.show();
        } else {
            gamestate.inventory.hide();
        }
    }

    function splash() {
        game.display.clear();        
        game.display.drawText(0,0, "we are loading, please stand by ....");
        game.display.drawText(20,10, "%c{#444444}#%c{#5B0180}          _  _                   _    ");
        game.display.drawText(20,11, "%c{#444444}#%c{#5B0180}         | || |                 | |   ");
        game.display.drawText(20,12, "%c{#5B4100}+%c{#5B0180}    _ __ | || |__    __ _   ___ | | __");
        game.display.drawText(20,13, "%c{#444444}#%c{#5B0180}   | '__|| || '_ \\  / _` | / __|| |/ /");
        game.display.drawText(20,14, "%c{#444444}#%c{#5B0180}   | |   | || | | || (_| || (__ |   < ");
        game.display.drawText(20,15, "%c{#444444}#%c{#5B0180}   |_|   |_||_| |_| \\__,_| \\___||_|\\_\\");
    
        game.drawMonster(gamestate.me);
    }

    var game = {
        display: null,
        waitCallback: null,
        messages: null,
        mode: 0, // 0: normal game input, 1: direction input
    
        init: function() {
            function keybinding(key,fn) {
                keyboard.map(key,fn.bind(this));
            }

            function keyconfig() {
                // arrow keys
                keybinding(ROT.VK_LEFT, move_left);
                keybinding(ROT.VK_RIGHT, move_right);
                keybinding(ROT.VK_UP, move_up);
                keybinding(ROT.VK_DOWN, move_down);    

                // WASD
                keybinding(ROT.VK_A, move_left);
                keybinding(ROT.VK_D, move_right);
                keybinding(ROT.VK_W, move_up);
                keybinding(ROT.VK_S, move_down);    

                // commands
                keybinding(ROT.VK_O, cmd_open);
                keybinding(ROT.VK_C, cmd_close);
                keybinding(ROT.VK_I, cmd_toggleInventory);
            }

            // pass in options to the constructor to change the default 80x25 size
            this.display = new ROT.Display({
                width: opts.screenWidth,
                height: opts.screenHeight,
            }); 

            this.messages = new Messages(this, 0, opts.messagesLeft, opts.mapWidth, opts.messagesHeight);

            // calculate the maximum font size to achieve the desired size (80x25 characters)
            var size = getWindowSize();
            this.display.setOptions({fontSize: this.display.computeFontSize(size[0] - 10, size[1] - 10)});
            root.addEventListener("resize", onResize.bind(this) )

            // create rot container
            document.body.appendChild(this.display.getContainer());

            // setup keyboard
            keyconfig();
            keyboard.init();

            // show the splashscreen
            splash()

            // initial inventory
            gamestate.inventory = new Inventory(this.display);

            root.setTimeout(function() {
                game.initLevel(gamestate.level);
                game.drawMonster(gamestate.me);
            }, 1000);
        },


        // this functions generates a new game level (assuming levels starts from 1 upward)
        // you can provide custom logic, static levels, use another ROT provided generator or create your own generation algorithm
        initLevel: function(level) {
            if (level === 0) {
                gamestate.currentMap = new TutorialMap(
                    opts.mapWidth,
                    opts.mapHeight);
                gamestate.currentMap.setup(opts.statusWidth, opts.messagesHeight, this.display);
                gamestate.currentMap.drawMap();
            } else {
                var generator = new ROT.Map.Digger(opts.mapWidth, opts.mapHeight, {
                    dugPercentage: 0.4
                });
                gamestate.currentMap = new Map(
                    opts.mapWidth,
                    opts.mapHeight,
                    generator);
                
                gamestate.currentMap.setup(opts.statusWidth, opts.messagesHeight, this.display);
                gamestate.currentMap.show();
            }

            gamestate.me.moveTo(gamestate.currentMap.startx, gamestate.currentMap.starty);

            game.display.drawText(0,0, `%c{#FFFFFF}Dungeon, level ${level}`);
            game.display.drawText(0,2, "%c{#888888}Players stats here");
            game.display.drawText(0,opts.statusHeight - 3, "%c{#5B0080}DevisioonΔ");
            game.display.drawText(0,opts.statusHeight - 2, "%c{#5B0080}roguelike hackathon");
            game.display.drawText(0,opts.statusHeight - 1, "%c{#5B0080}2018");

            this.messages.addMessage("You are entering a dangerous dungeon.");
            this.messages.addMessage("BTW this is the messages area :)");
            this.messages.addMessage("Use arrow keys to move, o to open doors (followed by direction)");
        },

        drawMonster: function(monster) {
            this.display.draw(monster.location.x + gamestate.currentMap.left, monster.location.y + gamestate.currentMap.top, monster.symbol, monster.color);
        },

        waitDirection: function(callback) {
            this.waitCallback = callback;
            this.mode = 1;
        }
    }

    return game;
})(window);
