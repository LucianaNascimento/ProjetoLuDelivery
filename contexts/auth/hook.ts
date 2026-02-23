import { useContext } from "react"
import { AppContext } from "."
import { Actions } from "./types"

export const useAuthContext = () => {
  const {state, dispatch} = useContext(AppContext)

  return {
    ...state,
    setToken: (token: string) => dispatch({type: Actions.SET_TOKEN, payload: {token}}),
    setUser: (user: any) => dispatch({type: Actions.SET_USER, payload: {user}})
  }
}