var pressed = false;
var button = null;

function changeMouseState() {

    let imgVec = document.getElementsByTagName("img");
    pressed = !pressed;

    if(pressed)
    {
        for(let i = 0; i < imgVec.length; i++)
            imgVec[i].style.display = "none";

        button.innerText = "Show images";
    }
    else
    {
        for(let i = 0; i < imgVec.length; i++)
            imgVec[i].style.display = "inline";

        button.innerText = "Hide images";
    }
}