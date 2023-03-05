import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

export const GithubContext = createContext()


export default function GithubProvider({children}) {
  const initialState = {
    users: [],
    repos: [],
    user: {},
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

 
    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch
        }}
        >
            {children}
        </GithubContext.Provider>
    )
}
