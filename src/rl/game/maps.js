///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// maps.js
//
// Map generation and handling
//
///////////////////////////////////////////////////////////////

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

const TILE_BLOCKING = {
    "#": true,
    ".": false,
    "+": true,
    "\'": false
};

const ITEMS = {
    Gold: '$',
    Scroll: '?',
    Potion: '!',
    Ring: '○',
    SoftArmor: '(',
    HardArmor: '[',
    Shield: ')',
    Weapon: '|'
};

function coord(map,x,y) {
    return y * map.width + x;
}

export class Map {
    constructor(width, height, generator) {
        this.width = width;
        this.height = height;
    
        this.tiles = [];
        this.items = [];
        this.visited = [];

        // called during creation, setup walls and floors
        function callback(x,y,what) {
            var tile = what == 1 ? TILES.Wall : TILES.Floor;
            this.setTile(x,y,tile);
        }

        // called for each door when inspecting rooms
        function doorcallback(x,y) {
            this.setTile(x,y,TILES.ClosedDoor);
        }

        // create dungeon
        generator.create(callback.bind(this));

        // assign starting position and draw all the doors
        var rooms = generator.getRooms();
        for ( var r = 0; r < rooms.length; ++r ) {
            var room = rooms[r];
            if ( r == 0 ) {
                var left = room.getLeft();
                var right = room.getRight();
                var top = room.getTop();
                var bottom = room.getBottom();

                this.startx = left + Math.round((right - left) * ROT.RNG.getUniform());
                this.starty = top + Math.round((bottom - top) * ROT.RNG.getUniform());
            }
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
    }

    addItem(x, y, item) {
        this.items[coord(this,x,y)] = item;
    }
    
    setTile(x, y, tiletype) {
        this.tiles[coord(this,x,y)] = tiletype;
    }

    getTile(x,y) {
        return this.tiles[coord(this,x,y)];
    }

    getTileWithBoundCheck(x,y) {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) return TILES.DeepWall;
        return this.tiles[coord(this,x,y)];
    }
 
    setVisited(x,y) {
        this.visited[coord(this,x,y)] = true;
    }

    setup(left, top, display) {
        this.left = left;
        this.top = top;
        this.display = display;
    }

    show() {
        this.display.clear();
        for(var y = 0; y < this.height; ++y ) {
            for(var x = 0; x < this.width; ++x ) {
                this.drawTile(x,y);
            }
        }
    }

    drawTile(x,y) {
        var tile = this.getTile(x,y);
        var color = "#FFFFFF";
        if ( !!TILE_COLOR[tile]) {
            color = TILE_COLOR[tile];
        }
        this.display.draw(x+this.left,y+this.top,tile,color);            
    }

    isPassable(x,y) {
        return !TILE_BLOCKING[this.getTile(x,y)];
    }

    isWall(x,y) {
        var t = this.getTileWithBoundCheck(x,y);
        return t === TILES.Wall || t === TILES.DeepWall;
    }
}


