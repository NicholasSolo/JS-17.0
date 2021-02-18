"use strict";

function DomElement(params) {
  this.selector = params.selector || '.block';
  this.height = params.height || '50px';
  this.width = params.width || '50px';
  this.bg = params.bg || 'blue';
  this.fontSize = params.fontSize || '14px';
  this.text = params.text || "Sorry, no text";
}

DomElement.prototype.generateElem = function () {
  let newElem;

  if (this.selector[0] === ".") {
    newElem = document.createElement("div");
    newElem.classList.add(this.selector.slice(1));
  } else if (this.selector[0] === "#") {
    newElem = document.createElement("p");
    newElem.id = this.selector.slice(1);
  }

  newElem.textContent = this.text;
  newElem.style.cssText = `height: ${this.height};  width: ${this.width};  background-color: ${this.bg};  font-size: ${this.fontSize}`;
  document.querySelector("body").append(newElem);
};

const test = new DomElement({
  selector: "#block",
  height: "100px",
  width: "fit-content",
  bg: "green",
  fontSize: "20px",
  text: "Hello, world!"
});

test.generateElem();
