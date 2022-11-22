'use strict';

// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function sleep(duration) {
    return new Promise(resolve => {
        setTimeout(resolve, duration);
    })
}

// Selectors -----------------------

const shape = select('.shapeSel');
const color = select('.colorSel');
const create = select('.create');

// Class constructor ---------------

class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }

    setShape() {
        if (name === "square") {
            
        }
    }

    getInfo() {
        return [this.name, this.color];
    }

}

onEvent('click', create, function() {
    createShape();
});

function createShape() {
    let element = document.createElement('div');
    document.querySelector('.shapes').appendChild(element);
    // Confirmation log message
    console.log('Created element');

    let shapeType = shape.value;
    let colorType = color.value;

    const newShape = new Shape(shapeType, colorType)
    // Element size
    element.style.width = "80px";
    element.style.height = "80px";
    element.style.borderRadius = "5px";

    element.style.backgroundColor = "white";
}