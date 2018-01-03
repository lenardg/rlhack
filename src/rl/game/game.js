
var game = (function(root) {

    function getWindowSize() {
        return [root.innerWidth, root.innerHeight];
    }

    function onResize() {
        var size = getWindowSize();
        this.display.setOptions({fontSize: this.display.computeFontSize(size[0], size[1])});        
    }

    function move(mob,dx,dy) {
        mob.move(dx, dy);
        game.drawMonster(mob);
    }

    function move_left() {
        move(me,-1,0);
    }

    function move_right() {
        move(me,1,0);
    }

    function move_up() {
        move(me,0,-1);
    }

    function move_down() {
        move(me,0,1);
    }

    var game = {
        display: null,
    
        init: function() {
            function keybinding(key,fn) {
                root.keyboard.map(key,fn.bind(this));
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
            }

            // pass in options to the constructor to change the default 80x25 size
            this.display = new ROT.Display(); 

            // calculate the maximum font size to achieve the desired size (80x25 characters)
            var size = getWindowSize();
            this.display.setOptions({fontSize: this.display.computeFontSize(size[0] - 10, size[1] - 10)});
            root.addEventListener("resize", onResize.bind(this) )

            // create rot container
            document.body.appendChild(this.display.getContainer());

            // setup keyboard
            keyconfig();
            keyboard.init();

            // show the splashscreen
            this.splashScreen();
        },

        splashScreen: function() {
            this.display.clear();        
            this.display.drawText(0,0, "we are loading, please stand by ....");
            this.display.drawText(20,10, "%c{#444444}#%c{#5B0180}          _  _                   _    ");
            this.display.drawText(20,11, "%c{#444444}#%c{#5B0180}         | || |                 | |   ");
            this.display.drawText(20,12, "%c{#5B4100}+%c{#5B0180}    _ __ | || |__    __ _   ___ | | __");
            this.display.drawText(20,13, "%c{#444444}#%c{#5B0180}   | '__|| || '_ \\  / _` | / __|| |/ /");
            this.display.drawText(20,14, "%c{#444444}#%c{#5B0180}   | |   | || | | || (_| || (__ |   < ");
            this.display.drawText(20,15, "%c{#444444}#%c{#5B0180}   |_|   |_||_| |_| \\__,_| \\___||_|\\_\\");

            this.drawMonster(me);
        },

        initLevel: function(level) {

        },

        drawMonster: function(monster) {
            this.display.draw(monster.location.x, monster.location.y, monster.symbol, monster.color);
        }
    }

    return game;
})(window);

