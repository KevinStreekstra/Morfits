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
let morfosReward = 0

const possibleNames = [
    'Faith',
    'Reo',
    'Daisy',
    'Mikey',
    'Codie',
    'Laurie',
    'Dale',
    'Dion',
    'Lucca',
    'Kiki',
    'Rico',
    'Hope'
]

const name = localStorage.getItem('username') || Phaser.Math.RND.pick(possibleNames);

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
                    debug: false,
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
                setTimeout(() => {
                    direction = null
                }, 100)
            } else if (directions.right) {
                direction = 'right'
                setTimeout(() => {
                    direction = null
                }, 100)
            } else if (directions.top) {
                direction = 'up'
                setTimeout(() => {
                    direction = null
                }, 100)
            } else if (directions.bottom) {
                direction = 'down'
                setTimeout(() => {
                    direction = null
                }, 100)
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
                x: -50,
                y: -50
            },
            tails: 0,
            ranOutOfLives: false
        }

        this.socket.emit('joinSnake', ownPlayer)

        /* Handles the player reconnecting if they get disconnected. */
        this.socket.on('playerShouldReconnect', function (playerId) {
            if (playerId === ownPlayer.playerId) {
                main_socket.emit('joinSnake', ownPlayer)
            }
        })

        const Snake = new Phaser.Class({
            initialize: function Snake(scene, x, y) {
                snakeSelf = this;
                main_scene = scene;

                // Game variables
                this.alive = true;
                this.lives = 3;
                this.moveTime = 0;
                this.score = 0;
                this.scoreModifier = 0;
                this.speed = 100;
                this.tails = 0;
                this.total = 0;

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

                this.head.setAngle(-90);
                this.head.setDepth(10);
                this.head.setOrigin(0.5);

                this.tail = new Phaser.Geom.Point(12.5, 12.5);
                main_body = this.body

                /* !SECTION CreateOwnPlayer */

                // Define the initial food.
                this.foods = scene.physics.add.group()

                /* SECTION Define foods */

                /* ANCHOR Apple */
                this.apple = this.foods
                    .create(3 * withDPI(12.5), withOffset(4 * withDPI(12.5)), 'Snake:apple')
                    .setName('Apple')
                    .setOrigin(0)
                    .setScale(withDPI(0.333), withDPI(0.333))

                /* ANCHOR Pineapple */
                this.pineapple = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:pineapple')
                    .disableBody(true, true)
                    .setName('Pineapple')
                    .setOrigin(0)
                    .setScale(withDPI(0.333), withDPI(0.333))

                /* ANCHOR Hamburger */
                this.hamburger = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:hamburger')
                    .disableBody(true, true)
                    .setName('Hamburger')
                    .setOrigin(0)
                    .setScale(withDPI(0.333), withDPI(0.333))

                /* ANCHOR Soda */
                this.soda = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:soda')
                    .disableBody(true, true)
                    .setName('Soda')
                    .setOrigin(0)
                    .setScale(withDPI(0.333), withDPI(0.333))

                main_soda = this.soda

                /* ANCHOR Lemon */
                this.lemon = this.foods
                    .create(-200, withOffset(4 * 25), 'Snake:lemon')
                    .disableBody(true, true)
                    .setName('Lemon')
                    .setOrigin(0)
                    .setScale(withDPI(0.333), withDPI(0.333))

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
                    .setDepth(-1)
                    .setDisplaySize(withDPI(375), withDPI(475))
                    .setOrigin(0);

                this.backgroundTop = scene.add
                    .image(0, withDPI(60), 'Snake:background_top')
                    .setDepth(15)
                    .setDisplaySize(withDPI(375), withDPI(67))
                    .setOrigin(0)

                this.backgroundBottom = scene.add
                    .image(0, withDPI(602), 'Snake:background_bottom')
                    .setDepth(15)
                    .setDisplaySize(withDPI(375), withDPI(116))
                    .setOrigin(0)

                this.spectatingText = scene.add
                    .text(
                        withDPI(187),
                        withDPI(551),
                        `Spectating`,
                        {
                            fontFamily: 'BubblegumSans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                            fontSize: '24px',
                            fontStyle: 'bold',
                            color: '#2E3A4B',
                            stroke: '#ffffff',
                            strokeThickness: 8,
                            align: 'center',
                            resolution: window.devicePixelRatio
                        }
                    )
                    .setScale(withDPI(1), withDPI(1))
                    .setDepth(17)
                    .setOrigin(0.5, 0)
                    .setVisible(false)

                /* SECTION Top bar */
                this.scoreText = scene.add
                    .text(
                        withDPI(16),
                        withDPI(84),
                        `Huidige score: ${this.score}`,
                        {
                            fontFamily: 'BubblegumSans',
                            fontSize: '24px',
                            color: '#fff',
                            align: 'left',
                            resolution: window.devicePixelRatio
                        }
                    )
                    .setScale(withDPI(1), withDPI(1))
                .setDepth(16)

                /* Handle UI lives */
                this.liveOne = scene.add
                    .image(withDPI(262), withDPI(83), 'Snake:live_icon')
                    .setDepth(16)
                    .setDisplaySize(withDPI(27), withDPI(25))
                    .setOrigin(0)

                this.liveTwo = scene.add
                    .image(withDPI(297), withDPI(83), 'Snake:live_icon')
                    .setDepth(16)
                    .setDisplaySize(withDPI(27), withDPI(25))
                    .setOrigin(0)

                this.liveThree = scene.add
                    .image(withDPI(332), withDPI(83), 'Snake:live_icon')
                    .setDepth(16)
                    .setDisplaySize(withDPI(27), withDPI(25))
                    .setOrigin(0)

                /* !SECTION Top bar */

                /* SECTION Respawn modal */
                this.respawnModal = scene.add.group()
                this.respawnModalBackground = this.respawnModal
                    .create(withDPI(16), withDPI(84), 'Snake:modal_background')
                    .setDepth(30)
                    .setDisplaySize(withDPI(343), withDPI(554))
                    .setOrigin(0)
                    .setVisible(false)

                this.respawnText = scene.add.text(withDPI(125), withDPI(116), 'Doorgaan', {
                    fontFamily: 'BubblegumSans',
                    fontSize: '32px',
                    color: '#2E3A4B',
                    align: 'left',
                    stroke: '#ffffff',
                    strokeThickness: 8,
                    resolution: window.devicePixelRatio
                }).setScale(withDPI(1), withDPI(1)).setDepth(31).setOrigin(0, 0).setVisible(false);

                this.respawnDescription = scene.add
                    .text(
                        withDPI(48),
                        withDPI(177),
                        [
                            'Oops, het lijkt erop dat',
                            'je Morfit een ongelukje had.'
                        ],
                        {
                            fontFamily: 'BubblegumSans',
                            fontSize: '24px',
                            color: '#ffffff',
                            align: 'left',
                            resolution: window.devicePixelRatio
                        }
                    )
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.respawnButton = scene.add
                    .image(withDPI(130), withDPI(520), 'Snake:respawn_button')
                    .setDepth(32)
                    .setInteractive()
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.respawnButton.on('pointerdown', () => {
                    this.playerRespawn()
                })

                this.closeRespawnButton = scene.add
                    .image(withDPI(168), withDPI(618), 'Snake:close_button')
                    .setDepth(33)
                    .setInteractive()
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.closeRespawnButton.on('pointerdown', this.playerRespawn)

                /* !SECTION Respawn modal */

                /* SECTION End game modal */
                this.endGameModal = scene.add.group()
                this.endGameModalBackground = this.endGameModal
                    .create(withDPI(16), withDPI(84), 'Snake:modal_background')
                    .setDepth(30)
                    .setDisplaySize(withDPI(343), withDPI(554))
                    .setOrigin(0)
                    .setVisible(false)

                this.endGameModalHeader = scene.add
                    .text(
                        withDPI(187),
                        withDPI(116),
                        'Gefeliciteerd', {
                            fontFamily: 'BubblegumSans',
                            fontSize: '32px',
                            color: '#2E3A4B',
                            align: 'center',
                            stroke: '#ffffff',
                            strokeThickness: 8,
                            resolution: window.devicePixelRatio
                        }
                    )
                    .setDepth(31)
                    .setOrigin(0.5, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.endGameModalScore = scene.add
                    .text(
                        withDPI(187),
                        withDPI(177),
                        '00.000',
                        {
                            fontFamily: 'BubblegumSans',
                            fontSize: '56px',
                            color: '#ffffff',
                            align: 'center',
                            resolution: window.devicePixelRatio
                        }
                    )
                    .setDepth(31)
                    .setOrigin(0.5, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                /* SECTION First place */
                this.endGameModalFirstHead = scene.add
                    .image(withDPI(48), withDPI(274), 'Snake:head_player_1')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalFirstHeadShadow = scene.add
                    .image(withDPI(48), withDPI(276), 'Snake:head_player_1')
                    .setAlpha(0.32)
                    .setDepth(32)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setTint('#000000')
                    .setVisible(false)

                this.endGameModalFirstMedal = scene.add
                    .image(withDPI(50), withDPI(276), 'Snake:medal_first')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalFirstName = scene.add
                    .text(withDPI(112), withDPI(275), 'Bobby', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: '#ffffff',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.endGameModalFirstScore = scene.add
                    .text(withDPI(112), withDPI(298), '41.000 punten', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)
                /* !SECTION First place */

                /* SECTION Second place */
                this.endGameModalSecondHead = scene.add
                    .image(withDPI(48), withDPI(335), 'Snake:head_player_1')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalSecondHeadShadow = scene.add
                    .image(withDPI(48), withDPI(337), 'Snake:head_player_1')
                    .setAlpha(0.32)
                    .setDepth(32)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setTint('#000000')
                    .setVisible(false)

                this.endGameModalSecondMedal = scene.add
                    .image(withDPI(50), withDPI(337), 'Snake:medal_second')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalSecondName = scene.add
                    .text(withDPI(112), withDPI(336), 'Nala', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: '#ffffff',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.endGameModalSecondScore = scene.add
                    .text(withDPI(112), withDPI(359), '32.400 punten', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)
                /* !SECTION Second place */

                /* SECTION Third place */
                this.endGameModalThirdHead = scene.add
                    .image(withDPI(48), withDPI(396), 'Snake:head_player_1')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalThirdHeadShadow = scene.add
                    .image(withDPI(48), withDPI(398), 'Snake:head_player_1')
                    .setAlpha(0.32)
                    .setDepth(32)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setTint('#000000')
                    .setVisible(false)

                this.endGameModalThirdMedal = scene.add
                    .image(withDPI(50), withDPI(398), 'Snake:medal_third')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalThirdName = scene.add
                    .text(withDPI(112), withDPI(397), 'Rico', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: '#ffffff',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.endGameModalThirdScore = scene.add
                    .text(withDPI(112), withDPI(420), '28.200 punten', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.75)',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)
                /* !SECTION Second place */

                /* SECTION Reward */
                this.endGameModalRewardLabel = scene.add
                    .text(withDPI(48), withDPI(489), 'Ontvangen beloning', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '24px',
                        color: '#ffffff',
                        align: 'left',
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                this.endGameModalMorfitCoin = scene.add
                    .image(withDPI(48), withDPI(522), 'Snake:morfit_coin')
                    .setDepth(33)
                    .setOrigin(0, 0)
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setVisible(false)

                this.endGameModalReward = scene.add
                    .text(withDPI(88), withDPI(526), '000', {
                        fontFamily: 'BubblegumSans',
                        fontSize: '24px',
                        color: '#ffffff',
                        align: 'left',
                        baselineY: 1,
                        resolution: window.devicePixelRatio
                    })
                    .setDepth(31)
                    .setOrigin(0, 0)
                    .setScale(withDPI(1), withDPI(1))
                    .setVisible(false)

                /* !SECTION Reward */

                this.endGameModalCloseButton = scene.add
                    .image(withDPI(168), withDPI(618), 'Snake:home_button')
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setOrigin(0, 0)
                    .setDepth(33)
                    .setVisible(false)
                    .setInteractive();

                this.endGameModalCloseButton.on('pointerdown', () => {
                    // Give the user the reward
                    const currentMorfos = localStorage.getItem('morfos') || 0
                    const parsedMorfos = parseInt(currentMorfos, 10)
                    const newMorfos = parsedMorfos + morfosReward
                    localStorage.setItem('morfos', newMorfos)

                    // Make player leave the snake game
                    main_socket.emit('leaveSnake', ownPlayer)

                    // Send the user to the main screen
                    main_scene.scene.launch('OverviewScene');
                    main_scene.scene.stop('SnakeScene')
                })

                /* !SECTION End game modal */

                this.goToHomeButton = scene.add
                    .image(withDPI(168), withDPI(618), 'Snake:home_button')
                    .setScale(withDPI(0.2), withDPI(0.2))
                    .setOrigin(0, 0)
                    .setDepth(20)
                    .setVisible(true)
                    .setInteractive();

                this.goToHomeButton.on('pointerdown', () => {
                    const ownScores = {}
                    ownScores[ownPlayer.playerId] = {
                        score: snakeSelf.score,
                        name
                    }

                    this.handleGameEnd(ownScores)
                })

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
                        .create(-200, -200, 'Snake:player2_body')
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
                    snakeSelf.pineapple.setPosition(-200, -200);
                    snakeSelf.lemon.setPosition(-200, -200);
                    snakeSelf.hamburger.setPosition(-200, -200);
                    snakeSelf.soda.setPosition(-200, -200);

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
                    snakeSelf.playerRespawnOther(playerData)
                })

                main_socket.on('snakeGameEnd', function (data) {
                    snakeSelf.handleGameEnd(data.scores, data.players)
                })
            /* !SECTION Multiplayer listeners */
            },

            update: function (time) {
                if (time >= this.moveTime) {
                    return this.move(time);
                }
            },

            playerHitOtherPlayer: function () {
                main_body.clear(true, true)
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
                    align: 'center',
                    resolution: window.devicePixelRatio
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
                    align: 'center',
                    resolution: window.devicePixelRatio
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

                if (this.score - 150 > 0) {
                    this.scoreModifier -= 150;
                }

                const scoreText = main_scene.add.text(hamburger.x, hamburger.y, '-150', {
                    fontSize: '24px',
                    fontFamily: 'BubblegumSans',
                    color: '#9a001c',
                    align: 'center',
                    resolution: window.devicePixelRatio
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
                    align: 'center',
                    resolution: window.devicePixelRatio
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
                    align: 'center',
                    resolution: window.devicePixelRatio
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

                /**
                 * First we assume all are safe, this should cover all blocks the player could go.
                 * If not all cords are covered this will cause warnings in console.
                 */
                for (let y = 0; y < 50; y++) {
                    testGrid[y] = [];

                    for (let x = 0; x < 29; x++) {
                        testGrid[y][x] = true;
                    }
                }

                /* Test all cords for the block the player is in. */
                this.updateGrid(testGrid);

                let validLocations = []

                /**
                 * Here we basically set the range we want the food to be able to be placed at.
                 */
                for (let y = 2; y < 29; y++) {
                    for (let x = 2; x < 27; x++) {
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
                let activeHearts = [true, true, true]

                main_socket.emit('playerDied', {
                    playerId: ownPlayer.playerId,
                    name,
                    score: snakeSelf.score
                })

                switch (snakeSelf.lives) {
                    case 0:
                        activeHearts = [false, false, false]
                        this.playerRanOutOfLives()
                        break;

                    case 1:
                        activeHearts = [true, false, false]
                        this.showRespawn()
                        break;

                    case 2:
                        activeHearts = [true, true, false]
                        this.showRespawn()
                        break;

                    case 3:
                        activeHearts = [true, true, true]
                        this.showRespawn()
                        break;

                    default:
                        activeHearts = [false, false, false]
                        this.playerRanOutOfLives()
                        break;
                }

                snakeSelf.liveOne.setVisible(activeHearts[0])
                snakeSelf.liveTwo.setVisible(activeHearts[1])
                snakeSelf.liveThree.setVisible(activeHearts[2])

                this.playerDiesAnimation(main_body)
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
                snakeSelf.respawnModalBackground.setVisible(false);
                snakeSelf.respawnText.setVisible(false);
                snakeSelf.respawnDescription.setVisible(false);
                snakeSelf.respawnButton.setVisible(false);
                snakeSelf.closeRespawnButton.setVisible(false);

                snakeSelf.body = main_scene.physics.add.group();
                main_body = snakeSelf.body

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
                snakeSelf.heading = RIGHT;
                snakeSelf.direction = RIGHT;

                snakeSelf.speed = 95;
                snakeSelf.alive = true;

                main_scene.physics.add.overlap(snakeSelf.head, snakeSelf.apple, this.eatApple, null, snakeSelf);
                main_scene.physics.add.overlap(snakeSelf.head, snakeSelf.pineapple, this.eatPineapple, null, snakeSelf);
                main_scene.physics.add.overlap(snakeSelf.head, snakeSelf.hamburger, this.eatHamburger, null, snakeSelf);
                main_scene.physics.add.overlap(snakeSelf.head, snakeSelf.lemon, this.eatLemon, null, snakeSelf);
                main_scene.physics.add.overlap(snakeSelf.head, snakeSelf.soda, this.drinkSoda, null, snakeSelf);

                Object.keys(snakeSelf.otherPlayers).forEach(id => {
                    main_scene.physics.add.collider(snakeSelf.head, snakeSelf.otherPlayers[id].body, snakeSelf.playerHitOtherPlayer, null, snakeSelf)
                })

                socket.emit('playerRespawned', {
                    playerId: ownPlayer.playerId,
                    tails: 0,

                })
            },

            playerRespawnOther: function (playerInfo) {
                if (playerInfo.playerId !== ownPlayer.playerId) {
                    const secondPlayer = snakeSelf.otherPlayers[playerInfo.playerId]

                    secondPlayer.body = main_scene.physics.add.group();

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

                    main_scene.physics.add.collider(snakeSelf.head, secondPlayer.body, snakeSelf.playerHitOtherPlayer, null, snakeSelf)
                }
            },

            playerRanOutOfLives: function () {
                snakeSelf.spectatingText.setVisible(true)
                main_socket.emit('playerRanOutLives', {
                    playerId: ownPlayer.playerId,
                    name,
                    score: snakeSelf.score
                })
            },

            showRespawn: function () {
                snakeSelf.respawnModalBackground.setVisible(true);
                snakeSelf.respawnText.setVisible(true);
                snakeSelf.respawnDescription.setVisible(true);
                snakeSelf.respawnButton.setVisible(true);
                snakeSelf.closeRespawnButton.setVisible(true);
            },
            /* !SECTION Player dies */

            /* SECTION Game end */
            /**
             * @typedef {Object} Player
             * @property {string} name - the name of the player
             * @property {number} score - the score of the player
             */

            /**
             * @param {Object} scores - object containing Player. Properties are named after the player id.
             * @param {Player} scores.id
             */
            handleGameEnd: function (scores, players) {
                // Convert the scores to a array
                const scorePlayersArray = []
                Object.keys(scores).forEach(id => {
                    scorePlayersArray.push(scores[id])
                })

                // Define first second and third.
                const sortedPlayers = scorePlayersArray.sort((a, b) => (
                    b.score - a.score
                ))

                // Calculate the reward
                morfosReward = Math.ceil(snakeSelf.score * 0.006)

                // Update the values
                snakeSelf.endGameModalScore.setText(`${snakeSelf.score}`)
                snakeSelf.endGameModalFirstName.setText(`${sortedPlayers[0].name}`)
                snakeSelf.endGameModalFirstScore.setText(`${sortedPlayers[0].score}`)

                if (sortedPlayers[1] !== undefined) {
                    snakeSelf.endGameModalSecondName.setText(`${sortedPlayers[1].name}`)
                    snakeSelf.endGameModalSecondScore.setText(`${sortedPlayers[1].score}`)
                }

                if (sortedPlayers[2] !== undefined) {
                    snakeSelf.endGameModalThirdName.setText(`${sortedPlayers[2].name}`)
                    snakeSelf.endGameModalThirdScore.setText(`${sortedPlayers[2].score}`)
                }

                snakeSelf.endGameModalReward.setText(`${morfosReward}`)


                // Make elements visible
                snakeSelf.endGameModalBackground.setVisible(true)
                snakeSelf.endGameModalHeader.setVisible(true)
                snakeSelf.endGameModalScore.setVisible(true)

                snakeSelf.endGameModalFirstHead.setVisible(true)
                snakeSelf.endGameModalFirstHeadShadow.setVisible(true)
                snakeSelf.endGameModalFirstMedal.setVisible(true)
                snakeSelf.endGameModalFirstName.setVisible(true)
                snakeSelf.endGameModalFirstScore.setVisible(true)

                if (sortedPlayers[1] !== undefined) {
                    snakeSelf.endGameModalSecondHead.setVisible(true)
                    snakeSelf.endGameModalSecondHeadShadow.setVisible(true)
                    snakeSelf.endGameModalSecondMedal.setVisible(true)
                    snakeSelf.endGameModalSecondName.setVisible(true)
                    snakeSelf.endGameModalSecondScore.setVisible(true)
                }

                if (sortedPlayers[2] !== undefined) {
                    snakeSelf.endGameModalThirdHead.setVisible(true)
                    snakeSelf.endGameModalThirdHeadShadow.setVisible(true)
                    snakeSelf.endGameModalThirdMedal.setVisible(true)
                    snakeSelf.endGameModalThirdName.setVisible(true)
                    snakeSelf.endGameModalThirdScore.setVisible(true)
                }

                snakeSelf.endGameModalRewardLabel.setVisible(true)
                snakeSelf.endGameModalMorfitCoin.setVisible(true)
                snakeSelf.endGameModalReward.setVisible(true)
                snakeSelf.endGameModalCloseButton.setVisible(true)

                // Unsubscribe from the socket.
                main_socket.emit('leaveSnake', ownPlayer)
            }
            /* !SECTION Game end */
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
