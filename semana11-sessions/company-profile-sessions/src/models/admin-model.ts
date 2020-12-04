import * as dbConnection from "./db-connection"
import {config} from "../../conf/config"

export class Admin {
    id: number
    email: string
    name: string
    password: string

    constructor(email: string, password: string) {
        this.id = 0
        this.email = email
        this.name = ""
        this.password = password
    }

    isValid() {
        return this.email.length > 0 && this.password.length > 0
    }
}

export class AdminDAO {
    private static instance: AdminDAO

    private constructor() {}

    static getInstance() {
        if (!this.instance) {
            this.instance = new AdminDAO()
        }
        return this.instance
    }
    
    getCollection() {
        return dbConnection.getDb().collection(config.db.collections.admins)
    }

    async findByEmail(email: string) {
        try {
            const response = await this.getCollection().findOne({email: email})

            if (response) {
                return response as Admin
            }
            throw Error("Failed to retrieve admin with given email")
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}