import { useState, useContext } from "react"
import { GithubContext } from "../../context/github/GithubContext"
import { AlertContext } from "../../context/alert/AlertContext"

function UserSearch() {
  const [text, setText] = useState('')
  const {
    users, 
    searchUsers,
    clearUsers
} = useContext(GithubContext)

const {setAlert} = useContext(AlertContext)
  
  function handleChange(e) {
    setText(e.target.value)
  }

  function handleSubmit(e) {
      e.preventDefault()
      if(text === '') {
          setAlert('Please enter something', 'error')
        } else {
            searchUsers(text)
            setText('')
        }
  }

  function handleClick() {
      console.log('clicked')
      clearUsers()
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-col-2 xl:grid-cols-2 gap-8 mb-8'>
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <div className="relative">
                    <input type="text" value={text} onChange={handleChange} placeholder="Searchs " className="w-full pr-40 bg-gray-200 input input-lg text-black" />
                    <button type="submit" className="btn absolute top-0 right-0 btn-lg w-36 rounded-l-none">Go</button>
                </div>
            </div>
        </form>
        {users.length > 0 && (
            <button onClick={handleClick} className="btn btn-ghost btn-lg">Clear</button>
        )}
    </div>
  )
}
export default UserSearch