
var game = (function(root) {

    var opts = {
        screenWidth: 100,
        screenHeight: 28,
        mapWidth: 80,
        mapHeight: 25,
        statusWidth: 20,
        statusHeight: 28,
        messagesHeight: 3
    };

    function getWindowSize() {
        return [root.innerWidth, root.innerHeight];
    }

    function onResize() {
        var size = getWindowSize();
        this.display.setOptions({fontSize: this.display.computeFontSize(size[0], size[1])});        
    }

    function move(mob,dx,dy) {
        game.currentMap.drawTile( mob.location.x, mob.location.y );
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
        currentMap: null,
    
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
            this.display = new ROT.Display({
                width: opts.screenWidth,
                height: opts.screenHeight,
            }); 

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
            //this.splashScreen();

            this.initLevel(1);
            this.drawMonster(me);
            
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

        // this functions generates a new game level (assuming levels starts from 1 upward)
        // you can provide custom logic, static levels, use another ROT provided generator or create your own generation algorithm
        initLevel: function(level) {
            var generator = new ROT.Map.Digger(opts.mapWidth, opts.mapHeight, {
                dugPercentage: 0.4
            });
            this.currentMap = new Map(opts.mapWidth, opts.mapHeight, generator);

            this.currentMap.setup(opts.statusWidth, opts.messagesHeight, this.display);

            this.currentMap.show();
        },

        drawMonster: function(monster) {
            this.display.draw(monster.location.x + this.currentMap.left, monster.location.y + this.currentMap.top, monster.symbol, monster.color);
        }
    }

    return game;
})(window);

