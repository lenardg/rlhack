
var TILES = {
    Wall: '#',
    ClosedDoor: '+',
    OpenedDoor: '/',
    Floor: '.',
    Water: '~',
    StairsUp: '<',
    StairsDown: '>',
    Grass: '"',
};

var TILE_COLOR = {
    "#": "#444444",
    ".": "#666666"
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

        generator.create(callback.bind(this));
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
        }
    });

    return Map;
})();

function MapItem(symbol, color, type, amount) {
    if ( typeof amount === "undefined" ) { amount = 1; } 
}

