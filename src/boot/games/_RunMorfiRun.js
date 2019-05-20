export function game_RunMorfiRun_assets() {
    this.load.atlas('player', 'src/assets/games/run_morfi_run/player.png',
    {
        "frames": {
            "sprite_2": {
                "frame": {
                    "x": 0,
                    "y": 0,
                    "w": 48,
                    "h": 64
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 48,
                    "h": 64
                },
                "sourceSize": {
                    "w": 48,
                    "h": 64
                }
            },
            "sprite_1": {
                "frame": {
                    "x": 49,
                    "y": 0,
                    "w": 48,
                    "h": 64
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 48,
                    "h": 64
                },
                "sourceSize": {
                    "w": 48,
                    "h": 64
                }
            },
            "sprite_0": {
                "frame": {
                    "x": 0,
                    "y": 65,
                    "w": 48,
                    "h": 64
                },
                "rotated": false,
                "trimmed": false,
                "spriteSourceSize": {
                    "x": 0,
                    "y": 0,
                    "w": 48,
                    "h": 64
                },
                "sourceSize": {
                    "w": 48,
                    "h": 64
                }
            }
        },
        "meta": {
            "app": "https://www.leshylabs.com/apps/sstool/",
            "image": "player.png",
            "size": {
                "w": 97,
                "h": 129
            },
            "scale": 1
        }
    }
    );
    this.load.image('lemon', 'src/assets/games/run_morfi_run/lemon.png');
    this.load.image('platform', 'src/assets/games/run_morfi_run/platform.png');
    this.load.image('finish', 'src/assets/games/run_morfi_run/finish.png');
    this.load.image('ground', 'src/assets/games/run_morfi_run/ground.png');
}