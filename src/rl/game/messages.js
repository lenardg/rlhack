///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// messages.js
//
// Handles messages that are displayed at the top of the game area
//
///////////////////////////////////////////////////////////////

function clearMessagesUI() {
    for ( var y = 0; y < this.height; ++y ){
        for (var x = 0; x < this.width; ++x ) {
            this.game.display.draw(x + this.left,y,' ');
        }
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

export class Messages {
    constructor(game, top, left, width, height ) {
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

    clearMessages() {
        this.messages.splice(0, this.messages.length);
    }

    addMessage(msg) {
        this.messages.push(msg);
        if ( this.messages.length > this.height ) {
            this.messages.splice( 0, this.messages.length - this.height )
        }
        update.call(this);
    }
}
