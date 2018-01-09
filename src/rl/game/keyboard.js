// rlhack template
// Keyboard
//
// Mappable keyboard handling
//

class Keyboard {
    constructor() {
        this.keymap = {};
    }

    init() {
        var body = document.getElementsByTagName("body")[0];
        body.addEventListener("keydown", (e) => {
            if ( !!this.keymap[e.keyCode] ) {
                this.keymap[e.keyCode]();
            }
        });
        body.focus();
    }

    map(key, fn) {
        this.keymap[key] = fn;
    }

    unmap(key) {
        if ( this.keymap.hasOwnProperty(key) ) {
            this.keymap[key] = undefined;
        }
    }
}

export const keyboard = new Keyboard();
