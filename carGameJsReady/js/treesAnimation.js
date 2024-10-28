const trees = document.querySelectorAll('.tree');// get all the trees
const treesCoords = [];//we will put the coordinates of all the trees here

for (let i = 0; i < trees.length; i++) {//we get the coordinates of all the trees
    const tree = trees[i];
    const coordsTree = getCoords(tree);
    treesCoords.push(coordsTree);//we put the coordinates of all the trees in treesCoords 
}

function treesAnimation(speed) {
    for (let i = 0; i < trees.length; i++) {//goes through all the trees
        const tree = trees[i];
        const coords = treesCoords[i];//we get the coordinates of each tree
        let newYCoord = coords.y + speed;//move the tree
         if (newYCoord > window.innerHeight) {
            newYCoord = -350;//we return the tree up if it went beyond the bottom of the screen
        } 
        treesCoords[i].y = newYCoord;
        tree.style.transform = `translate(${coords.x}px, ${newYCoord}px)`;   
    }
}