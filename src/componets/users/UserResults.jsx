import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner"
import UserItem from "./UserItem"

function UserResults() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const url = 'https://api.github.com'
    const token = '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'
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
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {!loading ? users.map(item => <UserItem key={item.id} user={item}/> ): <Spinner /> }
    </div>
  )
}
export default UserResults