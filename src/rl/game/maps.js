
var TILES = {
    Wall: '#',
    ClosedDoor: '+',
    OpenedDoor: '\'',
    Floor: '.',
    Water: '~',
    StairsUp: '<',
    StairsDown: '>',
    Grass: '"',
};

var TILE_COLOR = {
    "#": "#2E2E2E",
    ".": "#5F5F5F",
    "+": "#775500",
    "\'": "#775500"
};

var TILE_BLOCKING = {
    "#": true,
    ".": false,
    "+": true,
    "\'": false
};

var ITEMS = {
    Gold: '$',
    Scroll: '?',
    Potion: '!',
    Ring: '○',
    SoftArmor: '(',
    HardArmor: '[',
    Shield: ')',
    Weapon: '|'
};

// this class can store maps that you generate
var Map = (function() {
    function Map(width, height, generator) {
        this.width = width;
        this.height = height;
    
        this.tiles = [];
        this.items = [];
        this.visited = [];

        function callback(x,y,what) {
            var tile = what == 1 ? TILES.Wall : TILES.Floor;
            this.setTile(x,y,tile);
        }

        function doorcallback(x,y) {
            this.setTile(x,y,TILES.ClosedDoor);
        }

        generator.create(callback.bind(this));

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
    }
        
    function coord(map,x,y) {
        return y * map.width + x;
    }

    extend(Map.prototype, {
        addItem: function(x, y, item) {
            this.items[coord(this,x,y)] = item;
        },
        
        setTile: function(x, y, tiletype) {
            this.tiles[coord(this,x,y)] = tiletype;
        },

        getTile: function(x,y) {
            return this.tiles[coord(this,x,y)];
        },
    
        setVisited: function(x,y) {
            this.visited[coord(this,x,y)] = true;
        },

        setup: function(left, top, display) {
            this.left = left;
            this.top = top;
            this.display = display;
        },

        show: function() {
            this.display.clear();
            for(var y = 0; y < this.height; ++y ) {
                for(var x = 0; x < this.width; ++x ) {
                    this.drawTile(x,y);
                }
            }
        },

        drawTile: function(x,y) {
            var tile = this.getTile(x,y);
            var color = "#FFFFFF"
            if ( !!TILE_COLOR[tile]) {
                color = TILE_COLOR[tile];
            }
            this.display.draw(x+this.left,y+this.top,tile,color);            
        },

        isPassable: function(x,y) {
            return !TILE_BLOCKING[this.getTile(x,y)];
        }
    });

    return Map;
})();

function MapItem(symbol, color, type, amount) {
    if ( typeof amount === "undefined" ) { amount = 1; } 
}

