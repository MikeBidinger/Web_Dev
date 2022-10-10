"use strict";

const psData = JSON.parse(psd);

// Create tree view
let bPPG = false;
let html = `<ul id="myUL">`;
html = initTree(psData, html);
html += `</ul>`;
document.getElementById("treeView").innerHTML = html;

unfoldFunction();

function initTree(varObj, varHTML) {
    const arrKey = Object.keys(varObj);
    arrKey.sort();
    for (const i in arrKey) {
        console.log(arrKey[i]);
        varHTML += `<li>`;
        varHTML += `<span class="caret">${arrKey[i]}</span>`;
        varHTML += `<ul class="nested">`;
        varHTML = levelDownTree(varObj[arrKey[i]], varHTML);
        varHTML += `</ul>`;
    }
    return varHTML;
}

function levelDownTree(varObj, varHTML) {
    if (Array.isArray(varObj)) {
        for (const y in varObj) {
            varHTML += `<li>${varObj[y]}</li>`;
        }
    } else if (typeof varObj == "object") {
        for (const x in varObj) {
            varHTML += `<li>`;
            if (Object.keys(varObj[x]).length > 0) {
                varHTML += `<span class="caret">${x}</span>`;
                varHTML += `<ul class="nested">`;
                varHTML = levelDownTree(varObj[x], varHTML);
                varHTML += `</ul>`;
            } else {varHTML += `${x}`;}
            varHTML += `</li>`;
        }
    }
    return varHTML;
}

function unfoldFunction() {
    let toggler = document.getElementsByClassName("caret");
    let i;
    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
            console.log(this);
        });
    }
}

function unfoldAll() {
    let toggler = document.getElementsByClassName("caret");
    let i;
    for (i = 0; i < toggler.length; i++) {
        toggler[i].parentElement.querySelector(".nested").classList.add("active");
        toggler[i].classList.add("caret-down");
    }
}

function foldAll() {
    let toggler = document.getElementsByClassName("caret");
    let i;
    for (i = 0; i < toggler.length; i++) {
        toggler[i].parentElement.querySelector(".nested").classList.remove("active");
        toggler[i].classList.remove("caret-down");
    }
}