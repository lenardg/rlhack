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

