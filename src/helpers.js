// Various helper functions

/**
 * Creates a new Image Game Object and adds it to the Scene.
 *
 * This function wraps around add.image to set the scale to the device ratio.
 * For usage please first in the constructor use this.addImage = addImage.bind(this)
 *
 * Note: This method will only be available if the Image Game Object has been built into Phaser.
 * @param x The horizontal position of this Game Object in the world.
 * @param y The vertical position of this Game Object in the world.
 * @param texture The key of the Texture this Game Object will use to render with, as stored in the Texture Manager.
 * @param frame An optional frame from the Texture this Game Object is rendering with.
 */
export function addImage(x, y, texture, frame) {
    return this.add.image(x, y, texture, frame).setScale(window.devicePixelRatio, window.devicePixelRatio)
}
