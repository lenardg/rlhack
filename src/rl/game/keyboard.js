var keyboard = {
    keymap: {},
    init: function() {
        var that = this;

        var body = document.getElementsByTagName("body")[0];
        body.addEventListener("keydown", function(e) {
            if ( !!that.keymap[e.keyCode] ) {
                that.keymap[e.keyCode]();
            }
        });
        body.focus();
    },

    map: function(key, fn) {
        this.keymap[key] = fn;
    },

    unmap: function(key) {
        if ( this.keymap.hasOwnProperty(key) ) {
            this.keymap[key] = undefined;
        }
    }
};