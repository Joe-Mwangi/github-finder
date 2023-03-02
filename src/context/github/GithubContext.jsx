import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

export const GithubContext = createContext()

const url = import.meta.env.VITE_GITHUB_URL
const token = import.meta.env.VITE_GITHUB_TOKEN

export default function GithubProvider({children}) {
  const initialState = {
    users: [],
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
            searchUsers,
            clearUsers
        }}
        >
            {children}
        </GithubContext.Provider>
    )
}
