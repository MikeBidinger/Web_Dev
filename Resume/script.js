let myData;
let lang = "EN";

const username = "MikeBidinger";
const repository = "Web_Dev";
const filePath = "Resume/data/data.json";
const imgPath = "Resume/img/";
const imgDir = `https://raw.githubusercontent.com/${username}/${repository}/main/${imgPath}`;

async function loadJSONFromGitHub(username, repository, path) {
    const url = `https://raw.githubusercontent.com/${username}/${repository}/main/${path}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch JSON. Status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error(`Error loading JSON from GitHub: ${error.message}`);
    }
}

window.onload = loadJSONFromGitHub(username, repository, filePath)
    .then((data) => {
        console.log("JSON data loaded successfully:", data);
        myData = data;
        loadJSONdata(lang);
        createNavigationBar(document.getElementById("Nav"));
    })
    .catch((error) => {
        console.error("Error:", error);
    });

// function Func() {
//     fetch("./data.json")
//         .then((res) => {
//             return res.json();
//         })
//         .then((data) => {
//             console.log("JSON data loaded successfully:", data);
//             myData = data;
//             loadJSONdata(lang);
//             createNavigationBar(document.getElementById("Nav"));
//         });
// }

// window.onload = Func();

function loadJSONdata() {
    // Set JSON data to elements
    for (let el in myData) {
        let element = document.getElementById(el);
        parseData(element, myData[el]);
    }
}

function parseData(element, elementData) {
    // Parse the JSON element data
    for (let prop in elementData) {
        if (prop === "_children") {
            // Add children to element
            addChildren(element, elementData[prop]);
        } else if (typeof elementData[prop] === "object") {
            // Set property data (language dependent)
            element[prop] = elementData[prop][lang];
        } else {
            // Set property data (language independent)
            if (prop === "src") {
                element[prop] = imgDir + elementData[prop];
            } else {
                element[prop] = elementData[prop];
            }
        }
    }
}

function addChildren(parent, children) {
    // Add child to parent element
    for (child in children) {
        let element = document.createElement("div");
        for (el in children[child]) {
            if (el === "link") {
                let linkEl = document.createElement("a");
                // Copy the children to link element (instead of div element)
                while (element.firstChild) {
                    linkEl.appendChild(element.firstChild);
                }
                linkEl.href = children[child][el].href;
                linkEl.target = children[child][el].target;
                // linkEl.classList.add(el);
                element = linkEl;
            }
            element.appendChild(createChild(el, children[child][el]));
        }
        parent.appendChild(element);
    }
}

function createChild(type, props) {
    let element;
    // Create child element
    if (type === "text") {
        // Create text element
        element = document.createElement("p");
    } else if (type === "icon") {
        // Create icon element
        element = document.createElement("img");
        element.src = imgDir + props.src;
        element.alt = props.alt;
    } else if (type === "link") {
        element = document.createElement("a");
        element.href = props.href;
        element.target = props.target;
    } else if (type === "rating") {
        // Create rating element
        element = document.createElement("div");
        createRating(element, props.amount, props.score);
    } else if (type === "tooltip") {
        // Create tooltip element
        element = document.createElement("span");
    } else if (type === "header") {
        element = document.createElement("h4");
    } else if (type === "title") {
        element = document.createElement("h5");
    } else if (type === "desc") {
        element = document.createElement("p");
    }
    if (Object.hasOwn(props, "innerHTML")) {
        if (typeof props.innerHTML === "object") {
            element.id = props.id;
            element.innerHTML = props.innerHTML[lang];
        } else {
            element.innerHTML = props.innerHTML;
        }
    }
    element.classList.add(type);
    return element;
}

function createRating(parent, amount, score) {
    for (let i = 0; i < amount; i++) {
        if (i < amount - score) {
            parent.appendChild(createRateIcon(false));
        } else {
            parent.appendChild(createRateIcon(true));
        }
    }
}

function createRateIcon(checked) {
    let element = document.createElement("i");
    element.classList.add("rating");
    element.classList.add("material-icons");
    if (checked) {
        element.innerHTML = "radio_button_checked";
    } else {
        element.innerHTML = "radio_button_unchecked";
    }
    return element;
}

function setLang(selection) {
    // Set language according to selection
    lang = selection;
    for (let el in myData) {
        setProperties(myData[el]);
    }
    // Change navigation bar according to language selection
    removeNavigationBar(document.getElementById("Nav"));
    createNavigationBar(document.getElementById("Nav"));
}

function setProperties(elementData) {
    if (typeof elementData === "object") {
        if ("innerHTML" in elementData && "id" in elementData) {
            if (typeof elementData.innerHTML === "object") {
                let element = document.getElementById(elementData.id);
                element.innerHTML = elementData.innerHTML[lang];
            }
        }
        for (let el in elementData) {
            setProperties(elementData[el]);
        }
    }
}

function createNavigationBar(navbar) {
    // Home Link
    let link = document.createElement("a");
    link.id = "LinkHome";
    link.href = "#";
    link.innerHTML = "Home";
    navbar.appendChild(link);
    // Sideview Links
    let sideElements = document.getElementById("Sideview").children;
    createLinks(sideElements, navbar);
    // Main Content Links
    let mainElements = document.getElementById("MainContent").children;
    createLinks(mainElements, navbar);
    // Contact Link
    link = document.createElement("a");
    link.id = "LinkFooter";
    link.href = "#Footer";
    link.innerHTML = "Contact";
    navbar.appendChild(link);
    // Language Selection:
    // - Dropdown
    let dropdown = document.createElement("div");
    dropdown.id = "Dropdown";
    // - Dropdown Link
    let dropLink = document.createElement("a");
    dropLink.id = "DropLink";
    dropLink.innerHTML = "Language";
    // - Dropdown Buttons
    let dropButtons = document.createElement("div");
    dropButtons.id = "DropButtons";
    let dropEN = document.createElement("button");
    dropEN.onclick = function () {
        setLang("EN");
    };
    dropEN.innerHTML = `<img src="${imgDir}flag-uk.svg" class="icon" />`;
    dropButtons.appendChild(dropEN);
    let dropNL = document.createElement("button");
    dropNL.onclick = function () {
        setLang("NL");
    };
    dropNL.innerHTML = `<img src="${imgDir}flag-nl.svg" class="icon" />`;
    dropButtons.appendChild(dropNL);
    let dropDE = document.createElement("button");
    dropDE.onclick = function () {
        setLang("DE");
    };
    dropDE.innerHTML = `<img src="${imgDir}flag-de.svg" class="icon" />`;
    dropButtons.appendChild(dropDE);
    // - Add Dropdown to NavBar
    dropdown.appendChild(dropLink);
    dropdown.appendChild(dropButtons);
    navbar.appendChild(dropdown);
}

function createLinks(elements, parent) {
    for (let div of elements) {
        if (div.tagName === "DIV") {
            let part = div.firstElementChild;
            let link = document.createElement("a");
            link.id = "Link" + div.id;
            link.href = "#" + div.id;
            link.innerHTML = part.innerHTML;
            parent.appendChild(link);
        }
    }
}

function removeNavigationBar(navbar) {
    navbar.removeChild(navbar.firstElementChild);
    let len = navbar.childNodes.length;
    for (let i = 0; i < len; i++) {
        navbar.removeChild(navbar.firstElementChild);
    }
}
