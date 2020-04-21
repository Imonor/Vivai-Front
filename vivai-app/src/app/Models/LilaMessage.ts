class LilaMessage {

  message: string;
  fromUser: boolean;

  constructor(theMessage: string, fromUser: boolean) {
    this.message = theMessage;
    this.fromUser = fromUser;
  }

  displayMessage() {
    console.log('Message : ' + this.message);
  }



}
