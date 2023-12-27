let form = document.getElementById('github-form') // event listener for form submission
 form.addEventListener('submit', (e) => {
 e.preventDefault();
 let value = e.target.search.value 
 form.reset()
 listUser(value)})


 function listUser(value) {// lists users 
    fetch(`https://api.github.com/search/users?q=${value}`)
    .then((resp) => resp.json())
    .then((users) => {
        console.log(users.items)
        let userArr = users.items
        userArr.forEach(user => {
            let ul = document.getElementById('user-list')
            const li = document.createElement('li')
            const img = document.createElement('img')
            img.src = user.avatar_url
            const a = document.createElement('a')
            a.href = user.html_url
            a.textContent = user.login

            li.append(a , img)
            ul.appendChild(li)

            img.addEventListener('click', () => {               
            let reposList = document.getElementById('repos-list')
            reposList.textContent = ''
           
    fetch(`https://api.github.com/users/${user.login}/repos`) // fetch repos for each user
    .then((resp) => resp.json())
    .then((repos) => {
                                                                
            repos.forEach((repo) => {
            let a = document.createElement('a')
            let li = document.createElement('li')
            a.href = repo.html_url
            a.textContent = repo.html_url
            li.append(a)
            reposList.append(li)
                            
            })
        })
                
    })
})
})
}






