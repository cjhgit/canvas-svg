// main.js
var hello = require('./hello.js');

require('./common.css');

//require('./common.scss');

//import styles from 'common.css'; //导入

document.getElementById('root').appendChild(hello());