import { connect, model, Schema } from "mongoose"
import { UserItem } from '@chat-app/shared'
const bcrypt = require('bcrypt')

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

export const setupUser = async (url: string) => {
    await connect(url)
}

export const loadUserByUsername = async (username: string): Promise<UserInfo | null> => {
    return await UserInfoModel.findOne({ username: username }).exec()
}


export const saveUserItem = async (userItem: UserItem): Promise<void> => {

    const username = userItem.username
    const password = await bcrypt.hash(userItem.password, 10)


    const newModel = new UserInfoModel({ username, password })
    await newModel.save()
}

export const checkUser = async (
    user: UserItem): Promise<UserItem | null> => {
    const findUser = await UserInfoModel.findOne({ username: user.username });
    if (findUser && (await bcrypt.compare(user.password, findUser.password))) {
        return findUser;
    } else {
        return null;
    }
}
