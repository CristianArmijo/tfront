import { Status } from './Status';

export class UserStory {
    subject: string;
    name: string;
    username: string;
    photo: string;
    status: Status;

    constructor() {
        this.subject = "";
        this.name = "";
        this.username = "";
        this.photo = "";
        this.status = new Status();
    }
  }
  

