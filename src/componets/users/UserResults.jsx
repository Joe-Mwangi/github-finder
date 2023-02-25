import { useEffect, useState } from "react"
import Spinner from "../layout/Spinner"

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
        {!loading ? users.map(item => {
       return (
        <div className="flex gap-2 items-center shadow-md rounded-sm p-2" key={item.id}>
            <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover object-center" />
            <div className="flex flex-col justify-between">
                <h2 className="text-lg">{item.login}</h2>
                <a href={item.url} className='text-sm capitalize' >visit profile</a>
            </div>
       </div>
       )

        }): <Spinner /> }
    </div>
  )
}
export default UserResults