
export type FlexibleObject = { [key: string]: any }

export type APIResponseType = {
    error: boolean
    message: string
} & FlexibleObject