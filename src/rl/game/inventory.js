export class Inventory {
    constructor(display) {
        this.display = display;
        this.visible = false;
    }

    show() {
        this.display.drawText(4, 4, "* INVENTORY *");
        this.visible = true;
    }

    hide() {
        for (var i = 0; i < 18; i++) {
            this.display.draw(i, 4, " ");
        }
        this.visible = false;
    }
}