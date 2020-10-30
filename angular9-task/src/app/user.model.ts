export class User{
    id : number;
    first_name : String;
    last_name : String;
    email : String;
    constructor(id :  number,first_name : String,last_name:String,email : String){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email
    }
}