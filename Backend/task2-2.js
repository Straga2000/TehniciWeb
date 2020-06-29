var textVec = [];
var textPos = [];
var textObj = null;

async function uploadText() {
    textObj = document.getElementsByClassName("wordAnimation");
    ///Memoram textul din fiecare paragraf si il spargem in cuvinte astfel incat sa il animam
    for(let i = 0; i < textObj.length; i++)
    {
        textVec.push(textObj[i].innerText.split(" "));
        textObj[i].innerText = "";
        textPos.push(0);
    }
}

async function updateText() {
    for(let i = 0; i < textObj.length; i++)
    {
        textObj[i].innerText = textObj[i].innerText + textVec[i][textPos[i]] + "\xa0";

        textPos[i]++;
        if(textPos[i] === textVec[i].length + 1)
        {
            textPos[i] = 0;
            textObj[i].innerText = "";
        }
    }
}