export class User{
    id:string;
    // name: string;
    password: string;
    groups: string[]=[];
}

export class Group{
    _id?:string;
    name: string;
    creator: string;
    users: string[]=[];
    description: string="";
    folders:Folder[]=[];
}

export class Folder{
    id: string;
    name: string;
    description: string="";
    posts: Post[]=[];
}

export class Post{
    userid: string;
    text: string;
}