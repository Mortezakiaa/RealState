import { compare, hash } from "bcryptjs"

export async function HashedPassword(Pass){
    const HashedPass = await hash(Pass , 12)
    return HashedPass
}

export async function verifyPass(password , hashedPass){
    const isValid = await compare(password,hashedPass)
    return isValid
}