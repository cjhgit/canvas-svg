//var config = require('./config.json');

class Hello {
    say() {
        return '你好啊';
    }
}

let a = 111;
let b = 222;
var xxx = (c,d) => c*d;
console.log(xxx(a,b));

// hello.js
module.exports = function() {
    var div = document.createElement('div');
    div.textContent = new Hello().say();
    return div;
};