import AlignGrid from '../classes/AlignGrid'

class FormUtil {
    constructor(props) {
        if (!props.scene) {
            console.log('Missing scene..!')
            return
        }

        this.gameWidth = props.width
        this.gameHeight = props.height
        this.scene = props.scene
        this.alignGrid = new AlignGrid({
            scene: this.scene,
            rows: props.rows,
            cols: props.cols,
            width: props.width,
            height: props.height
        })
    }

    showNumbers() {
        this.alignGrid.showNumbers()
    }

    scaleToGameW(elName, per) {
        var el = document.getElementById(elName)
        var w = this.gameWidth * per
        el.style.width = w + 'px'
    }

    scaleToGameH(elName, per) {
        var el = document.getElementById(elName)
        var h = this.gameHeight * per
        el.style.height = h + 'px'
    }

    placeElementAt(index, elName, centerX = true, centerY = false) {
        //get the position from the grid
        var pos = this.alignGrid.getIndexPos(index)
        //extract to local vars
        var x = pos.x
        var y = pos.y
        //get the element
        var el = document.getElementById(elName)
        //set the position to absolute
        el.style.position = 'absolute'
        //get the width of the element
        var w = el.style.width
        //convert to a number
        w = this.toNum(w)
        //
        //
        //center horizontal in square if needed
        if (centerX == true) {
            x -= w / 2
        }
        //
        //get the height
        //
        var h = el.style.height
        //convert to a number
        h = this.toNum(h)
        //
        //center verticaly in square if needed
        //
        if (centerY == true) {
            y -= h / 2
        }
        //set the positions
        el.style.top = y + 'px'
        el.style.left = x + 'px'
    }

    //changes 100px to 100
    toNum(s) {
        s = s.replace('px', '')
        s = parseInt(s)
        return s
    }

    //add a change callback
    addChangeCallback(elName, fun, scope = null) {
        var el = document.getElementById(elName)
        if (scope == null) {
            el.oninput = fun
        } else {
            el.oninput = fun.bind(scope)
        }
    }

    addClickCallback(elName, fun, scope = null) {
        var el = document.getElementById(elName)
        if (scope == null) {
            el.onclick = fun
        } else {
            el.onclick = fun.bind(scope)
        }
    }

    getTextValue(elName) {
        var el = document.getElementById(elName)
        return el.value
    }

    show(elName) {
        let el = document.getElementById(elName)
        el.style.display = 'block'
        return
    }

    hide(elName) {
        let el = document.getElementById(elName)
        el.style.display = 'none'
        return
    }
}

export default FormUtil
