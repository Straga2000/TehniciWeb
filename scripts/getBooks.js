var newBook = {
    title: "My happy book",
    isbn: "161729243",
    pageCount: 0,
    thumbnailUrl: "images/newBook.jpg",
    shortDescription: "It's a happy book!" ,
    price: 1234
};

/*  "shortDescription": "Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout.",*/
var newUpdateBook = {
    title: "Unlocking Android",
    isbn: "1933988673",
    pageCount: 416,
    publishedDate: {
        "$date": "2009-04-01T00:00:00.000-0700"
    },
    thumbnailUrl: "https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg",
    shortDescription: "No",
    longDescription: "Android is an open source mobile phone platform based on the Linux operating system and developed by the Open Handset Alliance, a consortium of over 30 hardware, software and telecom companies that focus on open standards for mobile devices. Led by search giant, Google, Android is designed to deliver a better and more open and cost effective mobile experience.    Unlocking Android: A Developer's Guide provides concise, hands-on instruction for the Android operating system and development tools. This book teaches important architectural concepts in a straightforward writing style and builds on this with practical and useful examples throughout. Based on his mobile development experience and his deep knowledge of the arcane Android technical documentation, the author conveys the know-how you need to develop practical applications that build upon or replace any of Androids features, however small.    Unlocking Android: A Developer's Guide prepares the reader to embrace the platform in easy-to-understand language and builds on this foundation with re-usable Java code examples. It is ideal for corporate and hobbyists alike who have an interest, or a mandate, to deliver software functionality for cell phones.    WHAT'S INSIDE:        * Android's place in the market      * Using the Eclipse environment for Android development      * The Intents - how and why they are used      * Application classes:            o Activity            o Service            o IntentReceiver       * User interface design      * Using the ContentProvider to manage data      * Persisting data with the SQLite database      * Networking examples      * Telephony applications      * Notification methods      * OpenGL, animation & multimedia      * Sample Applications  ",
    status: "PUBLISH",
    authors: [
        "W. Frank Ableson",
        "Charlie Collins",
        "Robi Sen"
    ],
    categories: [
        "Open Source",
        "Mobile"
    ],
    id: 0,
    price: 33.01
};

window.onload = function () {

    getStock();

    var deleteButton = document.getElementById("delete");
    var updateButton = document.getElementById("update");
    var createButton = document.getElementById("create");
    var getButton = document.getElementById("get");

    deleteButton.onclick = deleteBook;
    createButton.onclick = createBook;
    getButton.onclick = getRandomBook;
    updateButton.onclick = updateBook;

};

function getRandomBook() {

    fetch('http://localhost:3000/book/' + Math.round(parseInt(localStorage["dataLength"]) * Math.random()).toString())
    .then(function (response) {
        response.json().then(function (data) { 

                localStorage.setItem("idBookPage", data.id);

                window.location = "http://localhost:3000/book.html";

                localStorage.setItem("idBookPage", data.id);
        })
    })
}

function createBook() {

    fetch('http://localhost:3000/book', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newBook)
    }).then(function () {
        window.location.reload();
    });
}

function updateBook() {

    fetch(`http://localhost:3000/book/${0}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newUpdateBook)
    }).then(function () {
    //goModifiy();
        window.location.reload();
    });
}

function deleteBook() {

    var idVar = localStorage.getItem("dataLength");
    fetch(`http://localhost:3000/book/${idVar}`, {
        method: 'DELETE',
    }).then(function (data) {
        window.location.reload();
    });
}

function getStock() {

    fetch('http://localhost:3000/book')
    .then(function (response) {
        response.json().then(function (data) { 
            for(let i = 0; i < data.length; i++)
            {
                data[i] = createElement(data[i]);
            }

            localStorage.setItem("dataLength", (data.length - 1).toString());
        })
    })
}

function createElement(dataObject) {
    var gallery = document.getElementsByClassName("gallery")[0];

    /*console.log(dataObject);*/
    var divImage = document.createElement("div");
    var image = document.createElement("img");
    var divText = document.createElement("div");
    var h1Title = document.createElement("h1");
    var pDescription = document.createElement("p");
    var footerProduct = document.createElement("span");
    var price = document.createElement("p");
    var linkElement = document.createElement("a");

    divImage.className = "image";

    if(dataObject.shortDescription)
    {
        if (dataObject.thumbnailUrl)
            image.src = dataObject.thumbnailUrl;
        else
            image.src = "images/No_Picture.jpg";
        image.alt = "";

        divText.className = "text";

        h1Title.innerText = "About the product";
        h1Title.className = "font-x1";

        pDescription.classList.add("font-xs", "description");

        res = dataObject.shortDescription.split(" ");
        max = 20;

        if (res.length > max)
        {
            for(let i = 0; i < max; i++)
                pDescription.innerText += res[i] + " ";
            pDescription.innerText += res[max] + "...";

        }
        else
        {
            for(let i = 0; i < res.length - 1; i++)
                pDescription.innerText += res[i] + " ";

            pDescription.innerText += res[res.length - 1] + "...";
        }

        footerProduct.className = "inline";

        price.innerText = (dataObject.price).toString() + " $";


        price.classList.add("font-xs", "fl_left", "bold");

        linkElement.innerText = "More >>";
        linkElement.classList.add("font-xs", "fl_left","bold");
        linkElement.href = "http://localhost:63342/BlueLibrary/book.html";

        linkElement.onmouseover = function(){localStorage.setItem("idBookPage", dataObject.id); console.log(dataObject.id);};

        footerProduct.appendChild(price);
        footerProduct.appendChild(linkElement);

        divText.appendChild(h1Title);
        divText.appendChild(pDescription);
        divText.appendChild(footerProduct);

        divImage.appendChild(image);
        divImage.appendChild(divText);

        gallery.appendChild(divImage);
    }

    return dataObject;
    //console.log(linkElement.href)
}