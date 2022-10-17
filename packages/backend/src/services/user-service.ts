import { UserItem } from '@chat-app/shared'
import { saveUserItem } from '../models/user-repository'

export const saveUsuarioItem = async (UserItem: UserItem) : Promise<void> => {
    if(UserItem.username == "" || UserItem.password == "" ){
        throw new Error("Invalid username or password")
    }
    await saveUserItem(UserItem)
}