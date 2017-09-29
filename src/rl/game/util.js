
function extend(original, extension) {
    for ( var i in extension ) {
        if ( extension.hasOwnProperty(i)) {
            original[i] = extension[i];
        }
    }
}