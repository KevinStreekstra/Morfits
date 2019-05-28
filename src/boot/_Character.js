/** @description All exports are exported at 5x scale, and should be scaled down to 0.2 */
export function character_assets() {
  /* SECTION Heads */
  this.load.image('Character:head_base', require('../assets/character/body_parts/head/head_base.png'));
  this.load.image('Character:head_horns', require('../assets/character/body_parts/head/head_variant_horns.png'));

  // ANCHOR Long
  this.load.image('Character:head_long_black', require('../assets/character/body_parts/head/head_variant_long_hair_black.png'));
  this.load.image('Character:head_long_blond', require('../assets/character/body_parts/head/head_variant_long_hair_blond.png'));
  this.load.image('Character:head_long_brown', require('../assets/character/body_parts/head/head_variant_long_hair_light_brown.png'));

  // ANCHOR Long with horns
  this.load.image(
    'Character:head_long_horns_black',
    require('../assets/character/body_parts/head/head_variant_long_hair_with_horns_black.png')
  );
  this.load.image(
    'Character:head_long_horns_blond',
    require('../assets/character/body_parts/head/head_variant_long_hair_with_horns_blond.png')
  );
  this.load.image(
    'Character:head_long_horns_brown',
    require('../assets/character/body_parts/head/head_variant_long_hair_with_horns_light_brown.png')
  );

  // ANCHOR Short
  this.load.image('Character:head_short_black', require('../assets/character/body_parts/head/head_variant_short_hair_black.png'));
  this.load.image('Character:head_short_blond', require('../assets/character/body_parts/head/head_variant_short_hair_blond.png'));
  this.load.image('Character:head_short_brown', require('../assets/character/body_parts/head/head_variant_short_hair_light_brown.png'));

  // ANCHOR Short with horns
  this.load.image(
    'Character:head_short_horns_black',
    require('../assets/character/body_parts/head/head_variant_short_hair_with_horns_black.png')
  );
  this.load.image(
    'Character:head_short_horns_blond',
    require('../assets/character/body_parts/head/head_variant_short_hair_with_horns_blond.png')
  );
  this.load.image(
    'Character:head_short_horns_brown',
    require('../assets/character/body_parts/head/head_variant_short_hair_with_horns_light_brown.png')
  );

  /* !SECTION Heads */

  // T-shirts
  this.load.image('Character:tShirt_blank', require('../assets/character/clothings/shirts/tshirt_variant_blank.png'));
  this.load.image('Character:tShirt_circle', require('../assets/character/clothings/shirts/tshirt_variant_circle.png'));
  this.load.image('Character:tShirt_squares', require('../assets/character/clothings/shirts/tshirt_variant_squares.png'));
  this.load.image('Character:tShirt_stripes', require('../assets/character/clothings/shirts/tshirt_variant_stripes.png'));

  // Long sleeve shirts
  this.load.image('Character:shirt_long_blank', require('../assets/character/clothings/shirts/shirt_long_variant_blank.png'));
  this.load.image('Character:shirt_long_circle', require('../assets/character/clothings/shirts/shirt_long_variant_circle.png'));
  this.load.image('Character:shirt_long_squares', require('../assets/character/clothings/shirts/shirt_long_variant_squares.png'));
  this.load.image('Character:shirt_long_stripes', require('../assets/character/clothings/shirts/shirt_long_variant_stripes.png'));

  // Short pants
  this.load.image('Character:pants_short_blank', require('../assets/character/clothings/pants/pants_variant_blank.png'));
  this.load.image('Character:pants_short_damaged', require('../assets/character/clothings/pants/pants_variant_damaged.png'));
  this.load.image('Character:pants_short_worn', require('../assets/character/clothings/pants/pants_variant_worn.png'));

  // Long pants
  this.load.image('Character:pants_long_blank', require('../assets/character/clothings/pants/pants_long_variant_blank.png'));
  this.load.image('Character:pants_long_damaged', require('../assets/character/clothings/pants/pants_long_variant_damaged.png'));
  this.load.image('Character:pants_long_worn', require('../assets/character/clothings/pants/pants_long_variant_worn.png'));
}
