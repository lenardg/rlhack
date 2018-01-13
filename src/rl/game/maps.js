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

    // Action tiles
    Teleport: 'Z',
    Well: 'W'
};

const TILE_COLOR = {
    "#": "#2E2E2E",
    ".": "#5F5F5F",
    "+": "#775500",
    "\'": "#775500",
    "Z": "#F000F0",
    "W": "#F00000",
    "!": "#FFD700"
};

const TILE_BLOCKING = {
    "#": true,
    ".": false,
    "+": true,
    "\'": false
};

const TILE_VISION_BLOCKING = TILE_BLOCKING;

const ITEM_VISION_BLOCKING = {
    
};

export const ITEMS = {
    Gold: { key: '$', value: 100 },
    Scroll: { key: '?', value: 50 },
    Potion: { key: '!', value: 25 },
    Ring: { key: '○', value: 150 },
    SoftArmor: { key: '(', value: 200 },
    HardArmor: { key: '[', value: 500 },
    Shield: { key: ')', value: 250 },
    Weapon: { key: '|', value: 150 },
    Torch: { key: '*', value: 25 }
};

function coord(map,x,y) {
    return y * map.width + x;
}

class RootMap {
    constructor(width, height, winCallback, deathCallback) {
        this.height = height;
        this.width = width;
        this.startx = width / 2;
        this.starty = height / 2;
        this.winCallback = winCallback;
        this.deathCallback = deathCallback;

        this.tiles = [];
        this.items = [];
        this.viewed = [];
        this.currentView = [];
    }

    addItem(x, y, item) {
        this.items[coord(this,x,y)] = item;
    }

    addTile(x, y, tile) {
        this.tiles[coord(this,x,y)] = tile;
    }
    
    setTile(x, y, tiletype) {
        this.tiles[coord(this,x,y)] = tiletype;
    }

    getTile(x,y) {
        return this.tiles[coord(this,x,y)];
    }

    getItem(x,y) {
        return this.items[coord(this,x,y)];
    }

    removeItem(x,y) {
        this.items[coord(this, x, y)] = undefined;
    }

    getTileWithBoundCheck(x,y) {
        if ( x < 0 || x >= this.width || y < 0 || y >= this.height ) return TILES.DeepWall;
        return this.tiles[coord(this,x,y)];
    }
 
    setViewed(x,y) {
        this.viewed[coord(this,x,y)] = true;
    }

    hasViewed(x,y) {
        return this.viewed[coord(this, x, y)];
    }

    getVisibility(x,y) {
        return this.currentView[coord(this, x, y)] || 0.0;
    }

    setup(left, top, display) {
        this.left = left;
        this.top = top;
        this.display = display;
    }

    drawTile(x,y) {
        var item = this.getItem(x,y);
        var tile = this.getTile(x,y);
        var color = "#FFFFFF";

        var visibility = this.getVisibility(x, y);
        var viewed = this.hasViewed(x, y);
        var obj;
        if (!viewed) {
            obj = null;
        }
        else if (visibility == 0.0) {
            obj = tile;
            color = TILE_COLOR[tile];
        }
        else {
            if (item != null) {
                obj = item;
                color = TILE_COLOR[item];
            } else {
                obj = tile;
                color = TILE_COLOR[tile];
            }
            
            obj = item || tile;
        }

        this.display.draw(x+this.left,y+this.top,obj,color);
    }

    isPassable(x,y) {
        return !TILE_BLOCKING[this.getTile(x,y)];
    }

    isFreeTile(x,y) {
        const tile = this.getTile(x,y);
        return (tile === TILES.Floor || tile === TILES.Grass) &&
            this.items[coord(this,x,y)] == null;
    }

    getAction(x, y) {
        switch (this.getTile(x, y)) {
            case TILES.Teleport:
                return this.winCallback;
            case TILES.Well:
                return () => this.deathCallback("Oops! You were a little bit stupid and you fell down a well");
            default:
                return null;
        }
    }

    lightPasses(x,y) {
        return !TILE_VISION_BLOCKING[this.getTile(x,y)] && !ITEM_VISION_BLOCKING[this.getItem(x,y)];
    }

    updateVision(viewerX, viewerY, visionRadius) {
        var fov = new ROT.FOV.PreciseShadowcasting(this.lightPasses.bind(this));
        var currentView = [];
        fov.compute(viewerX, viewerY, visionRadius, (x, y, r, visibility) => {
            currentView[coord(this, x, y)] = (2 * visionRadius - r) / (2 * visionRadius);
        });
        this.currentView = currentView;
        Object.keys(currentView).forEach((pos) => {
            this.viewed[pos] = true;
        });
    }

    isWall(x,y) {
        var t = this.getTileWithBoundCheck(x,y);
        return t === TILES.Wall || t === TILES.DeepWall;
    }

    show() {
        for (var y = 0; y < this.height; ++y ) {
            for (var x = 0; x < this.width; ++x ) {
                this.drawTile(x,y);
            }
        }
    }

    collectItem(x,y) {
        this.setTile(x, y, TILES.Floor);
        this.drawTile(x, y);
        this.removeItem(x, y);
    }

}

export class TutorialMap extends RootMap {
    constructor(mapWidth, mapHeight, winCallback, deathCallback) {
        super(mapWidth, mapHeight, winCallback, deathCallback);

        new ROT.Map.Arena(this.width, this.height).create((x, y, wall) => {
            this.setTile(x, y, wall ? TILES.Wall : TILES.Floor);
        });

        this.setTile(this.startx + 2,this.starty,TILES.Teleport);
        this.setTile(this.startx + 3,this.starty + 4,TILES.Well);
    }
}

export class Map extends RootMap {
    constructor(width, height, winCallback, deathCallback, generator) {
        super(width, height, winCallback, deathCallback);

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
                    if ( this.isWall(x-1, y-1) && 
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
}
