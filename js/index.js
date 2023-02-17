const submitUser = document.querySelectorAll("input")[1];
const submitRepo = document.querySelectorAll("input")[2];
const search = document.getElementById("search");
const form = document.querySelector("form");
const container = document.getElementById("github-container");
let userList = document.getElementById("user-list");
let reposList = document.getElementById("repos-list");

function searchUser(e) {
    e.preventDefault();
    function userFetch() {
        fetch(`https://api.github.com/search/users?q=${search.value}`)
        .then((resp) => resp.json())
        .then((data) => {
            data.items.forEach((e) => {
                let li = document.createElement("li");
                li.innerHTML = `<h2>username: ${e.login}</h2>
                <h2>avatar: <img src=${e.avatar_url}></h2>
                <p>profile: <a href=${e.html_url} target="_blank">${e.html_url}</a></p>`
                li.addEventListener("click", liClick)
                userList.appendChild(li);
                function liClick() {
                    fetch(`https://api.github.com/users/${e.login}/repos`)
                        .then((resp) => resp.json())
                        .then((arr) => {
                            arr.forEach((obj) => {
                                let repoLi = document.createElement("li");
                                repoLi.innerHTML = `<h3><a href=${obj.html_url} target="_blank">${obj.html_url}${obj.name}</a></h3>`
                                li.appendChild(repoLi);
                                li.removeEventListener("click", liClick);
                            })
                        })
                }
            })
        })
    }
    if (userList.innerHTML === '\n\n      ') {
        userFetch();
    } else {
        userList.innerHTML = '\n\n      ';
        userFetch();        
    }

};

function searchRepo(e) {
    e.preventDefault();
    function repoFetch() {
        fetch(`https://api.github.com/search/repositories?q=${search.value}`)
        .then((resp) => resp.json())
        .then((data) => {
            data.items.forEach((e) => {
                let li2 = document.createElement("li");
                li2.innerHTML = `<h2><a href=${e.html_url} target="_blank">${e.name}</a></h2>`
                reposList.appendChild(li2);
            })
        })
    }
    if (reposList.innerHTML === '\n\n      ') {
        repoFetch();
    } else {
        reposList.innerHTML = '\n\n      ';
        repoFetch();
    }
};


submitUser.addEventListener("click", searchUser);
submitRepo.addEventListener("click", searchRepo);