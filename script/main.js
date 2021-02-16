"use strict";

function DomElement(params) {
  this.selector = params.selector;
  this.height = params.height;
  this.width = params.width;
  this.bg = params.bg;
  this.fontSize = params.fontSize;
}

DomElement.prototype.generateElem = function () {
  const parent = document.querySelector("#container");

  if (this.selector[0] === ".") {
    const newElem = document.createElement("div");
    newElem.classList.add([this.selector.slice(0, 1)]);
    newElem.innerHTML = "fewfewfwf";
    newElem.style.cssText = `height: ${this.height};  width: ${this.width};  background-color: ${this.bg};  font-size: ${this.fontSize}`;
    newElem.style.color = "red";
    parent.append(newElem);
  } else if (this.selector[0] === "#") {
    const newElem = document.createElement("div");
    newElem.id = this.selector.slice(0, 1);
    newElem.innerHTML = "fewfewfwf";
    newElem.style.cssText = `height: ${this.height};  width: ${this.width};  background-color: ${this.bg};  font-size: ${this.fontSize}`;
    newElem.style.color = "red";
    parent.append(newElem);
  }
};

const test = new DomElement({
  selector: ".block",
  height: "100px",
  width: "100px",
  bg: "green",
  fontSize: "20px",
});
test.generateElem();
