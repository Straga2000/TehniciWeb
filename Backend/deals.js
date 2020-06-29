window.onload = function () {

    ///deals page
    getStock();

    var deleteButton = document.getElementById("delete");
    var updateButton = document.getElementById("update");
    var createButton = document.getElementById("create");
    var getButton = document.getElementById("get");

    deleteButton.onclick = deleteBook;
    createButton.onclick = createBook;
    getButton.onclick = getRandomBook;
    updateButton.onclick = updateBook;

    ///task hide images 1.8
    button = document.getElementById("imgSwitcher");
    button.onclick = changeMouseState;

};