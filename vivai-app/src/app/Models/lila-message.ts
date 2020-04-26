export class LilaMessage {

    message: string;
    fromUser: boolean;

    constructor(theMessage: string, User: boolean) {
      this.message = theMessage;
      this.fromUser = User;
    }

    displayMessage() {
      console.log('Message : ' + this.message);
    }



  }


