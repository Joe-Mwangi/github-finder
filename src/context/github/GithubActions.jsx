import axios from "axios"

const url = import.meta.env.VITE_GITHUB_URL
const token = import.meta.env.VITE_GITHUB_TOKEN
const github = axios.create({
    baseURL: url,
    headers: {
        authorization: `token ${token}`
    }
})

//search users
  export async function searchUsers(text) {
    const params = new URLSearchParams({
        q: text
    })

    const response = await github.get(`/search/users?${params}`)    
    return response.data.items
  }

   //get repos
   export async function getUserAndRepos(login) {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos?${params}`)
    ])
    return {user: user.data, repos: repos.data}
  }


  