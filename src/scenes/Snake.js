import Phaser from 'phaser';

let snake;
let food;
let cursors;

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

class SnakeScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'SnakeScene'
        });
    }
    create() {
        const Food = new Phaser.Class({

            Extends: Phaser.Physics.Arcade.Image,

            initialize: function Food(scene, x, y) {
                this.foods = scene.physics.add.group()
                this.food = this.foods.create(x * 16, y * 16, 'Snake:player2_body')

                this.food.setOrigin(0);
                this.total = 0;

                scene.children.add(this);



                // Phaser.Physics.Arcade.Image.call(this, scene)

                // this.setTexture('food');
                // this.setPosition(x * 16, y * 16);
                // this.setOrigin(0);

                // this.total = 0;

                // scene.children.add(this);
            },

            eat: function () {
                this.total++;
            }

        });

        const Snake = new Phaser.Class({

            initialize: function Snake (scene, x, y) {
                this.headPosition = new Phaser.Geom.Point(x, y);

                this.body = scene.physics.add.group();
                this.head.setCollideWorldBounds(true)

                // this.body = scene.add.group();

                this.head = this.body.create(x * 16, y * 16, 'Snake:player1_head').setScale(0.33 * window.devicePixelRatio, 0.3 * window.devicePixelRatio);
                this.head.setOrigin(0.5);
                this.head.setAngle(-90);

                this.alive = true;

                this.speed = 100;

                this.moveTime = 0;

                this.tail = new Phaser.Geom.Point(x, y);

                // Food related
                this.foods = scene.physics.add.group()
                this.food = this.foods.create(3 * 16, 4 * 16, 'Snake:player2_body')

                this.food.setOrigin(0);
                this.total = 0;
                scene.physics.add.overlap(this.head, this.food, this.collideWithFood, null, this);

                this.heading = RIGHT;
                this.direction = RIGHT;
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
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, 40);
                        break;

                    case RIGHT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 40);
                        break;

                    case UP:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 30);
                        break;

                    case DOWN:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 30);
                        break;
                }

                this.direction = this.heading;

                //  Update the body segments and place the last coordinate into this.tail
                Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 16, this.headPosition.y * 16, 1, this.tail);

                //  Check to see if any of the body pieces have the same x/y as the head
                //  If they do, the head ran into the body

                var hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

                if (hitBody) {
                    console.log('dead');

                    this.alive = false;

                    return false;
                }
                else {
                    //  Update the timer ready for the next movement
                    this.moveTime = time + this.speed;

                    return true;
                }
            },

            grow: function () {
                var newPart = this.body.create(this.tail.x, this.tail.y, 'Snake:player1_body');

                newPart.setOrigin(0);
            },

            collideWithFood: function (head, food) {
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

                    var bx = segment.x / 16;
                    var by = segment.y / 16;

                    try {
                        grid[by][bx] = false;
                    } catch (err) {
                        console.log(err);
                    }
                });
                return grid;
            },

            repositionFood: function () {
                //  First create an array that assumes all positions
                //  are valid for the new piece of food

                //  A Grid we'll use to reposition the food each time it's eaten
                let testGrid = [];

                for (var y = 0; y < 30; y++) {
                    testGrid[y] = [];

                    for (var x = 0; x < 40; x++) {
                        testGrid[y][x] = true;
                    }
                }

                this.updateGrid(testGrid);

                //  Purge out false positions
                var validLocations = [];

                for (var y = 0; y < 30; y++) {
                    for (var x = 0; x < 40; x++) {
                        if (testGrid[y][x] === true) {
                            //  Is this position valid for food? If so, add it here ...
                            validLocations.push({ x: x, y: y });
                        }
                    }
                }

                if (validLocations.length > 0) {
                    //  Use the RNG to pick a random food position
                    var pos = Phaser.Math.RND.pick(validLocations);
                    console.log(snake)

                    //  And place it
                    snake.food.setPosition(pos.x * 16, pos.y * 16);

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
