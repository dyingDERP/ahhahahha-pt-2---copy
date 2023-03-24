function player_2 () {
    player_ = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    player_.setStayInScreen(true)
    controller.moveSprite(player_, 80, 80)
    scene.cameraFollowSprite(player_)
}
function game2 () {
    tiles.setCurrentTilemap(tilemap`level1`)
    tiles.placeOnRandomTile(player_, assets.tile`myTile3`)
    tiles.placeOnRandomTile(Enemy_, assets.tile`myTile0`)
    tiles.setTileAt(tiles.getTileLocation(5, 5), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(6, 6), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(6, 5), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(5, 6), assets.tile`myTile`)
    music.play(music.stringPlayable("C - D - C - C - ", 160), music.PlaybackMode.LoopingInBackground)
    music.play(music.stringPlayable("D A C5 A F G F E ", 160), music.PlaybackMode.LoopingInBackground)
}
function power_up () {
	
}
function enemy_ () {
    Enemy_ = sprites.create(img`
        . . . . . . . c c c . . . . . . 
        . . . . . . c b 5 c . . . . . . 
        . . . . c c c 5 5 c c c . . . . 
        . . c c b c 5 5 5 5 c c c c . . 
        . c b b 5 b 5 5 5 5 b 5 b b c . 
        . c b 5 5 b b 5 5 b b 5 5 b c . 
        . . f 5 5 5 b b b b 5 5 5 c . . 
        . . f f 5 5 5 5 5 5 5 5 f f . . 
        . . f f f b f e e f b f f f . . 
        . . f f f 1 f b b f 1 f f f . . 
        . . . f f b b b b b b f f . . . 
        . . . e e f e e e e f e e . . . 
        . . e b c b 5 b b 5 b f b e . . 
        . . e e f 5 5 5 5 5 5 f e e . . 
        . . . . c b 5 5 5 5 b c . . . . 
        . . . . . f f f f f f . . . . . 
        `, SpriteKind.Enemy)
    sprites.setDataNumber(Enemy_, "speed", 40)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let Enemy_: Sprite = null
let player_: Sprite = null
player_2()
enemy_()
game2()
game.onUpdateInterval(5000, function () {
    // more then 10 blocks away from player speed up or something
    if (info.score() > 3) {
        sprites.changeDataNumberBy(Enemy_, "speed", 15)
    }
})
game.onUpdateInterval(1000, function () {
    info.changeScoreBy(1)
})
game.onUpdateInterval(500, function () {
    console.log(player_.vx)
    console.log(sprites.readDataNumber(Enemy_, "speed"))
})
game.onUpdateInterval(100, function () {
    if (player_.vx == 80 && controller.A.isPressed()) {
        timer.throttle("action", 500, function () {
            player_.x += 40
        })
    } else if (player_.vx == -80 && controller.A.isPressed()) {
        timer.throttle("action", 500, function () {
            player_.x += -40
        })
    } else if (player_.vy == 80 && controller.A.isPressed()) {
        timer.throttle("action", 500, function () {
            player_.y += 40
        })
    } else if (player_.vy == -80 && controller.A.isPressed()) {
        timer.throttle("action", 500, function () {
            player_.y += -40
        })
    }
})
game.onUpdateInterval(100, function () {
    Enemy_.follow(player_, sprites.readDataNumber(Enemy_, "speed"))
})
