window.onload = function () {

    //task 4.7
    let hiderButton = document.getElementById("hiderButton");
    hiderButton.onclick = objectHider.bind(event, ".post > .comment");
    getAllPosts();

};