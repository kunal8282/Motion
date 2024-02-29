import { Client, Account, ID } from "appwrite";
import { config } from "./constants";


class AuthServices {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpointURL)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }


    async createAccount({name, email, password}) {
        try{
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            return userAccount
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const promise = await this.account.createEmailSession(email, password)
            return promise
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    async logout() {
        try{
            const promise = await this.account.deleteSessions();
            return promise;
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getUser() {
        try{
            return await this.account.get();
        }
        catch(error) {
            throw new Error('Appwrite Error :: Unable to get user details' + error.message)
        }
    }
}


const authServices = new AuthServices();


export default authServices;