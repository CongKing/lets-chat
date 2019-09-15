import {decorateorApi} from './api-decorator'
import {
    login as rawLogin,
    signup as rawSignup,
    getContacts as rawGetContacts
} from './api-raw'

export const signup = decorateorApi(rawSignup)
export const login = decorateorApi(rawLogin)
export const getContacts = decorateorApi(rawGetContacts)

