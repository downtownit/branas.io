export default class User {
    constructor (readonly email: string, readonly pwd: string){
    }

    getEmail () {
        return this.email;
    }
}
