var dim = null;
var textLengthName = "dimensiuneText";

function changeTextSizeByInput() {
    let choice = document.getElementById("selectDim").value;

    //console.log(choice);

    if(choice === "mic")
        localStorage.setItem(textLengthName, "12px");
    else
        if(choice === "mediu")
        localStorage.setItem(textLengthName, "16px");
    else
        if(choice === "mare")
        localStorage.setItem(textLengthName, "20px");
        else
            localStorage.setItem(textLengthName, "10px");


    dim = localStorage.getItem(textLengthName);
    modifyDimensionToAllText();
    console.log(localStorage[textLengthName]);
}

function  resetDimension() {
    document.getElementById("selectDim").value = "mic";
    localStorage.removeItem(textLengthName);
    dim = "10px";
    modifyDimensionToAllText();
}

function modifyDimensionToAllText() {
    let pObj = document.getElementsByTagName('p');

    console.log(pObj);
    for(let i = 0; i < pObj.length; i++)
        pObj[i].style.fontSize = dim;
}
