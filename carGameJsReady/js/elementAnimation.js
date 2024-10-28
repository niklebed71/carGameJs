/// Using elementAnimation() we move objects every time the image is reloaded.
// We track that the element does not go beyond the screen,when it happen,
//  we return element to a random place at the top of the screen.
function elementAnimation(elem,elemInfo,speed,elemInitialYCoord) {
    let newYCoord = elemInfo.coords.y + speed;
    let newXCoord = elemInfo.coords.x;

    if (newYCoord > window.innerHeight) {

    newYCoord = elemInitialYCoord; 
    const direction = parseInt(Math.random() * 2);
    const maxXCoord = (roadWidth + 1 - elemInfo.width);
    const randomXCoord = parseInt(Math.random() * maxXCoord);

    if(!elemInfo.ignoreAppearance){ //the initial value is false, but we need the value to be true here, so we put !
    elem.style.display = "initial"; //show the element as it appears on top
    elemInfo.visible = true;
        }

    newXCoord = direction === 0
    ? -randomXCoord
    : randomXCoord;
    }     
    
    elemInfo.coords.x = newXCoord;
    elemInfo.coords.y = newYCoord;
    elem.style.transform = `translate(${newXCoord}px, ${newYCoord}px)`;    
}