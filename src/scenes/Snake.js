/**
 * @fileoverview The code for the snake game, this file handles all the logic required and the multiplayer aspect of the snake game.
 *
 * @since 20 May 2019
 * @author Yannick Frisart
 */

import Phaser from 'phaser';
import { withDPI } from '../helpers';
import SwipeListener from 'swipe-listener';

let snake;
let main_body;
let main_soda;
let cursors;
let main_socket;
let main_scene;
let snakeSelf;
let main_others

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

const withOffset = (original) => original + withDPI(127);

let direction;

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

        const gameCanvas = document.querySelector('#game')
        const listener = SwipeListener(gameCanvas)

        gameCanvas.addEventListener('swipe', (ev) => {
            const directions = ev.detail.directions;

            if (directions.left) {
                direction = 'left'
            } else if (directions.right) {
                direction = 'right'
            } else if (directions.top) {
                direction = 'up'
            } else if (directions.bottom) {
                direction = 'down'
            }
        })
    }

    create() {
        var self = this;
        this.socket = io();
        main_socket = this.socket;

        const ownPlayer = {
            playerId: Phaser.Math.RND.uuid(),
            rotation: -90,
            x: 8,
            y: 8,
            tail: {
                x: 12.5,
                y: 12.5
            },
            tails: 0
        }

        this.socket.emit('joinSnake', ownPlayer)

        const Snake = new Phaser.Class({
            initialize: function Snake(scene, x, y) {
                snakeSelf = this;
                main_scene = scene;

                // Game variables
                this.alive = true;
                this.speed = 100;
                this.moveTime = 0;
                this.total = 0;
                this.score = 0;
                this.scoreModifier = 0;
                this.tails = 0;
                this.lives = 3;

                this.speedText = scene.add.text(withDPI(60), withDPI(120), `Speed: ${this.speed}`, {
                    fontSize: '30px',
                    color: '#fff'
                }).setScale(withDPI(1), withDPI(1))

                // Text to show the score to the user.
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

                // Define code for other players
                this.otherPlayers = {};

                /* SECTION CreateOwnPlayer */
                // Start defining the snake
                this.headPosition = new Phaser.Geom.Point(12.5, 12.5);


                // Create a physics group that will contain the head and all snake heads.
                this.body = scene.physics.add.group();

                // Create the head.
                this.head = this.body
                    .create(
                        x * withDPI(12.5),
                        withOffset(y * withDPI(12.5)),
                        'Snake:player1_head'
                    )
                    .setScale(withDPI(0.33), withDPI(0.33));

                this.head.setOrigin(0.5);
                this.head.setAngle(-90);
                this.head.setDepth(10);

                this.tail = new Phaser.Geom.Point(12.5, 12.5);
                main_body = this.body

                /* !SECTION CreateOwnPlayer */

                // Define the initial food.
                this.foods = scene.physics.add.group()

                /* SECTION Define foods */

                /* ANCHOR Apple */
                this.apple = this.foods
                    .create(3 * withDPI(12.5), withOffset(4 * withDPI(12.5)), 'Snake:apple')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .setName('Apple');

                /* ANCHOR Pineapple */
                this.pineapple = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:pineapple')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .disableBody(true, true)
                    .setName('Pineapple');

                /* ANCHOR Hamburger */
                this.hamburger = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:hamburger')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .disableBody(true, true)
                    .setName('Hamburger');

                /* ANCHOR Soda */
                this.soda = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:soda')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .disableBody(true, true)
                    .setName('Soda');

                main_soda = this.soda

                /* ANCHOR Lemon */
                this.lemon = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:lemon')
                    .setScale(withDPI(0.333), withDPI(0.333))
                    .setOrigin(0)
                    .disableBody(true, true)
                    .setName('Lemon');

                /* !SECTION Define foods */

                /* ANCHOR Define physics overlaps. */
                scene.physics.add.overlap(this.head, this.apple, this.eatApple, null, this);
                scene.physics.add.overlap(this.head, this.pineapple, this.eatPineapple, null, this);
                scene.physics.add.overlap(this.head, this.hamburger, this.eatHamburger, null, this);
                scene.physics.add.overlap(this.head, this.lemon, this.eatLemon, null, this);
                scene.physics.add.overlap(this.head, this.soda, this.drinkSoda, null, this);

                // Variables to define the direction of the snake.
                this.heading = RIGHT;
                this.direction = RIGHT;

                // Define change percentages
                this.healthyFood = [];
                for (let i = 0; i < 4; i++) {
                    this.healthyFood.push(this.pineapple);
                }

                for (let i = 0; i < 1; i++) {
                    this.healthyFood.push(this.lemon);
                }

                this.notHealthy = [];
                for (let i = 0; i < 4; i++) {
                    this.notHealthy.push(this.hamburger);
                }

                for (let i = 0; i < 3; i++) {
                    this.notHealthy.push(this.soda);
                }

                /* SECTION UI elements. */
                this.background = scene.add
                    .image(0, withDPI(127), 'Snake:board_background')
                    .setDisplaySize(withDPI(375), withDPI(475))
                    .setOrigin(0)
                    .setDepth(-1);

                this.backgroundTop = scene.add
                    .image(0, withDPI(60), 'Snake:background_top')
                    .setDisplaySize(withDPI(375), withDPI(67))
                    .setOrigin(0)
                    .setDepth(-2);

                this.backgroundBottom = scene.add
                    .image(0, withDPI(602), 'Snake:background_bottom')
                    .setDisplaySize(withDPI(375), withDPI(116))
                    .setOrigin(0)
                    .setDepth(-2);

                /* !SECTION UI elements. */

                /* SECTION Multiplayer listeners */
                const createPlayer = this.createSecondPlayer

                /**
                 * @description Place all the current players in the field.
                 */
                main_socket.on('currentPlayers', function (players) {
                    Object.keys(players).forEach(function (id) {
                        if (players[id].playerId !== ownPlayer.playerId) {
                            const { playerId } = players[id]
                            createPlayer(players[id], scene)
                        }
                    });
                });

                /**
                 * @description Creates a new snake if a new player joins.
                 */
                main_socket.on('newPlayer', function (playerInfo) {
                    createPlayer(playerInfo, scene)
                  });

                /**
                 * @description Handle a user leaving the game.
                 */
                main_socket.on('disconnected', function (playerInfo) {
                    const otherPlayer = snakeSelf.otherPlayers[playerInfo.playerId];
                    otherPlayer.body.clear(true, true)
                  });

                /**
                 * @description Handle other playing changing direction
                 */
                main_socket.on('playerChangedDirection', (playerInfo) => {
                    const otherPlayer = snakeSelf.otherPlayers[playerInfo.playerId];
                    otherPlayer.head.setAngle(playerInfo.rotation)
                });

                /**
                 * @description Handle other player growing in size.
                 */
                main_socket.on('playerGrew', function (playerInfo) {
                    const otherPlayer = snakeSelf.otherPlayers[playerInfo.playerId];

                    const bodyElement = otherPlayer.body
                        .create(200, 200, 'Snake:player2_body')
                        .setScale(withDPI(0.5), withDPI(0.5));

                    bodyElement.setOrigin(0.5);
                })

                /**
                 * @description Handle other player shrinking in size.
                 */
                main_socket.on('playerShrank', function (playerInfo) {
                    const otherPlayer = snakeSelf.otherPlayers[playerInfo.playerId]

                    if (otherPlayer.body.children.size > 1) {
                        otherPlayer.body.remove(otherPlayer.body.getLast(true), true, true);
                    }
                })

                /**
                 * @description Handle other player moving.
                 */
                main_socket.on('playerPositionChanged', function (playerInfo) {
                    let otherPlayer = snakeSelf.otherPlayers[playerInfo.playerId];
                    otherPlayer.head.enableBody(false);
                    otherPlayer.head.setVisible(true);
                    otherPlayer.headPosition.x = playerInfo.x;
                    otherPlayer.headPosition.y = playerInfo.y;

                    Phaser.Actions
                        .ShiftPosition(
                            otherPlayer.body.getChildren(),
                            otherPlayer.headPosition.x * withDPI(12.5),
                            (otherPlayer.headPosition.y * withDPI(12.5)) + withDPI(127),
                            1,
                            otherPlayer.tail
                        );
                })

                /* ANCHOR Multiplayer - sync food */
                /**
                 * @description Sync food with the other clients.
                 */
                main_socket.on('repositionAllItems', function (itemInfo) {
                    snakeSelf.pineapple.disableBody(true, true);
                    snakeSelf.lemon.disableBody(true, true);
                    snakeSelf.hamburger.disableBody(true, true);
                    snakeSelf.soda.disableBody(true, true);

                    // Reposition the apple
                    snakeSelf.apple.setPosition(
                        itemInfo.applePosition.x * withDPI(12.5),
                        withOffset(itemInfo.applePosition.y * withDPI(12.5))
                    );
                    snakeSelf.apple.enableBody(false);


                    // Place the healthy item
                    if (itemInfo.healthy.visible) {
                        let foundItem = false;
                        let healthyItem;

                        switch (itemInfo.healthy.name) {
                            case 'Apple':
                                healthyItem = snakeSelf.apple
                                foundItem = true
                                break;

                            case 'Pineapple':
                                healthyItem = snakeSelf.pineapple
                                foundItem = true
                                break;

                            case 'Lemon':
                                healthyItem = snakeSelf.lemon
                                foundItem = true
                                break;
                        }

                        if (foundItem) {
                            healthyItem.setPosition(
                                itemInfo.healthy.pos.x * withDPI(12.5),
                                withOffset(itemInfo.healthy.pos.y * withDPI(12.5))
                            );
                            healthyItem.enableBody(false);
                            healthyItem.setVisible(true);
                        }
                    }

                    // Place the unhealthy item
                    if (itemInfo.unhealthy.visible) {
                        let foundUnhealthy = false;
                        let unhealthyItem;

                        switch (itemInfo.unhealthy.name) {
                            case 'Soda':
                                unhealthyItem = snakeSelf.soda
                                foundUnhealthy = true
                                break;

                            case 'Hamburger':
                                unhealthyItem = snakeSelf.hamburger
                                foundUnhealthy = true
                                break;
                        }

                        if (foundUnhealthy) {
                            unhealthyItem.setPosition(
                                itemInfo.unhealthy.pos.x * withDPI(12.5),
                                withOffset(itemInfo.unhealthy.pos.y * withDPI(12.5))
                            );
                            unhealthyItem.enableBody(false);
                            unhealthyItem.setVisible(true);
                        }
                    }
                })

                /* ANCHOR Multiplayer - handle other player dying */
                main_socket.on('aPlayerDied', function (playerData) {
                    snakeSelf.playerDiesAnimation(snakeSelf.otherPlayers[playerData.playerId].body)
                })

                /* ANCHOR Multiplayer - handle other player respawning */
                main_socket.on('aPlayerRespawned', function (playerData) {

                })
            /* !SECTION Multiplayer listeners */
            },

            update: function (time) {
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            },

            playerHitOtherPlayer: function () {
                this.onPlayerDead()
            },

            createSecondPlayer: function (playerInfo, scene) {
                const { playerId } = playerInfo;
                snakeSelf.otherPlayers[playerId] = {};
                const secondPlayer = snakeSelf.otherPlayers[playerId];
                secondPlayer.headPosition = new Phaser.Geom.Point(12.5, 12.5);
                secondPlayer.body = scene.physics.add.group();

                secondPlayer.head = secondPlayer.body
                    .create(
                        12 * 25,
                        withOffset(12 * 25),
                        'Snake:player1_head'
                    )
                    .setScale(withDPI(0.33), withDPI(0.33))
                    .disableBody(true, true);

                secondPlayer.head.setOrigin(0.5);
                secondPlayer.head.setAngle(playerInfo.rotation);
                secondPlayer.head.setDepth(10);

                secondPlayer.tail = new Phaser.Geom.Point(12.5, 12.5);
                secondPlayer.tails = playerInfo.tails;

                scene.physics.add.collider(snakeSelf.head, secondPlayer.body, snakeSelf.playerHitOtherPlayer, null, snakeSelf)

                while (playerInfo.tails + 1 > secondPlayer.body.getLength()) {
                    const bodyElement = secondPlayer.body
                        .create(200, 200, 'Snake:player2_body')
                        .setScale(withDPI(0.5), withDPI(0.5));

                    bodyElement.setOrigin(0.5);
                }
            },

            faceLeft: function () {
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = LEFT;
                    this.head.setAngle(90);
                    main_socket.emit('directionChange', {
                        playerId: ownPlayer.playerId,
                        rotation: 90
                    })
                }
            },

            faceRight: function () {
                if (this.direction === UP || this.direction === DOWN) {
                    this.heading = RIGHT;
                    this.head.setAngle(-90);
                    main_socket.emit('directionChange', {
                        playerId: ownPlayer.playerId,
                        rotation: -90
                    })
                }
            },

            faceUp: function () {
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = UP;
                    this.head.setAngle(180);
                    main_socket.emit('directionChange', {
                        playerId: ownPlayer.playerId,
                        rotation: 180
                    })
                }
            },

            faceDown: function () {
                if (this.direction === LEFT || this.direction === RIGHT) {
                    this.heading = DOWN;
                    this.head.setAngle(0);
                    main_socket.emit('directionChange', {
                        playerId: ownPlayer.playerId,
                        rotation: 0
                    })
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
                        main_socket.emit('playerMovement', {
                            playerId: ownPlayer.playerId,
                            x: this.headPosition.x,
                            y: this.headPosition.y
                        })
                        break;

                    case RIGHT:
                        this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, 30);
                        main_socket.emit('playerMovement', {
                            playerId: ownPlayer.playerId,
                            x: this.headPosition.x,
                            y: this.headPosition.y
                        })
                        break;

                    case UP:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, 38);
                        main_socket.emit('playerMovement', {
                            playerId: ownPlayer.playerId,
                            x: this.headPosition.x,
                            y: this.headPosition.y
                        })
                        break;

                    case DOWN:
                        this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, 38);
                        main_socket.emit('playerMovement', {
                            playerId: ownPlayer.playerId,
                            x: this.headPosition.x,
                            y: this.headPosition.y
                        })
                        break;
                }

                this.direction = this.heading;

                //  Update the body segments and place the last coordinate into this.tail
                Phaser.Actions
                    .ShiftPosition(
                        this.body.getChildren(),
                        this.headPosition.x * withDPI(12.5),
                        (this.headPosition.y * withDPI(12.5)) + withDPI(127),
                        1,
                        this.tail
                );

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

                    this.onPlayerDead()

                    return false;
                }
                else {
                    //  Update the timer ready for the next movement
                    this.moveTime = time + this.speed;

                    // Update the score
                    this.score = Math.floor((this.moveTime / 500) + (this.total * 100)) + this.scoreModifier;
                    // Make the score visible to the user.
                    this.scoreText.setText(`Huidige score: ${this.score}`);
                    this.speedText.setText(`Speed: ${this.speed}`);

                    return true;
                }
            },

            grow: function () {
                const newPart = this.body
                    .create(this.tail.x, this.tail.y, 'Snake:player1_body')
                    .setScale(withDPI(0.5), withDPI(0.5));

                newPart.setOrigin(0.5);

                ownPlayer.tails += 1

                main_socket.emit('snakeGrow', {
                    playerId: ownPlayer.playerId,
                    tails: ownPlayer.tails
                })
            },

            /**
             * @description Shrink the snake by 1.
             */
            shrink: function () {
                if (this.body.children.size > 1) {
                    this.body.remove(this.body.getLast(true), true, true);
                    ownPlayer.tails -= 1
                }

                main_socket.emit('snakeShrink', {
                    playerId: ownPlayer.playerId,
                    tails: ownPlayer.tails
                })
            },

            /**
             * @description Handles changing the speed depending on the current total.
             */
            handleSpeedIncrease: function () {
                if (this.speed > 20 && this.total % 5 === 0) {
                    this.speed -= 5;
                }
            },

            /**
             * @summary Function that handles the player eating a apple.
             *
             * @param {Phaser.GameObjects.GameObject} head
             * @param {Phaser.GameObjects.GameObject} apple
             *
             * @description This function does the following:
             * Disables collision with the apple so it can only be eaten once.
             * Makes the snake grow with 1.
             * Increases the score with 100.
             *
             * @fires this.grow
             * @fires this.repositionItems
             * @fires this.handleSpeedIncrease
             */
            eatApple: function (head, apple) {
                apple.disableBody(true, false);
                this.total++;

                const scoreText = main_scene.add.text(apple.x, apple.y, '+100', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#257934',
                    align: 'center'
                }).setScale(withDPI(1), withDPI(1)).setAngle(-14).setDepth(12)

                setTimeout(() => {
                    scoreText.destroy()
                }, 1000)

                this.grow();
                this.repositionItems();
                this.handleSpeedIncrease();
            },

            /**
             * @summary Function that handles the player eating the pinapple.
             * @param {Phaser.GameObjects.GameObject} head
             * @param {Phaser.GameObjects.GameObject} pineapple
             *
             * @description This function does the following:
             * Disabled collision with the pinapple
             * Grows the body with 1
             * Increases total with 1
             * Adds 100 extra points to the score.
             *
             * @fires this.grow
             * @fires this.repositionItems
             * @fires this.handleSpeedIncrease
             */
            eatPineapple: function (head, pineapple) {
                pineapple.disableBody(true, true);
                this.total++;
                this.scoreModifier += 100;

                const scoreText = main_scene.add.text(pineapple.x, pineapple.y, '+200', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#257934',
                    align: 'center'
                }).setScale(withDPI(1), withDPI(1)).setAngle(-14).setDepth(12)

                setTimeout(() => {
                    scoreText.destroy()
                }, 1000)

                this.grow();
                this.repositionItems();
                this.handleSpeedIncrease();
            },

            /**
             * @summary Function that handles the user eating a hamburger.
             * @param {Phaser.GameObjects.GameObject} head
             * @param {Phaser.GameObjects.GameObject} hamburger
             *
             * @description This function does the following:
             * Grows the snake by 2.
             * Removes 150 points from the score.
             *
             * @fires this.grow
             * @fires this.repositionItems
             */
            eatHamburger: function (head, hamburger) {
                hamburger.disableBody(true, true);
                this.scoreModifier -= 150;

                const scoreText = main_scene.add.text(hamburger.x, hamburger.y, '-150', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#9a001c',
                    align: 'center'
                }).setScale(withDPI(1), withDPI(1)).setAngle(-14).setDepth(12)

                setTimeout(() => {
                    scoreText.destroy()
                }, 1000)

                this.grow();
                this.grow();
                this.repositionItems();
            },

            /**
             * @summary Function that handles the user drinking soda.
             * @param {Phaser.GameObjects.GameObject} head
             * @param {Phaser.GameObjects.GameObject} soda
             *
             * @description This function does the following:
             * Remove 50 points from the score.
             * Grow body with 1.
             * Make the snake move faster.
             *
             * @fires this.grow
             * @fires this.repositionItems
             */
            drinkSoda: function (head, soda) {
                soda.disableBody(true, true);
                this.scoreModifier -= 50;

                const scoreText = main_scene.add.text(soda.x, soda.y, '-50', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#9a001c',
                    align: 'center'
                }).setScale(withDPI(1), withDPI(1)).setAngle(-14).setDepth(12)

                setTimeout(() => {
                    scoreText.destroy()
                }, 1000)

                this.grow();
                this.repositionItems();

                if (this.speed > 20) {
                    const prevSpeed = this.speed;
                    this.speed = 20;

                    setTimeout(() => {
                        this.speed = prevSpeed;
                    }, 2000)
                }
            },

            /**
             * @summary Handles the user eating a lemon.
             * @param {Phaser.GameObjects.GameObject} head
             * @param {Phaser.GameObjects.GameObject} lemon
             *
             * @description This function does the following:
             * Increase score with 50.
             * Shrink body with 1.
             *
             * @fires this.shrink
             * @fires this.repositionItems
             *
             */
            eatLemon: function (head, lemon) {
                lemon.disableBody(true, true);
                this.scoreModifier += 50;

                const scoreText = main_scene.add.text(lemon.x, lemon.y, '+50', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#257934',
                    align: 'center'
                }).setScale(withDPI(1), withDPI(1)).setAngle(-14).setDepth(12)

                setTimeout(() => {
                    scoreText.destroy()
                }, 1000)

                this.shrink();
                this.repositionItems();
            },

            updateGrid: function (grid) {
                //  Remove all body pieces from valid positions list
                this.body.children.each(function (segment) {

                    var bx = Math.floor(segment.x / withDPI(12.5));
                    var by = Math.floor(segment.y / withDPI(12.5));

                    try {
                        grid[by][bx] = false;
                    } catch (err) {
                        console.warn({ bx, by, err });
                    }
                });
                return grid;
            },

            repositionItems: function () {
                let testGrid = [];

                /* First we assume all blocks are safe */
                for (let y = 0; y < 29; y++) {
                    testGrid[y] = [];

                    for (let x = 0; x < 29; x++) {
                        testGrid[y][x] = true;
                    }
                }

                this.updateGrid(testGrid);

                let validLocations = []

                for (let y = 0; y < 29; y++) {
                    for (let x = 0; x < 29; x++) {
                        if (testGrid[y][x] === true) {
                            //  Is this position valid for food? If so, add it here ...
                            validLocations.push({ x, y });
                        }
                    }
                }

                // Place the food
                if (validLocations.length > 0) {
                    // Set all items to be invisible
                    this.pineapple.disableBody(true, true);
                    this.lemon.disableBody(true, true);
                    this.hamburger.disableBody(true, true);
                    this.soda.disableBody(true, true);

                    //  Use the RNG to pick a random food position
                    const applePos = Phaser.Math.RND.pick(validLocations);
                    const healthyPos = Phaser.Math.RND.pick(validLocations);
                    const unHealthyPos = Phaser.Math.RND.pick(validLocations);

                    // Pick 2 random extra's.
                    const healthy = Phaser.Utils.Array.GetRandom(this.healthyFood);
                    const unHealthy = Phaser.Utils.Array.GetRandom(this.notHealthy);

                    // Should the following update
                    const showHealthy = Math.random() >= 0.5;
                    const showUnhealthy = Math.random() >= 0.5

                    // Tell socket to reposition the items.
                    main_socket.emit('repositionItems', {
                        applePosition: applePos,
                        healthy: {
                            visible: showHealthy,
                            pos: healthyPos,
                            name: healthy.name
                        },
                        unhealthy: {
                            visible: showUnhealthy,
                            pos: unHealthyPos,
                            name: unHealthy.name
                        }
                    })

                    // Reposition the apple
                    this.apple.setPosition(applePos.x * withDPI(12.5), withOffset(applePos.y * withDPI(12.5)));
                    this.apple.enableBody(false);


                    // Place the healthy item
                    if (showHealthy) {
                        healthy.setPosition(healthyPos.x * withDPI(12.5), withOffset(healthyPos.y * withDPI(12.5)));
                        healthy.enableBody(false);
                        healthy.setVisible(true);
                    }

                    // Place the unhealthy item
                    if (showUnhealthy) {
                        unHealthy.setPosition(unHealthyPos.x * withDPI(12.5), withOffset(unHealthyPos.y * withDPI(12.5)));
                        unHealthy.enableBody(false);
                        unHealthy.setVisible(true);
                    }


                    return true;
                }
                else {
                    return false;
                }

            },

            /* SECTION Player dies */
            onPlayerDead: function () {
                snakeSelf.alive = false
                snakeSelf.lives -= 1

                this.playerDiesAnimation(main_body)
                main_socket.emit('playerDied', {
                    playerId: ownPlayer.playerId
                })
            },

            playerDiesAnimation: function (playerElement) {
                setTimeout(() => {
                    playerElement.toggleVisible()

                    setTimeout(() => {
                        playerElement.toggleVisible()

                        setTimeout(() => {
                            playerElement.toggleVisible()

                            setTimeout(() => {
                                playerElement.toggleVisible()

                                setTimeout(() => {
                                    playerElement.toggleVisible()
                                    playerElement.clear(true, true)
                                }, 300)
                            }, 300)
                        }, 300)
                    }, 300)
                }, 300)
            },

            playerRespawn: function () {
                snakeSelf.body = scene.physics.add.group();

                snakeSelf.head = snakeSelf.body
                    .create(
                        30 * withDPI(12.5),
                        withOffset(30 * withDPI(12.5)),
                        'Snake:player1_head'
                    )
                    .setScale(withDPI(0.33), withDPI(0.33));

                snakeSelf.head.setOrigin(0.5);
                snakeSelf.head.setAngle(-90);
                snakeSelf.head.setDepth(10);

                snakeSelf.speed = 95;

                socket.emit('playerRespawned', {
                    playerId: ownPlayer.playerId,
                    tails: 0,

                })
            },

            playerRespawnOther: function (playerInfo) {
                const secondPlayer = snakeSelf.otherPlayers[playerInfo.playerId]

                secondPlayer.body = scene.physics.add.group();

                secondPlayer.head = secondPlayer.body
                    .create(
                        30 * withDPI(12.5),
                        withOffset(30 * withDPI(12.5)),
                        'Snake:player1_head'
                    )
                    .setScale(withDPI(0.33), withDPI(0.33));

                secondPlayer.head.setOrigin(0.5);
                secondPlayer.head.setAngle(-90);
                secondPlayer.head.setDepth(10);
                secondPlayer.tails = playerInfo.tails
            }
            /* !SECTION Player dies */
        });

        snake = new Snake(
            this,
            20,
            20
        );

        //  Create our keyboard controls
        cursors = this.input.keyboard.createCursorKeys();
    }

    update (time, delta) {
        if (!snake.alive)   {
            return;
        }

        this.physics.world.wrap(main_body, 32);
        this.physics.world.wrap(main_soda, 32);

    /**
    * Check which key is pressed, and then change the direction the snake
    * is heading based on that. The checks ensure you don't double-back
    * on yourself, for example if you're moving to the right and you press
    * the LEFT cursor, it ignores it, because the only valid directions you
    * can move in at that time is up and down.
    */
        if (cursors.left.isDown || direction === 'left') {
            snake.faceLeft();
        }
        else if (cursors.right.isDown || direction === 'right') {
            snake.faceRight();
        }
        else if (cursors.up.isDown || direction === 'up') {
            snake.faceUp();
        }
        else if (cursors.down.isDown || direction === 'down') {
            snake.faceDown();
        }

        if (snake.update(time)) {
            //  If the snake updated, we need to check for collision
        }
    }
}

export default SnakeScene;
