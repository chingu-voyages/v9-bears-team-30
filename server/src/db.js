import mongoose from "mongoose"
import MongoMemoryServer from "mongodb-memory-server"

import User from "./models/user"
import { resolve } from "url";

export async function mockData() {
    const mockUser = await User.create({
        _id: mongoose.Types.ObjectId(),
        username: "Jack Foo",
        email: "jfoo@bar.com",
        password: "fooyou"
    })
}

export async function setupDb() {
    const mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getConnectionString()
    mongoose.connect(mongoUri, { useNewUrlParser: true })
    const conn = new Promise((resolve, reject) => {
        mongoose.connection
        .on("error", err => {
            reject(err)
        })
        .once("open", () => {
            return resolve()
        })
    })
    return conn
}
