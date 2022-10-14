import { connect, model, Schema } from "mongoose"
import { UserItem }  from '@chat-app/shared'

export interface UserInfo {
    username: string,
    password: string,
    name: string,
    roles: string[],
 
}

const UserInfoSchema = new Schema({
    username: String,
    password: String,
    roles: Array<String>,
  
})

const UserInfoModel = model<UserInfo>('UserInfo', UserInfoSchema)

export const setupUser = async (url: string)=> {
    await connect(url)
}

export const loadUserByUsername = async (username: string): Promise<UserInfo | null> => {
    return await UserInfoModel.findOne({username: username}).exec()
}

// export const loadUserByUsername = async (): Promise<UserItem[]> => {
//     return UserInfoModel.find({}).exec()
// }

// export const saveUserItem = async (userItem: UserItem): Promise<void> =>{
//     const newModel = new UserInfoModel(userItem)
//     newModel.save()
// } 
