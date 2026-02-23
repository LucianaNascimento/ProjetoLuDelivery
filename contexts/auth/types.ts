
import { User } from "@/types/User"

export type DataType = {
  token: string
  user: User | null  
}

export type ActionType = {
  type: Actions
  payload?: any
}

export type ContextType = {
  state: DataType
  dispatch: React.Dispatch<ActionType>
}

export type ProviderType = {
  children: React.ReactNode
}

export enum Actions {
  SET_TOKEN,
  SET_USER
}