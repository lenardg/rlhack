
import { Monster } from "./monsters";

export class Player extends Monster {
    constructor() {
        super("ME", "@", "#FFFFFF", 1, 999, 10, 0, 0, 8);

        this.level = 1;
    
        this.hp = 10;
    
        this.fullness = 100; // how full are we, when we need to eat again?
    
        this.location.y = 14;
        this.location.x = 43;
    }
}
