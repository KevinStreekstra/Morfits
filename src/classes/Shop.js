import Player from '../classes/Player';

class Shop {
    constructor() {
        this._player = new Player();
    }

    buyItem(id, price) {
        let _morfos = this._player.getMorfos();
        if(_morfos >= price) {
            let _inventory = this._player.getInventory();

            let newItem = {
                id: id,
                equipped: false
            };

            _inventory.push(newItem);

            this._player.setInventory(_inventory);
            this._player.setMorfos(_morfos - price);

            return true;
        } else {
            return false;
        }
    }
}

export default Shop;