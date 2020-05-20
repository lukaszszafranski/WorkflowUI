import { Component, OnInit, NgZone } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit{
  username: string;

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  // tslint:disable-next-line: member-ordering
  title = 'ClientApp';
  // tslint:disable-next-line: no-inferrable-types
  // tslint:disable-next-line: member-ordering
  txtMessage: string = '';
  // tslint:disable-next-line: member-ordering
  uniqueID: string = new Date().getTime().toString();
  // tslint:disable-next-line: member-ordering
  messages = new Array<Message>();
  // tslint:disable-next-line: member-ordering
  message = new Message();
  constructor(
    private chatService: ChatService,
    // tslint:disable-next-line: variable-name
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.clientuniqueid = this.uniqueID;
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {

    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        if (message.clientuniqueid !== this.uniqueID) {
          message.type = 'received';
          this.messages.push(message);
        }
      });
    });
  }
}
