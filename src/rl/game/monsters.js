///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// monster.js
//
// Defines the monster class to show monsters
//
///////////////////////////////////////////////////////////////

export class Monster {
    constructor(name, symbol, color, minlevel, maxlevel, hp, strength, armor, vision) {
        this.name = name;
        this.symbol = symbol;
        this.color = color;
        this.minlevel = minlevel;
        this.maxlevel = maxlevel;
        
        this.hp = hp;
        this.strength = strength;
        this.armor = armor;
        this.vision = vision;
    
        this.location = { x: 39, y: 12 };
    }

    move(dx,dy) {
        this.location.x += dx;
        this.location.y += dy;
    }

    moveTo(x,y) {
        this.location.x = x;
        this.location.y = y;
    }
}

export class AIMonster extends Monster {
    constructor(name, symbol, color, minlevel, maxlevel, hp, strength, armor, vision, gamestate) {
        super(name, symbol, color, minlevel, maxlevel, hp, strength, armor, vision);
        this.gamestate = gamestate;
        this.target = null;
        this.location = this.gamestate.currentMap.getRandomPassableLocation();
    }

    chooseDirection() {
        var map = this.gamestate.currentMap;

        if (this.canSeePlayer()) {
            console.log("saw player")
            this.target = this.gamestate.me.location;
        }
        else if (this.distanceToTarget() == 0 ) {
            this.target = this.chooseRandomTarget(); 
            console.log("choose random target" + this.target);
        }

        var astar = new ROT.Path.AStar(this.target.x, this.target.y, map.isPassable.bind(map));
        var newX = this.location.x, newY = this.location.y;
        astar.compute(this.location.x, this. location.y, (x, y) => {
            if (newX === this.location.x || newY === this.location.y) {
                newX = x;
                newY = y;
            }
        });
        if (newX === this.location.x && newY == this.location.y) { //no route, choose new target
            this.target = this.chooseRandomTarget();
            return { x: 0, y: 0 }; //TODO random movement
        }

        var dir = { x: newX - this.location.x, y: newY - this.location.y };
        return dir;
    }

    distanceToTarget() {
        if (!this.target)
            return 0;
        return Math.abs(this.target.x - this.location.x) + Math.abs(this.target.y - this .location.y); 
    }

    canSeePlayer() {
        var playerLocation = this.gamestate.me.location;
        return this.gamestate.currentMap.canSee(this.location.x, this.location.y, playerLocation.x, playerLocation.y, this.vision);
    }

    chooseRandomTarget() {
        return this.gamestate.currentMap.getRandomPassableLocation();
    }
} 


export const monsters = [
    new Monster("kobold", "k", "#207020", 1, 5, 10),
    new Monster("Haskell perhonen", "H", "#ed9797", 2, 6, 35)
];
