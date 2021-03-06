/*
 * Fucksvg (17.6.1) fucksvg.element.js
 * Licensed under MIT
 */

import Fucksvg from './fucksvg'

class Element {

    draw() {}

    getId() {
        return this.id;
    }

    setId(i) {
        this.id = i;
        return this;
    }

    getFloatMenu() {
        return this.floatMenu;
    }

    setFloatMenu(m) {
        this.floatMenu = m;
        return this;
    }

    isFloatMenuVisible() {
        return this.floatMenuVisible;
    }

    setFloatMenuVisible(v) {
        this.floatMenuVisible = v;
        return this;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getLocation(x, y) {
        return {x: this.getX(), y: this.getY()};
    }

    setLocation(x, y) {
        this.setX(x);
        this.setY(y);
        return this;
    }

    getWidth() {
        return this.width;
    }

    setWidth(width) {
        this.width = width;
        return this;
    }

    getHeight() {
        return this.height;
    }

    setHeight(height) {
        this.height = height;
        return this;
    }

    getSize() {
        return {width: this.getWidth(), height: this.getHeight()};
    }

    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }

    setBound(x, y, width, height) {
        this.setLocation(x, y);
        this.setSize(width, height);
        return this;
    }

    getBound(){
        return {
            left: this.getX(), top: this.getY(),
            right: this.getX() + this.getWidth(), bottom: this.getY() +this.getHeight()
        };
    }

    isVisible() {
        return this.visible;
    }

    setVisible(v) {
        this.visible = v;
        return this;
    }

    isDragable() {
        return this.dragable;
    }

    setDragable(d) {
        this.dragable = d;
        return this;
    }

    isSelected() {
        return this.selected;
    }

    setSelected(s) {
        this.selected = s;
        return this;
    }

    isFocus() {
        return this.focus;
    }

    setFocus (f) {
        this.focus = f;
        return this;
    }

    onFocus() {
        this.setFocus(true);
        return this;
    }

    loseFocus() {
        this.setFocus(false);
        return this;
    }

    setTip(tip) {
        this.tip = tip;
        return this;
    }

    getTip() {
        return this.tip;
    }

    onMousedown(e) {
        this.setSelected(true);
        this.mousedownX = e.x;
        this.mousedownY = e.y;
        this.selectedLocation = {x: this.getX(), y:this.getY()};
    }

    onMouseselected() {
        this.setSelected(true);
        this.selectedLocation = {x: this.getX(), y:this.getY()};
    }

    goBack(box) {}

    onMouseup(e) {
        this.mouseupX = e.x;
        this.mouseupY = e.y;
        var x = e.x;
        var y = e.y;
        var box = e.context;

        if(this.gravitate){
            for (var i = 0; i < box.links.length; i++) {
                var link = box.links[i];
                if(this === link.nodeB){
                    var newNodeA = box.findCloserNode(this, this.gravitate);
                    var gravitateMsg = {
                        link: link, target:this,
                        oldNode: this.lastParentNode, newNode: newNodeA
                    };
                    if(newNodeA && newNodeA.layout && newNodeA.layout.auto == true){
                        box.layoutNode(newNodeA);
                    }
                    if(this.lastParentNode && this.lastParentNode.layout && this.lastParentNode.layout.auto == true){
                        box.layoutNode(this.lastParentNode);
                    }
                    box.publish('gravitate', $.extend({}, gravitateMsg));
                    break;
                }
            }
        }

        if(this.outContainer &&	this.isIndrag){
            for (var j = 0; j < box.containers.length; j++) {
                var c = box.containers[j];
                if(! this.inContainer(c)) continue;
                if(this.parentContainer !== c) continue;
                if (this.x + this.width < c.x || this.x > c.x+c.width || this.y+this.height < c.y || this.y>c.y + c.height){
                    this.parentContainer.remove(this);
                    break;
                }
            }
        }

        if(this.inContainer && 	this.isOnMousedrag){
            for (var j = 0; j < box.containers.length; j++) {
                var group = box.containers[j];
                if(! this.inContainer(group)) continue;
                if (x > group.x && x < group.x+group.width && y>group.y && y<group.y+group.height){
                    if(this.parentContainer){
                        this.parentContainer.remove(this);
                    }
                    group.add(this);
                    break;
                }
            }
        }
        if(this.layout && this.layout.auto == true){
            box.layoutNode(this);
        }
        this.isOnMousedrag = false;
    }

    cancleSelected() {
        this.setSelected(false);
        this.selectedLocation = null;
    }

    onMouseover(e) {
        this.isOnMousOver = true;
        this.isTipVisible = true;
        this.setFocus(true);
    }

    onMouseout(e) {
        this.isOnMousOver = false;
        this.isTipVisible = false;
        this.setFocus(false);
    }

    onMousedrag(e) {
        this.isOnMousedrag = true;
        var dx = e.dx;
        var dy = e.dy;
        var x = e.x;
        var y = e.y;

        var newX = this.selectedLocation.x + dx;
        var newY = this.selectedLocation.y + dy;
        this.setLocation(newX, newY);
        var box = e.context;

        if(this.gravitate){
            for (var i = 0; i < box.links.length; i++) {
                var link = box.links[i];
                if(this === link.nodeB){
                    var newNodeA = box.findCloserNode(this, this.gravitate);
                    if(newNodeA != null && newNodeA !== link.nodeA){
                        if(this.lastParentNode == null){
                            this.lastParentNode = link.nodeA;
                        }
                        link.nodeA = newNodeA;
                        break;
                    }
                }
            }
        }

        if(this.inContainer){
            for (var j = 0; j < box.containers.length; j++) {
                var group = box.containers[j];
                if(! this.inContainer(group)) continue;
                if (x > group.x && x < group.x+group.width && y>group.y && y<group.y+group.height){
                    group.setFocus(true);
                }else{
                    group.setFocus(false);
                }
            }
        }
        this.isIndrag = true;
    }
}



export default Element;