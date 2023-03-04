import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

export const GithubContext = createContext()

const url = import.meta.env.VITE_GITHUB_URL
const token = import.meta.env.VITE_GITHUB_TOKEN

export default function GithubProvider({children}) {
  const initialState = {
    users: [],
    repos: [],
    user: {},
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

 //search users
  async function searchUsers(text) {
    setLoading()
    const params = new URLSearchParams({
        q: text
    })
    const options = {
        headers: {
            authorization: `token ${token}`
        }
    }
    const response = await fetch(`${url}/search/users?${params}`, options)    
    const {items} = await response.json()  
    const usersData = items.map(item => {
        return {
            id: item.id,
            avatar: item.avatar_url,
            url: item.url,
            repos: item.repos_url,
            login: item.login
        }
    }) 
     dispatch({type: 'get_users', payload: usersData})
  }

   //get repos
   async function getUserRepos(login) {
    setLoading()

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const options = {
        headers: {
            authorization: `token ${token}`
        }
    }
    const response = await fetch(`${url}/users/${login}/repos?${params}`, options)    
    const data = await response.json()  
     dispatch({type: 'get_repos', payload: data})
  }

   //get single user
   async function getUser(user) {
    setLoading()
    const options = {
        headers: {
            authorization: `token ${token}`
        }
    }
    const response = await fetch(`${url}/users/${user}`, options)  
    if(!response.ok) {
      window.location = '/notfound'
    }  else {
      const userData = await response.json()  
       dispatch({type: 'get_single_user', payload: userData})
    }
  }

  //seting loading state
  function setLoading() {
    dispatch({type: 'set_loading'})
  }
  function clearUsers() {
    return dispatch({type: 'clear_users'})
  }
    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            user: state.user,
            repos: state.repos,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos
        }}
        >
            {children}
        </GithubContext.Provider>
    )
}
