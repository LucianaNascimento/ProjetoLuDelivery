import { Tenant } from "@/types/Tenant"

export type DataType = {
  tenant: Tenant | null
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
  SET_TENANT
}