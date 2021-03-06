var priceValue = null;
var nameValue = null;
var counter = 0;
var countProducts = 0;

window.onload = function () {
    setInterval(changeTitle, 3000);
    getBook();
};

function changeTitle() {
    try {
        var titleElement = document.getElementsByTagName("h1")[0];

        if(counter % 2 === 1)
        {
            titleElement.innerText = nameValue;
            titleElement.style.color = '#ffffff';
            titleElement.style.fontWeight = "lighter";
        }
        else
        {
            titleElement.innerText = priceValue;
            titleElement.style.color = '#0ac6fc';
            titleElement.style.fontWeight = "bold";
        }
        counter += 1;
    }
    catch (e)
    {
    }
}

function getBook() {

    console.log(localStorage["idBookPage"]);
    fetch('http://localhost:3000/book/' + localStorage["idBookPage"])
    .then(function (response) {
        response.json().then(function (data) {
            createPage(data);
            //localStorage.setItem("dataLength", (data.length - 1).toString()); ???
        })
    })
}

function createPage(object) {

    var parentElement = document.getElementsByClassName("book")[0];

    /*Title part here*/
    var titleElement = document.createElement('h1');
    titleElement.classList.add("title", "page", "font-x6");
    titleElement.innerText = object.title;

    priceValue = "Just " + (object.price).toString() + "$";
    nameValue = object.title;
    parentElement.appendChild(titleElement);

    /*Container part here*/
    var container = document.createElement("div");
    container.className = "line";

    /*Text part here*/
    var description = document.createElement("p");

    if(!(object.shortDescription === undefined))
        description.innerText = object.shortDescription;

    if (!(object.longDescription === undefined))
        description.innerText = object.longDescription;

    /*Image container*/
    var imageContainer = document.createElement("div");
    imageContainer.className = "image";

    /*Image*/
    var image = document.createElement("img");
    image.src = object.thumbnailUrl;

    /*Button*/
    var button = document.createElement("button");
    button.className = "btn";
    button.innerText = "Add to cart";

    /*Combine all*/
    imageContainer.appendChild(image);

    container.appendChild(description);
    container.appendChild(imageContainer);

    parentElement.appendChild(titleElement);
    parentElement.appendChild(container);
    parentElement.appendChild(button);
}