///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// maps.js
//
// Map generation and handling
//
///////////////////////////////////////////////////////////////

import { GenerateRandomMonster } from "./monsters";
import { each } from "./util";

export const TILES = {
    Wall: '#',
    DeepWall: ' ',
    ClosedDoor: '+',
    OpenedDoor: '\'',
    Floor: '.',
    Water: '~',
    StairsUp: '<',
    StairsDown: '>',
    Grass: '"',
};

const TILE_COLOR = {
    "#": "#2E2E2E",
    ".": "#5F5F5F",
    "+": "#775500",
    "\'": "#775500"
};

const ITEM_COLOR = {
    "$": "#FFFF00"
};

const TILE_BLOCKING = {
    "#": true,
    ".": false,
    "+": true,
    "\'": false
};

export const ITEMS = {
    Gold: '$',
    SoftArmor: '(',
    HardArmor: '[',
    Shield: ')',
    Weapon: '|',
    // Scroll: '?',
    // Potion: '!',
    // Ring: '○',
};

const NUMBER_OF_ITEMS = Object.values(ITEMS).length;

function coord(map,x,y) {
    return y * map.width + x;
}

export class Map {
    constructor(width, height, generator) {
        this.width = width;
        this.height = height;
    
        this.tiles = [];
        this.items = [];
        this.mobs = [];
        this.visited = [];
        this.entrance = {};
        this.exit = {};

        // called during creation, setup walls and floors
        function callback(x,y,what) {
            var tile = what == 1 ? TILES.Wall : TILES.Floor;
            this.setTile(x,y,tile);
        }

        // called for each door when inspecting rooms
        function doorcallback(x,y) {
            this.setTile(x,y,TILES.ClosedDoor);
        }

       
        generator.create(callback.bind(this));
        //if room is an arena which doesn't have get rooms
        if(!generator.getRooms) {
            this.rooms = [new ROT.Map.Feature.Room(1,1,width-2,height-2)];
        } else {
            var rooms = generator.getRooms();
            this.rooms = rooms;
        }
        // assign starting position and draw all the doors
        for ( var r = 0; r < this.rooms.length; ++r ) {
            var room = this.rooms[r];
            room.getDoors(doorcallback.bind(this));
        }
        // clear walls that are not adjacent to floors
        for ( var x = 0; x < this.width; ++x ) {
            for ( var y = 0; y < this.height; ++y ) {
                if ( this.isWall(x,y) ) {
                    if (this.isWall(x-1, y-1) && 
                        this.isWall(x, y-1) && 
                        this.isWall(x+1, y-1) && 
                        this.isWall(x-1, y) && 
                        this.isWall(x+1, y) && 
                        this.isWall(x-1, y+1) && 
                        this.isWall(x, y+1) && 
                        this.isWall(x+1, y+1)) {
                        this.setTile(x,y,TILES.DeepWall);
                    }
                }
            }
        }
        this.entrance = this.getRandomLocation();
        do {
            this.exit = this.getRandomLocation();
        } while (this.exit === this.entrance);

        if(generator.getRooms) {
            this.setTile(this.entrance.x,this.entrance.y,TILES.StairsUp);
        }
        this.setTile(this.exit.x,this.exit.y,TILES.StairsDown);
    }
    getRandomLocation() {
        var location = {};
        var room = this.getRandomRoom();
        location.x = this.getRandomXcoordInRoom(room);
        location.y = this.getRandomYcoordInRoom(room);
        return location;
    }
    addItemToRandomRoom() {
        this.addItemToRandomPositionInRoom(this.getRandomRoom(), this.getRandomItem());
    }

    getRandomItem() {
        return Object.values(ITEMS)[Math.floor(NUMBER_OF_ITEMS*ROT.RNG.getUniform())];
    }

    getRandomRoom() {
        var rooms = this.rooms;
        var roomNumber = Math.floor(ROT.RNG.getUniform()*rooms.length);
        return rooms[roomNumber];
    }

    getRandomCoordinateInRandomRoom() {
        const room = this.getRandomRoom();
        return { x: this.getRandomXcoordInRoom(room), y: this.getRandomYcoordInRoom(room) };
    }

    addItemToRandomPositionInRoom(room, item) {
        do {            
            var x = this.getRandomXcoordInRoom(room);
            var y = this.getRandomYcoordInRoom(room);
        } while (this.tiles[coord(this,x,y)].item);
        this.addItem(x, y, item);
    }

    getRandomXcoordInRoom(room) {
        var left = room.getLeft();
        var right = room.getRight();
        return left + Math.round((right - left) * ROT.RNG.getUniform());
    }

    getRandomYcoordInRoom(room) {
        var top = room.getTop();
        var bottom = room.getBottom();
        return top + Math.round((bottom - top) * ROT.RNG.getUniform());      
    }

    addItem(x, y, item) {
         this.tiles[coord(this,x,y)].item = item;
         this.items.push(item);
    }

    pickUpItem(x, y) {
        var item = this.tiles[coord(this,x,y)].item;
        this.tiles[coord(this,x,y)].item = undefined;
        return item;
    }
    
    setTile(x, y, tiletype) {
        const c = coord(this,x,y);
        if (!this.tiles[c]) {
            this.tiles[c] = { tile: tiletype };
        } else {
            this.tiles[c].tile = tiletype;
        }
    }

    getTile(x,y) {
        return this.tiles[coord(this,x,y)].tile;
    }

    getLocation(x,y) {
        return this.tiles[coord(this,x,y)];
    }

    getTileWithBoundCheck(x,y) {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) return TILES.DeepWall;
        return this.tiles[coord(this,x,y)].tile;
    }
 
    setVisited(x,y) {
        this.visited[coord(this,x,y)] = true;
    }

    setup(left, top, display, player) {
        this.left = left;
        this.top = top;
        this.display = display;
        this.player = player;

        this.fov = new ROT.FOV.PreciseShadowcasting(this.lightPasses.bind(this));
    }

    show() {
        for(var y = 0; y < this.height; ++y ) {
            for(var x = 0; x < this.width; ++x ) {
                this.drawTile(x,y);
            }
        }
    }

    drawTile(x,y,ignoreMonsters) {
        this.fov.compute(this.player.location.x, this.player.location.y, 10, (vx, vy, r, visibility) => {
            var color = "#FFFFFF";
            let mob = this.hasMonster(vx,vy);
            var location = this.getLocation(vx,vy);
            if ( !ignoreMonsters && !!mob ) {
                this.drawMonster(mob);
            }
            else if ( !location.item) {
                if ( !!TILE_COLOR[location.tile]) {
                    color = TILE_COLOR[location.tile];
                }
                this.display.draw(vx+this.left,vy+this.top,location.tile,color);
            } else {
                if ( !!ITEM_COLOR[location.item]) {
                    color = ITEM_COLOR[location.item];
                }
                this.display.draw(vx+this.left,vy+this.top,location.item,color);
            }
        });
    }

    drawMonster(monster) {
        this.display.draw(monster.location.x + this.left, monster.location.y + this.top, monster.symbol, monster.color);
    }

    hasMonster(x,y) {
        if ( !this.mobs ) return undefined;
        let atLocation = undefined;
        each(this.mobs, (mob) => {
            if ( mob.location.x == x && mob.location.y == y ) atLocation = mob;
        });
        return atLocation;
    }

    isPassable(x,y) {
        return !TILE_BLOCKING[this.getTile(x,y)] && !this.hasMonster(x,y);
    }

    isWall(x,y) {
        var t = this.getTileWithBoundCheck(x,y);
        return t === TILES.Wall || t === TILES.DeepWall;
    }

    addMonsters() {
        let numberOfMonsters = Math.round(ROT.RNG.getUniform() * 5) + 5;
        for ( let i = 0; i < numberOfMonsters; ++i ) {
            let mob = GenerateRandomMonster(this.dungeonlevel);
            mob.location = this.getRandomCoordinateInRandomRoom();
            this.mobs.push(mob);
        }
    }

    setDungeonLevel(level) {
        this.dungeonlevel = level;
    }

    lightPasses(x,y) {
        const tile = this.getTileWithBoundCheck(x,y);
        if(tile == TILES.Wall || tile == TILES.DeepWall || tile == TILES.ClosedDoor) {
            return false;
        }
        return true;
    }

    killMonster(mob) {
        for(var idx = 0; idx < this.mobs.length; ++idx ) { 
            if ( mob === this.mobs[idx] ) {
                this.drawTile( mob.location.x, mob.location.y, true );
                this.mobs.splice(idx, 1);
                break;
            }
        }
    }
}


