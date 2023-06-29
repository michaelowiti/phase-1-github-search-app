const fom=document.getElementById("github-form")
const search=document.querySelector("#search")

fom.addEventListener("submit",handleUserSubmission)



function handleUserSubmission(e){
    e.preventDefault()
// const searchVal=search.value
fetchSearchedUsers(search.value)
}

function fetchSearchedUsers(searchString){
    fetch(`https://api.github.com/search/users?q=${searchString}`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer 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`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((resp) => resp.json())
    .then((data) =>displayDom(data.items))
}

function displayDom(users){
    
    const usersList= document.getElementById("user-list")
    users.forEach(user => {
        const li=document.createElement("li")
        const div=document.createElement("div")
        const h1=document.createElement("h1")
        const image=document.createElement("img")
        const a=document.createElement("a")

        h1.textContent=user.login 
        h1.addEventListener("click",handleRepos)
        image.src=user.avatar_url
        a.href=user.html_url
        a.textContent=user.login
        div.append(h1)
        div.append(image)
        div.append(a)
        li.append(div)

        usersList.append(li)

                
    });
}


function handleRepos(e){
    e.preventDefault()
    fetchUserRepos(e.target.textContent)
    

}

function fetchUserRepos(userName){
    fetch(`https://api.github.com/users/${userName}/repos`, {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer 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`,
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => renderUserRepos(data));
}

function renderUserRepos(repos){
console.log(repos);
  
      const ul = document.getElementById("repos-list");
repos.forEach(repo => {
  const li = document.createElement("li");
  li.textContent = repo.full_name
  ;
  ul.appendChild(li);
});     
  
    
}