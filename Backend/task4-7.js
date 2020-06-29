function getAllPosts() {

    let bodyElement = document.getElementsByTagName("body")[0];
    //console.log(bodyElement);

    fetch('http://localhost:3000/posts')
        .then(function (response) {
            response.json().then(function (data) {

                for(let i = 0; i < data.length; i++)
                {
                    bodyElement.appendChild(createPost(data[i]));
                }

            })
        });

}

function createPost(data) {

    ///construim containerul postarii
    let post = document.createElement("div");
    post.id = "post" + data.id.toString();
    post.className = "post";

    ///construim mesajul postarii
    let postText = document.createElement("h1");
    postText.innerText = data.text;
    post.appendChild(postText);

    ///construim un container pt zona de input
    let inputContainer = document.createElement("div");
    inputContainer.className = "line";

    ///adaugam zona de input pt comentarii
    let commInput = document.createElement("input");
    commInput.type = "text";
    commInput.id =  "postComment" + post.id.toString();
    commInput.name = "postComment";
    commInput.className = "postComment";
    commInput.value = "";

    ///adaugam butonul de adaugat comentarii
    let commBtn = document.createElement("input");
    commBtn.type = "image";
    commBtn.src =  "../Images/pencil.png";
    commBtn.id =  "getComment" + post.id.toString();
    commBtn.onclick = postNewComment.bind(event, post);
    /*stim clar ca este un nou comentariu de fiecare data aici*/

    inputContainer.appendChild(commInput);
    inputContainer.appendChild(commBtn);
    post.appendChild(inputContainer);

    ///afisam toate comentariile
    for(let i = 0; i < data.comments.length; i++)
    {
        ///construim containerul pentru comentariu
        let commContainer = document.createElement("div");
        commContainer.classList.add("comment", "line");
        commContainer.id = post.id + "comment" + data.comments[i].id.toString();

        let commText = document.createElement("p");
        commText.innerText = data.comments[i].text;
        commContainer.appendChild(commText);

        let upvote = document.createElement("input");
        upvote.type = "image";
        upvote.src = "../Images/add.png";
        commContainer.appendChild(upvote);

        let downvote = document.createElement("input");
        downvote.type = "image";
        downvote.src = "../Images/minus.png";

        /*formatul cu bind cere ca primul parametru sa fie eventul*/
        downvote.onclick = getNumberOfDownvotes.bind(event, data.id, data.comments[i].id);
        commContainer.appendChild(downvote);

        post.appendChild(commContainer);
    }

    return post;
}


///elimina comentariile cu mai mult de 3 downVoturi
function getNumberOfDownvotes(idPost, idComm) {

    ///stergerea de pe server
    fetch('http://localhost:3000/posts/' + idPost).then(
        function (response) {
             return response.json().then(
                function (data) {

                    ///gasim comentariul cu id-ul idComm

                    let index = 0;
                    for(let i = 0; i < data.comments.length; i++)
                        if(data.comments[i].id === idComm)
                        {
                            index = i;
                            break;
                        }

                    //console.log(data, idComm);
                    data.comments[index].downvotes++;

                    if (data.comments[index].downvotes >= 3)
                    {
                        ///stergerea din front
                        let postDel = document.querySelector("#post" + data.id);
                        let comDel = document.querySelector("#post" + data.id + "comment" + data.comments[index].id);
                        postDel.removeChild(comDel);

                        data.comments.splice(index, 1);
                    }

                    return data;
                }
            );
        }
    ).then(function (data) {
        fetch('http://localhost:3000/posts/' + idPost, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
    });
};

function postNewComment(post) {

    ///adaugare in front
    let inputComm = document.getElementById("postComment" + post.id);

    //construirea structurii de comentariu
    let commObj = document.createElement("div");
    let commText = document.createElement("p");

    ///construim containerul si adaugam comentariul in partea de text
    commObj.classList.add("comment", "line");
    commText.innerText = inputComm.value;
    inputComm.value = "";

    //<input type="image" src="../Images/add.png" class="upvote">
    let upVote = document.createElement("input");
    let downVote = document.createElement("input");

    upVote.type = "image";
    upVote.src = "../Images/add.png";
    upVote.className = "upvote";

    downVote.type = "image";
    downVote.src = "../Images/minus.png";
    downVote.className = "downvote";

    commObj.appendChild(commText);
    commObj.appendChild(upVote);
    commObj.appendChild(downVote);
    post.appendChild(commObj);

    let idPost = post.id.split("post")[1];
    let newEntry = {};

    getPost(idPost).then(function (postJSON) {

        newEntry.id = postJSON.comments.length;
        newEntry.text = commText.innerText;
        newEntry.downvotes = 0;

        ///bind downvote cu pictograma
        downVote.onclick = getNumberOfDownvotes.bind(event, idPost, newEntry.id);
        commObj.id = post.id + "comment" + newEntry.id;

        console.log(postJSON);
        postJSON.comments.push(newEntry);

        updatePost(idPost, postJSON);
    });


}

function getPost(idPost) {

    return fetch('http://localhost:3000/posts/' + idPost)
        .then(function (response) {
            return response.json().then(function (data) {
                return data;
            })
        })
}

function updatePost(idPost, data) {
    fetch('http://localhost:3000/posts/' + idPost, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

function objectHider(searchObj) {
    let all = document.querySelectorAll(searchObj);

    console.log(all);
    for(let i = 0; i < all.length; i++)
    {
        if(all[i].style.display != "none")
            all[i].style.display = "none";
        else
            all[i].style.display = "flex";
    }
}