
var game = (function(root) {

    function getWindowSize() {
        return [root.innerWidth, root.innerHeight];
    }

    function onResize() {
        var size = getWindowSize();
        this.display.setOptions({fontSize: this.display.computeFontSize(size[0], size[1])});        
    }

    var game = {
        display: null,
    
        init: function() {
            var size = getWindowSize();
            this.display = new ROT.Display();
            this.display.setOptions({fontSize: this.display.computeFontSize(size[0] - 10, size[1] - 10)});

            root.addEventListener("resize", onResize.bind(this) )
                                                        
            document.body.appendChild(this.display.getContainer());

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

        drawMonster: function(monster) {
            this.display.draw(monster.location.x, monster.location.y, monster.symbol, monster.color);
        }
    }

    return game;
})(window);

