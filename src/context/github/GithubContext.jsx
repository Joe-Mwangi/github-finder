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

 //for testing purposes
  async function fetchUsers() {
    setLoading()
    const options = {
        headers: {
            authorization: `token ${token}`
        }
    }
    const response = await fetch(`${url}/users`, options)    
    const data = await response.json()  
    const usersData = data.map(item => {
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
    return (
        <GithubContext.Provider value={{
            users: state.users,
            loading: state.loading,
            // fetchUsers
        }}
        >
            {children}
        </GithubContext.Provider>
    )
}
