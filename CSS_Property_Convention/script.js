window.onload = function() {
    const w3s_css = "https://www.w3schools.com/";
    var links = document.getElementsByTagName("a");
    let suffix = "";
    let arr = [];
    let ext = "";
    for (let i = 0; i < links.length; i++) {
        suffix = links[i].getAttribute("href");
        arr = suffix.split(".");
        ext = arr[arr.length - 1];
        if (ext == "asp") {
            links[i].href = w3s_css + "css/" + suffix;
        } else if (ext == "php") {
            links[i].href = w3s_css + "cssref/" + suffix;
        } else {
            links[i].href = w3s_css + "css/";
        }
        links[i].target = "_blank";
    }
}
