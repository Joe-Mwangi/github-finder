import { createContext, useState } from "react";

export const GithubContext = createContext()

const url = 'https://api.github.com'
const token = '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'

export default function GithubProvider({children}) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)


  async function fetchUsers() {
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
    setUsers(usersData)   
    setLoading(false)   
  }
    return (
        <GithubContext.Provider value={{
            fetchUsers,
            users,
            loading
        }}
        >
            {children}
        </GithubContext.Provider>
    )
}


