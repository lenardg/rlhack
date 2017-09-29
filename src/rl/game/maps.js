
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
    function Map(width, height) {
        this.width = width;
        this.height = height;
    
        this.tiles = [];
        this.items = [];
        this.visited = [];
    }
        
    function coord(map,x,y) {
        return y * map.width + x;
    }

    extend(Map.prototype, {
        addItem: function(x, y, item) {
            this.items[coord(this,x,y)] = item;
        },
        
        setTile: function(x, y, tiletype) {
            this.data[coord(this,x,y)] = tiletype;
        },
    
        setVisited: function(x,y) {
            this.visited[coord(this,x,y)] = true;
        },

        prefill: function(strings) {

        }
    });

    return Map;
})();

function MapItem(symbol, color, type, amount) {
    if ( typeof amount === "undefined" ) { amount = 1; } 
}

