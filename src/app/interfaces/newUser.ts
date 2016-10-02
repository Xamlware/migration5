
 export interface INewUser {  
   identityId: string;
   emailAddress: string;
}

  export class NewUser {  
   identityId: string;
   emailAddress: string;

   constructor(id: string, email: string) {
     this.identityId = id;
     this.emailAddress = email;
   }
}