///////////////////////////////////////////////////////////////
//
// Devisioona rlhack // roguelike hackathon 2018
// util.js
//
// Utility functions
//
///////////////////////////////////////////////////////////////

export function extend(original, extension) {
    for ( var i in extension ) {
        if ( extension.hasOwnProperty(i)) {
            original[i] = extension[i];
        }
    }
}

export function compareLocation(loc1,loc2) {
    return loc1.x === loc2.x && loc1.y === loc2.y;
}

