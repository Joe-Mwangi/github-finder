import { createContext, useReducer } from "react"
import alertReducer from "./AlertReducer"

export const  AlertContext = createContext()

function AlertProvider({children}) {
  const initialState = null
  const [state, dispatch] = useReducer(alertReducer, initialState)

  function setAlert(msg, type) {
    dispatch({type: 'set_alert', payload: {msg, type}})
    setTimeout(() => {
        dispatch({type: 'remove_alert'})
    } ,3000)
  }

  return (
    <AlertContext.Provider value={{
        alert: state,
        setAlert
    }}>
        {children}
    </AlertContext.Provider>
  )
}
export default AlertProvider