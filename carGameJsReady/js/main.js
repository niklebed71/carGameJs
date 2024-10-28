
(function () {
    let isPause = false;
    let animationId = null;

    let speed = 3;
    let score = 0;

    const car = document.querySelector('.car');
    const carInfo = {
        ...createElementInfo(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        },
    };

    const coin = document.querySelector('.coin');
    const coinInfo = createElementInfo(coin);

    const danger = document.querySelector('.danger');
    const dangerInfo = createElementInfo(danger);
     
    const gameScore = document.querySelector('.game-score');
    const gameButton = document.querySelector('.game-button');
    const backdrop = document.querySelector('.backdrop');
   
    const arrow = document.querySelector('.arrow');
    const arrowInfo = createElementInfo(arrow);

//  logic of CAR move
    document.addEventListener('keydown', (event) => {//if keydown event does what is inside{}
        if (isPause) {
            return;
        }
        const code = event.code;

        if (code === 'ArrowUp' && carInfo.move.top === null) {
            if (carInfo.move.bottom) {
                return;
            }
            carInfo.move.top = requestAnimationFrame(carMoveToTop(car, carInfo));
        }
        else if (code === 'ArrowDown' && carInfo.move.bottom === null) {
            if (carInfo.move.top) {
                return;
            }
            carInfo.move.bottom = requestAnimationFrame(carMoveToBottom(car, carInfo));
        }
        else if (code === 'ArrowLeft' && carInfo.move.left === null) {
            if (carInfo.move.right) {
                return;
            }
            carInfo.move.left = requestAnimationFrame(carMoveToLeft(car, carInfo));
        }
        else if (code === 'ArrowRight' && carInfo.move.right === null) {
            if (carInfo.move.left) {
                return;
            }
            carInfo.move.right = requestAnimationFrame(carMoveToRight(car, carInfo));
        }
    }); 
    document.addEventListener('keyup', (event) => {//if keyup event does what is inside {}
        const code = event.code;
        if (code === 'ArrowUp') {
            cancelAnimationFrame(carInfo.move.top);
            carInfo.move.top = null;
        }
        else if (code === 'ArrowDown') {
            cancelAnimationFrame(carInfo.move.bottom);
            carInfo.move.bottom = null;
        }
        else if (code === 'ArrowLeft') {
            cancelAnimationFrame(carInfo.move.left);
            carInfo.move.left = null;
        }
        else if (code === 'ArrowRight') {
            cancelAnimationFrame(carInfo.move.right);
            carInfo.move.right = null;
        }
    });
    animationId = requestAnimationFrame(startGame);

    function startGame() { //the game is looped. At the beginning and end, we call startGame()        
        elementAnimation(danger, dangerInfo, speed, -250);
         if (dangerInfo.visible && hasCollision(carInfo, dangerInfo)) {
//in addition to hasCollision we check dangerInfo.visible. By default it is true when created
//using the createElementInfo function. When hasCollision car and arrow, set
// dangerInfo.visible = false in elementAnimation(arrow, arrowInfo, -600); for 1000 ms
            return finishGame(); // Inside finishGame() we call cancelAnimationFrame(animationId)
//and cancel redrawing of the screen. If we don't put return finishGame(), at the end of this function
//in the line animationId = requestAnimationFrame(startGame) game will not be finished but start again.
        } 

        treesAnimation(speed);

        elementAnimation(coin, coinInfo, speed, -100);
        if (coinInfo.visible && hasCollision(carInfo, coinInfo)) {
        //counter will work if there is a hasCollision and element is visible
            score++;
            gameScore.innerText = score;//insert score into our gameScore counter
             // via innerText which returns the text content of the element
            coin.style.display = 'none';//if hasCollision we hide the coin
            // when it appears on top (see elementAnimation) we show it again
            coinInfo.visible = false;//if hasCollision we make the element invisible.It is for counter.
            
            if (score % 3 === 0) {//this condition up the speed of the car as we collect 3 coins
                speed += 2;
             }
            }

        elementAnimation(arrow, arrowInfo, speed, -600);
        if (arrowInfo.visible && hasCollision(carInfo, arrowInfo)) {
//in condition that the arrow is visible and hasCollision between car and the arrow, we do what is below
            arrow.style.display = 'none';//if hasCollision we hide the arrow
            //when it appears(появление) on top (see elementAnimation()) we show it again
            arrowInfo.visible = false;//if hasCollision we make the element invisible. 
            danger.style.opacity = 0.5;//we make opacity = 0.5 per 1000 mc
            dangerInfo.visible = false//if collision car and arrows,collision danger and car for 1000 mc dont stop game 
            arrowInfo.ignoreAppearance = true;//by default we ignore the appearance (появление) of the arrow
            dangerInfo.ignoreAppearance = true;//by default we ignore the appearance of the danger
            speed += 10;//add 10 to the speed
            //this part returns the variable characteristics after 1000 mc
            setTimeout(() => {// 
                danger.style.opacity = 1;
                speed -= 10; //return the speed to the previous value after 1000 ms
//Problem: we hide and deactivate the arrow when hasCollision (arrowInfo.visible = false;) but when
//appearing (появление) from top it is visible and active again (function elementAnimation  elem.style.display = initial; 
//  elemInfo.visible = true;) we need to ignore this until the time in setTimeout() is over(1000ms)
//for this we will create a variable ignoreAppearance: false in the f. createElementInfo()
                    setTimeout(() => { //inside setTimeout() which delays the execution of commands for 1000ms
                    //we put another setTimeout() which delays the execution of commands for another 500ms
                        dangerInfo.visible = true;//we return the opacity back after 1000 ms
    //but the end of the game (dangerInfo.visible = true) will be work after 1000ms + 500ms
                        arrowInfo.ignoreAppearance = false; 
//after activate danger(dangerInfo.visible = true) we activate the arrow too (arrowInfo.ignoreAppearance = false;) 
                        dangerInfo.ignoreAppearance = false;//and activate the danger itself
                 }, 500);//the subfunction will work for another 500 ms
            }, 1000); //the function will work for 1000 ms
            }
        animationId = requestAnimationFrame(startGame);// restart the game again
    }

    function finishGame() { 
        cancelAnimationFrame(animationId);
        cancelAnimationFrame(carInfo.move.top);
        cancelAnimationFrame(carInfo.move.bottom);
        cancelAnimationFrame(carInfo.move.left);
        cancelAnimationFrame(carInfo.move.right); 
        gameScore.style.display = 'none';//hide the button gameScore
        gameButton.style.display = 'none';//hide the button gameButton
        backdrop.style.display = 'flex';
        const scoreText = backdrop.querySelector('.finish-text-score');
        scoreText.innerText = score;//innerText gets the text from scoreText
    }
    
    gameButton.addEventListener('click', () => {
        isPause = !isPause;// the button stops and starts the game
        if (isPause) {
            cancelAnimationFrame(animationId);
            cancelAnimationFrame(carInfo.move.top);
            cancelAnimationFrame(carInfo.move.bottom);
            cancelAnimationFrame(carInfo.move.left);
            cancelAnimationFrame(carInfo.move.right); 
            gameButton.children[0].style.display = 'none';
            gameButton.children[1].style.display = 'initial';
        }//Depending on whether the button is pressed or not, we change the button image
        else {
            animationId = requestAnimationFrame(startGame);
            gameButton.children[0].style.display = 'initial';
            gameButton.children[1].style.display = 'none';  
        } 
    });

 })();
