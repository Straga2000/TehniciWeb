var quiz = [
    {
        question : "What was the first novel ever written?",
        answers : [["The Tale of Genji", true],
            ["The Hall of Fame", true], ["Madame of the roses", false], ["The myth of the origin", false]]
    },
    {
        question : "What was the first book published by movable type?",
        answers : [["Latin songs", false], ["Latin Bible", true]]
    },
    {
        question : "What was Stephen King’s first published novel?",
        answers : [["Carrie", true], ["Farenheit", false]]
    },
    {
        question : "How many books I wrote?",
        answers : [["none", true], ["1", false], ["5", false], ["3", false]]
    }];

window.onload = function () {
    quizDisplay();
};

function quizDisplay() {
    let quizStruct = document.getElementsByClassName("quiz")[0];

    for(let i = 0; i < quiz.length; i++)
    {
        let container = document.createElement("li");
        container.className = "container";
        
        let question = document.createElement("ol");
        question.innerText = quiz[i].question;
        container.appendChild(question);
        
        for(let j = 0; j < quiz[i].answers.length; j++)
        {
            let answer = document.createElement("input");
            answer.type = "checkbox";
            answer.id = "a" + j.toString() + "q" + i.toString();
            answer.name = answer.id;
            answer.value = quiz[i].answers[j][1];
            container.appendChild(answer);

            let text = document.createElement("label");
            text.for = answer.id;
            text.innerText = quiz[i].answers[j][0];
            container.appendChild(text);
        }

        quizStruct.appendChild(container);
    }
    
    let button = document.createElement("button");
    button.innerText = "Submit";
    button.onclick = getResult;

    document.getElementsByTagName("body")[0].appendChild(button);
}

async function getResult() {

    let count = 0;

    for(let i = 0; i < quiz.length; i++)
    {
        let ok = true;

        for(let j = 0; j < quiz[i].answers.length; j++)
        {
            let obj = document.getElementById("a" + j.toString() + "q" + i.toString());
            obj.disabled = true;

            if(obj.checked.toString() !== obj.value.toString())
            {
                ok = false;
                break;
            }

        }

        if(ok === true)
            count++;

        console.log(count);
    }

    // let questions = document.getElementsByClassName("container");
    // let count = 0;
    //
    // for(let i = 0; i < questions.length; i++)
    // {
    //     let answers = questions[i].querySelectorAll("input");
    //     console.log(answers);
    //     let ok = true;
    //
    //     for(let j = 0; j < answers.length; j++)
    //     {
    //         if(answers[j].value !== quiz[i].answers[j][1])
    //         {ok = false; break;}
    //     }
    //
    //     if(ok === true)
    //         count++;
    // }

    let quizStruct = document.getElementsByClassName("quiz")[0];
    let score = document.createElement("p");
    score.innerText = "Scorul tau e " + count.toString();

    quizStruct.appendChild(score);

    let button = document.getElementsByTagName("button")[0];
    button.disabled = true;

}
