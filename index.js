// game constants & variables
let input_dir = { x: 0, y: 0 };     // made object, initially snake not moving
const food_sound = new Audio("food.mp3");
const game_over_sound = new Audio("game_over.mp3");
let score = 0;
let speed = 8;
let lastPaintTime = 0;
let snake_arr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };


// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed)     // 0.5s
    { return; }
    lastPaintTime = ctime;
    game_engine();
}

function isCollide(snake) {
    // if snake bump into itself
    for (let i = 1; i < snake_arr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if snake bump into the wall
    if (snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true;
    }

    return false;
}
function game_engine() {
    // part-1: updating the snake array
    if (isCollide(snake_arr)) {
        game_over_sound.play();
        input_dir = { x: 0, y: 0 };
        alert("Game Over, press ok to restart the game");
        window.location.reload();
        snake_arr =
            [{ x: 13, y: 15 }];
        score = 0;
    }
    // if you have eaten the food, increment the score and regenerate the food.
    if (snake_arr[0].y === food.y && snake_arr[0].x === food.x) {
        // food_sound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML = "High Score: " + highscoreval;
        }
        scorebox.innerHTML = "Score: " + score;
        snake_arr.unshift({ x: snake_arr[0].x + input_dir.x, y: snake_arr[0].y + input_dir.y });
        let a = 2, b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // moving the snake
    for (let i = snake_arr.length - 2; i >= 0; i--) {
        // const element = snake_arr[i];
        snake_arr[i + 1] = { ...snake_arr[i] };

    }
    snake_arr[0].x += input_dir.x;
    snake_arr[0].y += input_dir.y;

    // part-2: display the snake & food
    // displaying the snake:
    board.innerHTML = "";
    snake_arr.forEach((elem, index) => {
        snake_elem = document.createElement("div");
        snake_elem.style.gridRowStart = elem.y;
        snake_elem.style.gridColumnStart = elem.x;
        if (index === 0) {
            snake_elem.classList.add('head');
        }
        else {
            snake_elem.classList.add('snake');
        }
        board.appendChild(snake_elem);
    });
    // displaying the food:
    food_elem = document.createElement("div");
    food_elem.style.gridRowStart = food.y;
    food_elem.style.gridColumnStart = food.x;
    food_elem.classList.add('food');
    board.appendChild(food_elem);

}

// main logic
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
}
else {
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "High Score: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', elem => {

    // start the game when player press any key
    input_dir = { x: 0, y: 1 };
    if (elem.key === "ArrowUp") {
        key_up();
    }
    else if (elem.key === "ArrowDown") {
        key_down();
    }
    else if (elem.key === "ArrowLeft") {
        key_left();
    }
    else if (elem.key === "ArrowRight") {
        key_right();
    }
    else {
    }

});
// snake movement methods
function key_up() {
    input_dir.x = 0;
    input_dir.y = -1;
}
function key_down() {
    input_dir.x = 0;
    input_dir.y = 1;
}
function key_left() {
    input_dir.x = -1;
    input_dir.y = 0;
}
function key_right() {
    input_dir.x = 1;
    input_dir.y = 0;
}