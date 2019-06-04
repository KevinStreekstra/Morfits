/**
 * @typedef {Object} item
 * @property {string} id - a unique id of the item.
 * @property {number} itemLevel - what level has the user upgraded the item to.
 * @property {number} upgradeCost - cost to level up.
 * @property {string} textureKey - the texture key of the item.
 * @property {string} category - the name of the category (HAT, SHIRT, PANTS, SHOES)
 * @property {number} scale -  the scale factor to use for this assets.
 */

/**
 * @description The items the user has in his inventory
 * @readonly
 * @constant
 * @type {item[]}
 */
export const INVENTORY = [
    {
        id: 'dfb25653-0196-4458-80f1-dd83a1cfb147',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:tShirt_blank',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '3419e415-62da-4db2-afb6-9109ef669102',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:tShirt_circle',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: 'f26fb841-1b8e-4225-9f5a-09e7642d9ca7',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:tShirt_squares',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '315b846a-88df-4f91-9403-bdbb34bdcab6',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:tShirt_stripes',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: 'cd576b12-4102-4a3e-9302-01aff4ea19e4',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:shirt_long_blank',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '1e6881f2-4735-4c4a-9f73-22ddc9a42a20',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:shirt_long_circle',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '120d01c5-f882-425e-bf25-063b682ac98f',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:shirt_long_squares',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '7c2018b5-a1e8-4125-8758-3c4332345093',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:shirt_long_stripes',
        category: 'SHIRT',
        scale: 0.1
    },
    {
        id: '04d08be8-659c-4a45-8983-a7de1f4d3290',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_short_blank',
        category: 'PANTS',
        scale: 0.1
    },
    {
        id: 'cc36d2ff-a44b-407d-af42-dcc9f74f43d5',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_short_damaged',
        category: 'PANTS',
        scale: 0.1
    },
    {
        id: 'bdb95130-8514-478f-ae78-508272f82be3',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_short_worn',
        category: 'PANTS',
        scale: 0.1
    },
    {
        id: '155efda5-e3ed-4bcb-b614-5f33c2e17f2b',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_long_blank',
        category: 'PANTS',
        scale: 0.075
    },
    {
        id: '9cf08406-9327-4199-bb52-cdf68c2d5cc2',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_long_damaged',
        category: 'PANTS',
        scale: 0.075
    },
    {
        id: 'faae5e6d-c95a-4afa-90d2-b3ebb8aaa49f',
        itemLevel: 1,
        upgradeCost: 20,
        textureKey: 'Character:pants_long_worn',
        category: 'PANTS',
        scale: 0.075
    }
]
