export interface IUser {
    username: string;
    email: string;
    password: string;
    profilePicture: string
}

export interface IUserQueryProps { 
    queryType: "username" | "id", 
    queryValue: string 
}