class AlignGrid {
    constructor(props) {
        if (!props.scene) {
            console.log("Missing scene..!");
            return;
        }
        props.rows ? props.row : 3; 
        props.cols ? props.cols : 3; 
        props.width ? props.width : 800;
        props.height ? props.height : 600;

        this.w = props.width;
        this.h = props.height;
        this.rows = props.rows;
        this.cols = props.cols;
        //cw cell width is the scene width divided by the number of columns
        this.cw = this.w / this.cols;
        //ch cell height is the scene height divided the number of rows
        this.ch = this.h / this.rows;
        this.scene = props.scene;
    }
    //place an object in relation to the grid
    placeAt(xx, yy, obj) {
        //calculate the center of the cell
        //by adding half of the height and width
        //to the x and y of the coordinates
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }
    //mostly for planning and debugging this will
    //create a visual representation of the grid
    show(a = 1) {
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(1, 0xff0000, a);
        //
        //
        //this.graphics.beginPath();
        for (var i = 0; i < this.w; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.h);
        }
        for (var i = 0; i < this.h; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.w, i);
        }
        this.graphics.strokePath();
    }

    placeAtIndex(index, obj) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        this.placeAt(xx, yy, obj);
    }

    showNumbers(a = 1) {
        this.show(a);
        var n = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var numText = this.scene.add.text(0, 0, n, {
                    color: 'red'
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAt(j, i, numText);
                n++;
            }
        }
    }

    getIndexPos(index) {
        var yy = Math.floor(index / this.cols);
        var xx = index - (yy * this.cols);
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        var obj = {};
        obj.x = x2;
        obj.y = y2;
        return obj;
    }
    scaleTo(config) {
        let displayWidth = this.w * config.percentage;
        if(!isNaN(config.maxWidth)) {
            displayWidth > config.maxWidth ? displayWidth = config.maxWidth : displayWidth; 
        }
        config.obj.displayWidth = displayWidth;
        config.obj.scaleY = config.obj.scaleX;
    }

    scaleY(obj, percentage) {
        obj.displayHeight = this.h * percentage;
    }

    scaleTo(obj, percentage, maxWidth) {
        let displayWidth = this.w * percentage;
        if(typeof maxWidth !== 'undefined')
            displayWidth > maxWidth ? displayWidth = maxWidth : displayWidth; 

        obj.displayWidth = displayWidth;
        obj.scaleY = obj.scaleX;
    }

    scaleX(obj, percentage, maxWidth) {
        let displayWidth = this.w * percentage; 
        if(typeof maxWidth !== 'undefined')
            displayWidth > maxWidth ? displayWidth = maxWidth : displayWidth;

        obj.displayWidth = displayWidth;
    }

    scaleY(obj, percentage, maxHeight) {
        let displayHeight = this.h * percentage;
        if(typeof maxWidth !== 'undefined')
            displayHeight > maxHeight ? displayHeight = maxHeight : displayHeight; 

        obj.displayHeight = displayHeight;
    }
}

export default AlignGrid;