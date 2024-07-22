//main varible 

let theinput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

//get repos function

function getRepos() {
    if (theinput.value == "") {
        reposData.innerHTML = "<span>Please Write Github Username.</span>";
    }
    else {
        fetch(`https://api.github.com/users/${theinput.value}/repos`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                reposData.innerHTML = "";
                data.forEach(repo => {
                    //create main div 
                    let mainDIV = document.createElement("div")
                    //show name
                    mainDIV.appendChild(document.createTextNode(repo.name));
                    // show link 
                    let URL = document.createElement('a')
                    URL.appendChild(document.createTextNode(" Visit "))
                    URL.href = `https://github.com/${theinput.value}/${repo.name}`
                    URL.setAttribute('target', '_blank');
                    mainDIV.appendChild(URL);
                    //show stares
                    let starsSpans = document.createElement("span")
                    starsSpans.appendChild(document.createTextNode(` Stars ${repo.stargazers_count}`));
                    mainDIV.appendChild(starsSpans);
                    mainDIV.className="repo-box";
                    reposData.appendChild(mainDIV);
                });
            });
    }
};