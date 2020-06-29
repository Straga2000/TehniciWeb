window.onload = function () {

    //Task 2.10
    let selectElement = document.getElementById("selectDim");

    if(localStorage.getItem(textLengthName))
    {
        dim = localStorage.getItem(textLengthName);

        if(dim === "12px")
            selectElement.value = "mic";
        if(dim === "16px")
            selectElement.value = "mediu";
        if(dim === "20px")
            selectElement.value = "mare";

        modifyDimensionToAllText();
    }

    selectElement.onchange = changeTextSizeByInput;

    let resetDim = document.getElementById("resetDim");
    resetDim.onclick = resetDimension;

    //Task 2.2
    uploadText().then(() => setInterval(updateText, 330));
};