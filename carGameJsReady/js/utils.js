function createElementInfo(element) {
    return {
        coords: getCoords(element),
        height: element.clientHeight,
        width: element.clientWidth / 2,
        visible: true,  //Set true for the counter. If collision
        //change to false in startGame and hide (display = "none"). 
        ignoreAppearance: false,
    };
}

function getCoords(element) {//getting coordinates from transform css.
    const matrix = window.getComputedStyle(element).transform;
    const array = matrix.split(',');
    const y = array[array.length - 1];
    const x = array[array.length - 2];
    const numericY = parseFloat(y);
    const numericX = parseFloat(x);
    return { x: numericX, y: numericY };
}

function hasCollision(elem1Info, elem2Info) {

    const carYTop = elem1Info.coords.y;//get top coordinate car
    const carYBottom = elem1Info.coords.y + elem1Info.height;//get the bottom coordinate car

    const carXLeft = elem1Info.coords.x - elem1Info.width;
    const carXRight = elem1Info.coords.x + elem1Info.width;

    const coinYTop = elem2Info.coords.y;//get top coordinate coin
    const coinYBottom = elem2Info.coords.y + elem2Info.height;//get the bpttom coordinate coin

    const coinXLeft = elem2Info.coords.x - elem2Info.width;
    const coinXRight = elem2Info.coords.x + elem2Info.width;
    //  y
    if ( carYTop > coinYBottom || carYBottom < coinYTop ) {
        return false;
    }
    //  x
    if (carXLeft > coinXRight || carXRight < coinXLeft) {
        return false;
    }
    return true;
}

