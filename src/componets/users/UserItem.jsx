import { Link } from "react-router-dom"

function UserItem({user: {avatar_url, login}}) {
  return (
    <div className="card compact side bg-base-100 shadow-md">
        <div className="flex-row items-center space-x-4 card-body">
            <img src={avatar_url} alt="Profile" className="w-14 h-14 rounded-full avatar" />
            <div className="flex flex-col justify-between">
                <h2 className="card-title">{login}</h2>
                <Link to={`/user/${login}`} className='text-base-content text-opacity-40 capitalize' >visit profile</Link>
            </div>
        </div>
    </div>
  ) 
}

export default UserItem