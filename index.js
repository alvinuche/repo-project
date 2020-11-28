const bioImage = document.querySelectorAll(".bio-img"),
      name = document.querySelectorAll(".name"),
      userName = document.querySelector(".user-name"),
      desc = document.querySelectorAll(".desc"),
      repoWrapper = document.querySelector(".repo-wrapper"),
      counter = document.querySelector(".counter");


const url = "https://api.github.com/graphql";

fetch(url, {
    method: "POST",
    headers: {
        Authorization: "Bearer 7edfc9722ee37d2a47e06c5bcba7e1ff15cf9243",
        "Content-Type": "application/json"
    }
    ,
    body: JSON.stringify({
        query: `
            query{
                viewer{
                name
                login
                bio 
                avatarUrl
                repositories(first: 20) {
                    totalCount
                    nodes {
                    forkCount
                    stargazers{
                        totalCount
                    }
                    name
                    description          
                    primaryLanguage{
                        name
                        color
                    }
                    url
                    updatedAt
                    
                }
              }
            }
        }
        `
    })   
})
.then(res => res.json())
.then(data => {
    // console.log(data);
    handleData(data);
});



const handleData = (data) => {
    bioImage.forEach(element => {
        element.src = data.data.viewer.avatarUrl;
    })
    name.forEach(element => {
        element.innerHTML = data.data.viewer.name;
    })
    userName.innerHTML = data.data.viewer.login;
    desc.forEach(element => {
        element.innerHTML = data.data.viewer.bio;
    })
    counter.innerHTML = data.data.viewer.repositories.totalCount;
    handleRepos(data);
}

const handleRepos = (data) => {
    const repos = data.data.viewer.repositories.nodes;
    // let secondDiv = document.createElement("div");
    // let innerDiv = document.createElement("div");
    // let innerBtn = document.createElement("button");

    

    repos.forEach(repo => {
        let numStars = repo.stargazers.totalCount,
            li = document.createElement("li"),
            icon = document.createElement("i"),
            firstDiv = document.createElement("div"),
            h3 = document.createElement("h3"),
            anchor = document.createElement("a"),
            p = document.createElement("p"),
            div = document.createElement("div"),
            span = document.createElement("span"),
            spanOne = document.createElement("span"),
            spanTwo = document.createElement("span"),
            spanThree = document.createElement("span"),
            spanFour = document.createElement("span"),
            spanFive = document.createElement("span"),
            spanDate = document.createElement("span"),
            secondDiv = document.createElement("div"),
            innerDiv = document.createElement("div"),
            innerBtn = document.createElement("button"),
            secondIcon = document.createElement("icon");

        


        anchor.innerHTML = repo.name;
        anchor.href = repo.url;
        p.innerHTML = repo.description || "Created with CodeSandbox";
        spanOne.style.backgroundColor = repo.primaryLanguage.color;
        spanTwo.innerHTML = repo.primaryLanguage.name;
        spanDate.innerHTML = `Updated on ${new Date(repo.updatedAt).toDateString().substring(4, 10)}`;

        // innerBtn.append(icon, "  Star");
        // console.log(innerBtn);

        h3.setAttribute("class", "repo-link pad");
        p.setAttribute("class", "repo-desc pad");
        spanOne.setAttribute("class", "repo-lang");
        icon.setAttribute("class", "far fa-star");
        spanThree.setAttribute("class", "second-span");
        div.setAttribute("class","repo-list-container pad");
        firstDiv.setAttribute("class", "first-div-wrapper");
        secondDiv.setAttribute("class", "second-div-wrapper");
        li.setAttribute("class", "list-repo-element")
        secondIcon.setAttribute("class", "far fa-star");


        innerBtn.append(secondIcon, "  Star");

        if(numStars){
            // spanFour.innerHTML = icon
            spanFive.innerHTML = numStars;

            h3.appendChild(anchor);
            span.append(spanOne, spanTwo);
            spanThree.append(icon, spanFive);
    
            div.append(span, spanThree, spanDate);
            firstDiv.append(h3, p, div);
            secondDiv.append(innerDiv, innerBtn);

            li.append(firstDiv, secondDiv);
            repoWrapper.appendChild(li)


        } else {
            h3.appendChild(anchor);
            span.append(spanOne, spanTwo);
            spanThree.append(spanFour, spanFive);
    
            div.append(span, spanThree, spanDate);
            firstDiv.append(h3, p, div);
            secondDiv.append(innerDiv, innerBtn);
            li.append(firstDiv, secondDiv);

            repoWrapper.appendChild(li)
        }
       
    })
}