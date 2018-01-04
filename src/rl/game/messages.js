
var Messages = (function() {
    function Messages(game, top, left, width, height ) {
        this.game = game;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;

        this.emptyMessage = "";
        for ( var i = 0; i < width; ++i ) {
            this.emptyMessage += " ";
        }

        this.messages = [];
    }

    function clearMessagesUI() {
        for ( var i = 0; i < this.height; ++i ){
            this.game.display.drawText(this.left, this.top + i, this.emptyMessage );
        }
    }

    function update() {
        var colors = ["%c{#444466}", "%c{#8888AA}", "%c{#CCCCFF}"];

        clearMessagesUI.call(this);

        for ( var m = 0; m < this.messages.length; ++m ) {
            var color = colors[this.height - this.messages.length + m];
            this.game.display.drawText(this.left, this.top + m, color + this.messages[m] );
        }
    }

    extend(Messages.prototype, {
        clearMessages: function() {
            this.messages.splice(0, this.messages.length);
        },

        addMessage: function(msg) {
            this.messages.push(msg);
            if ( this.messages.length > this.height ) {
                this.messages.splice( 0, this.messages.length - this.height )
            }
            update.call(this);
        }
    });

    return Messages;
})();