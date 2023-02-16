const wrapper = document.querySelector(".wrapper"),
    form = document.querySelector("form"),
    fileInp = form.querySelector("input"),
    img = form.querySelector("img"),
    infoText = form.querySelector("p"),
    closeBtn = document.querySelector(".close"),
    copyBtn = document.querySelector(".copy");
let file;

function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: "POST",
        body: formData,
    })
        .then((res) => res.json())
        .then((result) => {
            result = result[0].symbol[0].data;
            infoText.innerText = result
                ? "Upload QR Code to Scan"
                : "Couldn't scan QR Code";
            if (!result) return;
            document.querySelector("textarea").innerText = result;
            form.querySelector("img").src = URL.createObjectURL(file);
            wrapper.classList.add("active");
        })
        .catch(() => {
            infoText.innerText = "Couldn't scan QR Code";
        });
}

// async function paste(input) {
//     let items = await navigator.clipboard.read();
//     let item = items[0];
//     console.log("Check");
//     console.log(item);
// }

fileInp.addEventListener("change", async (e) => {
    file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    fetchRequest(file, formData);
});

// Drag over form
form.addEventListener("dragover", (event) => {
    event.preventDefault();
    form.classList.add("active");
    infoText.textContent = "Release to Upload File";
});

// Leave drag from form
form.addEventListener("dragleave", () => {
    form.classList.remove("active");
    infoText.textContent = "Upload QR Code to Read";
});

// Drop on DropArea
form.addEventListener("drop", (event) => {
    event.preventDefault();
    file = event.dataTransfer.files[0];
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            img.innerHTML = imgTag;
            let formData = new FormData();
            formData.append("file", file);
            fetchRequest(file, formData);
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("This is not a image file!");
        form.classList.remove("active");
        infoText.textContent = "Upload QR Code to Read";
    }
});

copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

form.addEventListener("click", () => {
    fileInp.value = null;
    fileInp.click();
});
closeBtn.addEventListener("click", () => {
    wrapper.classList.remove("active");
    form.classList.remove("active");
});
