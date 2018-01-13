///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// game.js
//
// Main game file
//
///////////////////////////////////////////////////////////////

import { keyboard } from "./keyboard";
import { extend, each, compareLocation } from "./util";
import { Player } from "./player";
import { Messages } from "./messages";
import { StatusPanel } from "./status";
import { Map, TILES, ITEMS } from "./maps";
import { MusicController } from "./music";
import { GenerateRandomItem } from "./items";
import { BackendClient } from "./backend";

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
        currentMapLevel: 0,
        levels: [],
        music: new MusicController(),
        backend: new BackendClient()
    };
    
    function getWindowSize() {
        return [root.innerWidth, root.innerHeight];
    }

    function onResize() {
        var size = getWindowSize();
        this.display.setOptions({fontSize: this.display.computeFontSize(size[0], size[1])});        
    }

    function move(mob,dx,dy,isPlayer) {
        if ( gamestate.currentMap.isPassable( mob.location.x + dx, mob.location.y + dy)) {
            gamestate.currentMap.drawTile( mob.location.x, mob.location.y, true );
            mob.move(dx, dy);
            game.drawMonster(mob);
            if ( !!mob.isPlayer) {
                if ( !!gamestate.currentMap.getLocation( mob.location.x, mob.location.y ).item) {
                    var item = gamestate.currentMap.pickUpItem( mob.location.x, mob.location.y );
                    var generatedItem = GenerateRandomItem( item, gamestate.currentMapLevel );
                    mob.addItemToInventory(generatedItem);
                    if (generatedItem.type === ITEMS.Gold) {
                        game.messages.addMessage("You picked up " + generatedItem.amount + " gold");
                    } else {
                        game.messages.addMessage("You picked up a " + generatedItem.name);
                    }
                }
            }
        } else if ( !!isPlayer && gamestate.currentMap.hasMonster (mob.location.x + dx, mob.location.y + dy)) {
            let monster = gamestate.currentMap.hasMonster (mob.location.x + dx, mob.location.y + dy);
            let dmg = gamestate.me.attack(monster);
            if ( dmg > 0 ) {
                game.messages.addMessage(`You hit the ${monster.name}!`);
                let res = monster.takeDamage(dmg);
                if ( !res ) {
                    game.messages.addMessage(`You have killed the ${monster.name}!`);
                    gamestate.me.takeExperience(gamestate.currentMapLevel);
                    gamestate.currentMap.killMonster(monster);
                }
            }
            else {
                game.messages.addMessage(`You miss the ${monster.name}!`);
            }
        }
    }

    // make the monsters move and things happen in the world
    function process_world() {
        let fov = new ROT.FOV.PreciseShadowcasting(gamestate.currentMap.lightPasses.bind(gamestate.currentMap));
        let path = new ROT.Path.Dijkstra(
            gamestate.me.location.x,
            gamestate.me.location.y, 
            gamestate.currentMap.lightPasses.bind(gamestate.currentMap), 
            {topology: 4} );

        let cansee = false;
        function canMonsterSeePlayer(x,y,r,v) {
            if(v != 0 && x == gamestate.me.location.x && y == gamestate.me.location.y) {
                cansee = true;
            }
        }

        each(gamestate.currentMap.mobs, (mob) => {
            cansee = false;
            fov.compute(mob.location.x, mob.location.y, 10, canMonsterSeePlayer);
            if ( cansee ) {
                let first = true, second = true, x, y;
                path.compute(mob.location.x, mob.location.y, (px,py) => {
                    if ( first ) {
                        first = false;
                    } else if (second ) {
                        x = px;
                        y = py;
                        second = false;
                    }
                });
                if ( !second ) {
                    if ( x == gamestate.me.location.x && y == gamestate.me.location.y ) {
                        // attach player
                        var dmg = mob.attack(gamestate.me);
                        if ( !dmg ) {
                            game.messages.addMessage(`The ${mob.name} tries to hit you but misses!`);
                        } else {
                            var result = gamestate.me.takeDamage(dmg);
                            if ( result ) {
                                game.messages.addMessage(`The ${mob.name} hits you!`);
                            }
                            else {
                                game.playerDies(mob.name);
                                game.messages.addMessage(`The ${mob.name} hits you and you DIE!`);
                                game.messages.addMessage(`Press ESCAPE to start over!!`);
                            }
                        }
                    }
                    else {
                        // move toward player
                        let dx = x - mob.location.x;
                        let dy = y - mob.location.y;
                        move(mob, dx, dy);
                    }
                }
            }
        });
    }

    function process_direction(dx,dy) {
        game.waitCallback(dx,dy);
        game.mode = 0;
    }

    function move_left() {
        if ( game.mode == 2 ) return;
        if ( game.mode == 1 ) { 
            process_direction(-1, 0); 
        } else { 
            move(gamestate.me,-1,0,true);
        }
        process_world();        
    }

    function move_right() {
        if ( game.mode == 2 ) return;
        if ( game.mode == 1 ) { 
            process_direction(1, 0); 
        } else {
            move(gamestate.me,1,0, true);
        }
        process_world();
    }

    function move_up() {
        if ( game.mode == 2 ) return;
        if ( game.mode == 1 ) { 
            process_direction(0, -1); 
        } 
        else {
            move(gamestate.me,0,-1, true);
        }
        process_world();
    }

    function move_down() {
        if ( game.mode == 2 ) return;
        if ( game.mode == 1 ) { 
            process_direction(0, 1); 
        } else { 
            move(gamestate.me,0,1, true);
        }
        process_world();
    }

    function cmd_toggleMusic() {
        gamestate.music.toggleMusic();
    }

    function cmd_rest() {
        if ( game.mode == 2 ) return;
        // do nothing
        process_world();
    }

    function cmd_open() {
        if ( game.mode == 2 ) return;

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
        if ( game.mode == 2 ) return;

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

    function cmd_restart() {
        if ( game.mode != 2 ) return;

        game.mode = 0;

        gamestate.me = new Player();
        gamestate.currentMap =  {left: 0, top: 0};
        gamestate.currentMapLevel = 0;
        gamestate.levels = [];
        gamestate.backend = new BackendClient()

        gamestate.backend.start();
    
        game.changeLevel(0);
        game.status.newPlayer(gamestate.me);
        gamestate.music.play("dungeon");
        game.drawMonster(gamestate.me);

    }

    function level_up() {
        if(gamestate.currentMapLevel > 0) {
            game.initDungeonLevel(gamestate.currentMapLevel-1);
            game.drawMonster(gamestate.me);
        }
    }

    function level_down() {
        game.initDungeonLevel(gamestate.currentMapLevel+1);
        game.drawMonster(gamestate.me);
    }

    function endgame() {
        game.display.clear();

        const x = opts.statusWidth + 2;
        let y = 8;
        game.display.drawText(x,y++,  "%c{#FF0000}##    ##  #######  ##     ##    ########  #### ######## ########  ");
        game.display.drawText(x,y++,  "%c{#FF0000} ##  ##  ##     ## ##     ##    ##     ##  ##  ##       ##     ## ");
        game.display.drawText(x,y++,  "%c{#FF0000}  ####   ##     ## ##     ##    ##     ##  ##  ##       ##     ## ");
        game.display.drawText(x,y++,  "%c{#FF0000}   ##    ##     ## ##     ##    ##     ##  ##  ######   ##     ## ");
        game.display.drawText(x,y++,  "%c{#FF0000}   ##    ##     ## ##     ##    ##     ##  ##  ##       ##     ## ");
        game.display.drawText(x,y++,  "%c{#FF0000}   ##    ##     ## ##     ##    ##     ##  ##  ##       ##     ## ");
        game.display.drawText(x,y++,  "%c{#FF0000}   ##     #######   #######     ########  #### ######## ########  ");
    }

    function use_stairs() {
        if(compareLocation(gamestate.me.location,gamestate.currentMap.entrance)) {
            game.changeLevel(gamestate.currentMapLevel-1);
        } else if (compareLocation(gamestate.me.location,gamestate.currentMap.exit)) {
            game.changeLevel(gamestate.currentMapLevel+1);
        }
    }

    function splash() {
        game.display.clear();
        game.display.drawText(0,0, "we are loading, please stand by ....");    
        if(ROT.RNG.getUniform() > 0.5) {
            game.display.drawText(20,10, "%c{#444444}#%c{#FF0000}    ,'|\"\\   .-. .-..-. .-.  ,--,   ,---.   .---.  .-. .-.   .---.       ");
            game.display.drawText(20,11, "%c{#5B4100}#%c{#FF0000}    | |\\ \\  | | | ||  \\| |.' .'    | .-'  / .-. ) |  \\| |  ( .-._)      ");
            game.display.drawText(20,12, "%c{#444444}#%c{#FF0000}    | | \\ \\ | | | ||   | ||  |  __ | `-.  | | |(_)|   | | (_) \\         ");
            game.display.drawText(20,13, "%c{#444444}#%c{#FF0000}    | |  \\ \\| | | || |\\  |\\  \\ ( _)| .-'  | | | | | |\\  | _  \\ \\        ");
            game.display.drawText(20,14, "%c{#444444}#%c{#FF0000}    /(|`-' /| `-')|| | |)| \\  `-) )|  `--.\\ `-' / | | |)|( `-'  )       ");
            game.display.drawText(20,15, "%c{#444444}#%c{#FF0000}   (__)`--' `---(_)/(  (_) )\\____/ /( __.' )---'  /(  (_) `----'        ");
            game.display.drawText(20,16, "%c{#444444}#%c{#FF0000}                  (__)    (__)    (__)    (_)    (__)                   ");
            game.display.drawText(20,17, "%c{#444444}#%c{#FF0000}           .---.  ,---.                                                 ");
            game.display.drawText(20,18, "%c{#5B4100}#%c{#FF0000}          / .-. ) | .-'                                                 ");
            game.display.drawText(20,19, "%c{#444444}#%c{#FF0000}          | | |(_)| `-.                                                 ");
            game.display.drawText(20,20, "%c{#444444}#%c{#FF0000}          | | | | | .-'                                                 ");
            game.display.drawText(20,21, "%c{#444444}#%c{#FF0000}          \\ `-' / | |                                                   ");
            game.display.drawText(20,22, "%c{#444444}#%c{#FF0000}           )---'  )\\|                                                   ");
            game.display.drawText(20,23, "%c{#444444}#%c{#FF0000}          (_)    (__)                                                   ");
            game.display.drawText(20,24, "%c{#5B4100}#%c{#FF0000}    ,'|\"\\   ,---..-.   .-.,-.   .---. ,-. .---.   .---.  .-. .-.  .--.  ");
            game.display.drawText(20,25, "%c{#444444}#%c{#FF0000}    | |\\ \\  | .-' \\ \\ / / |(|  ( .-._)|(|/ .-. ) / .-. ) |  \\| | / /\\ \\ ");
            game.display.drawText(20,26, "%c{#444444}#%c{#FF0000}    | | \\ \\ | `-.  \\ V /  (_) (_) \\   (_)| | |(_)| | |(_)|   | |/ /__\\ \\");
            game.display.drawText(20,27, "%c{#444444}#%c{#FF0000}    | |  \\ \\| .-'   ) /   | | _  \\ \\  | || | | | | | | | | |\\  ||  __  |");
            game.display.drawText(20,28, "%c{#444444}#%c{#FF0000}    /(|`-' /|  `--.(_)    | |( `-'  ) | |\\ `-' / \\ `-' / | | |)|| |  |)|");
            game.display.drawText(20,29, "%c{#444444}#%c{#FF0000}   (__)`--' /( __.'       `-' `----'  `-' )---'   )---'  /(  (_)|_|  (_)");
            game.display.drawText(20,30, "%c{#5B4100}#%c{#FF0000}           (__)                          (_)     (_)    (__)            ");
        } else {
            game.display.drawText(4,9,  "%c{#5B0180}██████╗ ██╗   ██╗███╗   ██╗ ██████╗ ███████╗ ██████╗ ███╗   ██╗███████╗     ██████╗ ███████╗");
            game.display.drawText(4,10, "%c{#5B0180}██╔══██╗██║   ██║████╗  ██║██╔════╝ ██╔════╝██╔═══██╗████╗  ██║██╔════╝    ██╔═══██╗██╔════╝");
            game.display.drawText(4,11, "%c{#5B0180}██║  ██║██║   ██║██╔██╗ ██║██║  ███╗█████╗  ██║   ██║██╔██╗ ██║███████╗    ██║   ██║█████╗  ");
            game.display.drawText(4,12, "%c{#5B0180}██║  ██║██║   ██║██║╚██╗██║██║   ██║██╔══╝  ██║   ██║██║╚██╗██║╚════██║    ██║   ██║██╔══╝  ");
            game.display.drawText(4,13, "%c{#5B0180}██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝███████╗╚██████╔╝██║ ╚████║███████║    ╚██████╔╝██║     ");    
            game.display.drawText(4,14, "%c{#5B0180}╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝     ╚═════╝ ╚═╝     ");    
            game.display.drawText(4,15, "%c{#5B0180}██████╗ ███████╗██╗   ██╗██╗███████╗██╗ ██████╗  ██████╗ ███╗   ██╗ █████╗                  ");    
            game.display.drawText(4,16, "%c{#5B0180}██╔══██╗██╔════╝██║   ██║██║██╔════╝██║██╔═══██╗██╔═══██╗████╗  ██║██╔══██╗                 ");    
            game.display.drawText(4,17, "%c{#5B0180}██║  ██║█████╗  ██║   ██║██║███████╗██║██║   ██║██║   ██║██╔██╗ ██║███████║                 ");    
            game.display.drawText(4,18, "%c{#5B0180}██║  ██║██╔══╝  ╚██╗ ██╔╝██║╚════██║██║██║   ██║██║   ██║██║╚██╗██║██╔══██║                 ");    
            game.display.drawText(4,19, "%c{#5B0180}██████╔╝███████╗ ╚████╔╝ ██║███████║██║╚██████╔╝╚██████╔╝██║ ╚████║██║  ██║                 ");    
            game.display.drawText(4,20, "%c{#5B0180}╚═════╝ ╚══════╝  ╚═══╝  ╚═╝╚══════╝╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═╝                 ");    
        }
        gamestate.music.prepareMusic("town", "town_ambience_1");
        gamestate.music.prepareMusic("dungeon", "cave_4");
        gamestate.music.play("town");
    }
    
    var game = {
        display: null,
        waitCallback: null,
        messages: null,
        status: null,
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

                keybinding(ROT.VK_U, use_stairs);
                
                keybinding(ROT.VK_M, cmd_toggleMusic);

                keybinding(ROT.VK_R, cmd_rest);

                keybinding(ROT.VK_ESCAPE, cmd_restart);
            }

            // pass in options to the constructor to change the default 80x25 size
            this.display = new ROT.Display({
                width: opts.screenWidth,
                height: opts.screenHeight,
            }); 

            this.messages = new Messages(this, 0, opts.messagesLeft, opts.mapWidth, opts.messagesHeight);
            this.status = new StatusPanel(gamestate.me, this.display, 0, 3, opts.statusWidth, opts.statusHeight);
            gamestate.me.onUpdated(() => {
                this.status.updateAll();
            });

            // calculate the maximum font size to achieve the desired size (80x25 characters)
            var size = getWindowSize();
            this.display.setOptions({fontSize: this.display.computeFontSize(size[0] - 10, size[1] - 10)});
            root.addEventListener("resize", onResize.bind(this) );

            // create rot container
            document.body.appendChild(this.display.getContainer());

            // setup keyboard
            keyconfig();
            keyboard.init();

            // show the splashscreen
            splash();

            root.setTimeout(function() {
                gamestate.backend.start();        
                game.changeLevel(0);
                game.status.updateAll();
                gamestate.music.play("town");
            }, 2000);
        },
        initTown: function() {
            var generator = new ROT.Map.Arena(30, 20);
            var map = new Map(30, 20, generator);
            map.setup(opts.statusWidth, opts.messagesHeight, this.display);
            gamestate.levels.push(map);
            this.loadTown();
        },

        changeLevel: function(level) {
            this.display.clear();
            gamestate.currentMapLevel = level;
            if (gamestate.levels.length === 0) {
                this.initTown();
            } else if (level === 0 ) {
                this.loadTown();
            }
            else if(level >= gamestate.levels.length) {
                this.initDungeonLevel(level);
            } else {
                this.loadDungeonLevel(level);
            }
            gamestate.currentMap = gamestate.levels[gamestate.currentMapLevel];
            gamestate.me.moveTo(gamestate.currentMap.entrance.x, gamestate.currentMap.entrance.y);
            gamestate.currentMap.show();
            game.drawMonster(gamestate.me);
            game.status.updateAll();
            
        },
        
        loadTown: function() {
            game.display.drawText(0,0, "%c{#FFFFFF}Town");
        },

        loadDungeonLevel: function(level) {
            game.display.drawText(0,0, "%c{#FFFFFF}Dungeon, level %s".format(level));
            game.display.drawText(0,opts.statusHeight - 3, "%c{#5B0080}DevisioonΔ");
            game.display.drawText(0,opts.statusHeight - 2, "%c{#5B0080}roguelike hackathon");
            game.display.drawText(0,opts.statusHeight - 1, "%c{#5B0080}2018");

            this.messages.addMessage("You are entering a dangerous dungeon.");
            this.messages.addMessage("BTW this is the messages area :)");
            this.messages.addMessage("Use arrow keys to move, o to open doors (followed by direction)");
        },
        
        // this functions generates a new game level (assuming levels starts from 1 upward)
        // you can provide custom logic, static levels, use another ROT provided generator or create your own generation algorithm
        initDungeonLevel: function(level) {
            var generator = new ROT.Map.Digger(opts.mapWidth, opts.mapHeight, {
                dugPercentage: 0.4
            });
            var map = new Map(opts.mapWidth, opts.mapHeight, generator);
            map.setup(opts.statusWidth, opts.messagesHeight, this.display);
            for ( var x = 0; x < 5; ++x ) {    
                map.addItemToRandomRoom();
            }
            map.setDungeonLevel(level);
            map.addMonsters();
            gamestate.levels.push(map);
            this.loadDungeonLevel(level);
        },

        drawMonster: function(monster) {
            gamestate.currentMap.drawMonster(monster);
        },

        waitDirection: function(callback) {
            this.waitCallback = callback;
            this.mode = 1;
        },

        playerDies(killer) {
            this.mode = 2;
            endgame();
            gamestate.backend.end("Player", gamestate.me.xp, gamestate.me.gold, killer );
            this.status.updateAll();
        }
    };

    return game;
})(window);
