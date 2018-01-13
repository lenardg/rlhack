import { ITEMS } from "./maps";

export class Inventory {
    constructor(display, items) {
        this.display = display;
        this.y = 5;
        this.width = 20;
        this.items = items;
        this.show();
    }

    show() {
        this.display.drawText(2, this.y, "-= INVENTORY =-");
        this.items.forEach(this.drawItem.bind(this));
        this.visible = true;
    }

    drawItem(item, i) {
        const icon = this.getIcon(item.key);
        this.display.drawText(icon ? 1 : 3, this.y + 2 + i, `${icon} ${item.name}`);
    }

    getIcon(key) {
        return ITEMS[key] && ITEMS[key].key || '';
    }

    hide() {
        for (var i = 0; i < 2 + this.items.length; i++) {
            for (var j = 0; j < this.width; j++) {
                this.display.draw(j, this.y + i, " ");
            }
        }
        this.visible = false;
    }
}