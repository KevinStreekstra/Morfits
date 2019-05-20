import Phaser from 'phaser';
import { withDPI } from '../helpers';

let snake;
let main_body;
let food;
let cursors;

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const withOffset = (original) => original + withDPI(127);

class SnakeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'SnakeScene',
            physics: {
                default: 'arcade',
                arcade: {
                    x: 0,
                    y: withDPI(127),
                    gravity: { y: 0 },
                    debug: true,
                    width: withDPI(375),
                    height: withDPI(475)
                }
            },
        });
    }
    create() {
        const Snake = new Phaser.Class({
            initialize: function Snake(scene, x, y) {
                // Game variables
                this.alive = true;
                this.speed = 100;
                this.moveTime = 0;
                this.total = 0;
                this.score = 0;
                this.scoreText = scene.add
                    .text(
                        withDPI(16),
                        withDPI(84),
                        `Huidige score: ${this.score}`,
                        {
                            fontFamily: 'BubblegumSans',
                            fontSize: '24px',
                            color: '#fff',
                            align: 'left'
                        }
                    ).setScale(withDPI(1), withDPI(1))

                // Start defining the snake
                this.headPosition = new Phaser.Geom.Point(12.5, 12.5);

                // Create a physics group that will contain the head and all snake heads.
                this.body = scene.physics.add.group();

                // Create the head.
                this.head = this.body
                    .create(
                        x * 25,
                        withOffset(y * 25),
                        'Snake:player1_head'
                    )
                    .setScale(withDPI(0.33), withDPI(0.33));

                this.head.setOrigin(0.5);
                this.head.setAngle(-90);
                this.head.setDepth(10);

                this.tail = new Phaser.Geom.Point(12.5, 12.5);
                main_body = this.body

                // Define the initial food.
                this.foods = scene.physics.add.group()
                this.food = this.foods
                    .create(
                        3 * 25,
                        withOffset(4 * 25),
                        'Snake:player2_body'
                    )
                    .setScale(withDPI(1), withDPI(1))

                this.food.setOrigin(0);

                // Add the listener for overlap, this allows us to easily handle what happens if these 2 objects touch.
                scene.physics.add.overlap(this.head, this.food, this.collideWithFood, null, this);


                // Variables to define the direction of the snake.
                this.heading = RIGHT;
                this.direction = RIGHT;

                // Add background grid
                this.background = scene.add
                    .image(0, withDPI(127), 'Snake:board_background')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .setDepth(-1);
            },

            update: function (time) {
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            },

            faceLeft: function () {
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = LEFT;
                    this.head.setAngle(90);
                }
            },

            faceRight: function () {
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = RIGHT;
                    this.head.setAngle(-90);
                }
            },

            faceUp: function () {
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = UP;
                    this.head.setAngle(180);
                }
            },

            faceDown: function () {
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = DOWN;
                    this.head.setAngle(0);
                }
            },

            move: function (time) {
                /**
                * Based on the heading property (which is the direction the pgroup pressed)
                * we update the headPosition value accordingly.
                *
                * The Math.wrap call allow the snake to wrap around the screen, so when
                * it goes off any of the sides it re-appears on the other.
                */
                switch (this.heading) {
                    case LEFT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 30);
                        break;

                    case RIGHT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 30);
                        break;

                    case UP:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 38);
                        break;

                    case DOWN:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 38);
                        break;
                }

                this.direction = this.heading;

                //  Update the body segments and place the last coordinate into this.tail
                Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 25, (this.headPosition.y * 25) + withDPI(127), 1, this.tail);

                //  Check to see if any of the body pieces have the same x/y as the head
                //  If they do, the head ran into the body

                var hitBody = Phaser.Actions
                    .GetFirst(
                        this.body.getChildren(),
                        {
                            x: this.head.x,
                            y: this.head.y
                        },
                        1
                    );

                if (hitBody) {
                    console.log('dead');

                    this.alive = false;

                    return false;
                }
                else {
                    //  Update the timer ready for the next movement
                    this.moveTime = time + this.speed;

                    // Update the score
                    this.score = Math.floor((this.moveTime / 500) + (this.total * 100));
                    // Make the score visible to the user.
                    this.scoreText.setText(`Huidige score: ${this.score}`);

                    return true;
                }
            },

            grow: function () {
                const newPart = this.body
                    .create(this.tail.x, this.tail.y, 'Snake:player1_body')
                    .setScale(withDPI(0.5), withDPI(0.5));

                newPart.setOrigin(0.5);
            },

            collideWithFood: function (head, food) {
                food.disableBody(true, true);
                this.grow();

                this.repositionFood();

                this.total++;

                if (this.speed > 20 && this.total % 5 === 0) {
                    this.speed -= 5;
                }
                return false
            },

            updateGrid: function (grid) {
                //  Remove all body pieces from valid positions list
                this.body.children.each(function (segment) {

                    var bx = Math.floor(segment.x / 25);
                    var by = Math.floor(segment.y / 25);

                    try {
                        grid[by][bx] = false;
                    } catch (err) {
                        console.log({ bx, by, err });
                    }
                });
                return grid;
            },

            repositionFood: function () {
                //  First create an array that assumes all positions
                //  are valid for the new piece of food

                //  A Grid we'll use to reposition the food each time it's eaten
                let testGrid = [];

                for (var y = 0; y < 29; y++) {
                    testGrid[y] = [];

                    for (var x = 0; x < 29; x++) {
                        testGrid[y][x] = true;
                    }
                }

                this.updateGrid(testGrid);

                //  Purge out false positions
                var validLocations = [];

                for (var y = 0; y < 29; y++) {
                    for (var x = 0; x < 29; x++) {
                        if (testGrid[y][x] === true) {
                            //  Is this position valid for food? If so, add it here ...
                            validLocations.push({ x: x, y: y });
                        }
                    }
                }

                if (validLocations.length > 0) {
                    //  Use the RNG to pick a random food position
                    var pos = Phaser.Math.RND.pick(validLocations);

                    //  And place it
                    snake.food.setPosition(pos.x * 25, withOffset(pos.y * 25));
                    snake.food.disableBody(false, false)

                    return true;
                }
                else {
                    return false;
                }
            }
        });

        snake = new Snake(this, 8, 8);

        //  Create our keyboard controls
        cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        if (!snake.alive)   {
            return;
        }
        this.physics.world.wrap(main_body, 32);

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */
        if (cursors.left.isDown) {
            snake.faceLeft();
        }
        else if (cursors.right.isDown) {
            snake.faceRight();
        }
        else if (cursors.up.isDown) {
            snake.faceUp();
        }
        else if (cursors.down.isDown) {
            snake.faceDown();
        }

        if (snake.update(time)) {
            //  If the snake updated, we need to check for collision
        }
    }
}

export default SnakeScene;
