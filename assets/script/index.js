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
const info = select('.info');

// Class constructor ---------------

class Shape {
    constructor(name, color) {
        this.name = name;
        this.color = color;

        this.element = document.createElement('div');
        document.querySelector('.shapes').appendChild(this.element);

        this.element.style.width = "80px";
        this.element.style.height = "80px";
    }

    createShape() {
        if (this.name === 'circle') {
            this.element.style.borderRadius = '50%';
        } else {
            this.element.style.borderRadius = '5px';
        }

        switch (this.color) {
            case 'blue':
                this.element.style.backgroundColor = "#09f";
                break;
            case 'green':
                this.element.style.backgroundColor = '#9f0';
                break;
            case 'orange':
                this.element.style.backgroundColor = '#f90';
                break;
            case 'pink':
                this.element.style.backgroundColor = '#f09';
                break;
            case 'purple':
                this.element.style.backgroundColor = '#90f';
                break;
            default:
                this.element.style.backgroundColor = "white";
            }
        }
}

const arr = [];
let maxCount = 0;
onEvent('click', create, function() {
    const newShape = new Shape(shape.value, color.value)
    newShape.createShape();
    arr.push(newShape);
    maxCount++;

    if (maxCount === 24) {
        create.disabled = true;
        create.style.cursor = 'default';
    }
});

newShape.addEventListener('click', function (e) {
    const target = e.target;
    if (target.matches('div')) {

        info.innerText = `${newShape.getInfo()}`;    
    }
})