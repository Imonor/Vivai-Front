import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

export interface AppWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
  msSpeechRecognition: any;
}

const { webkitSpeechRecognition }: AppWindow = <AppWindow>window;
const { SpeechRecognition }: AppWindow = <AppWindow>window;
const { msSpeechRecognition }: AppWindow = <AppWindow>window;


@Injectable({
  providedIn: 'root'
})
export class SpeechSupportService {

  private isListening: boolean;
  private supportRecognition: boolean;
  private speech: any;
  private lastResult: RecognitionResult = null;
  private snackOpened: MatSnackBarRef<SimpleSnackBar>;

  public get IsListening(): boolean {
    return this.isListening;
  }

  public get SupportRecognition(): boolean {
    return this.supportRecognition;
  }

  public Result: EventEmitter<RecognitionResult> = new EventEmitter<RecognitionResult>();



  constructor(public dialog: MatDialog, private zone: NgZone, private snackBar: MatSnackBar) {
    this.init();
  }

  private init(): void {
    this.supportRecognition = true;
    console.log(window['SpeechRecognition']);

    if (window['webkitSpeechRecognition']) {
      this.speech = new webkitSpeechRecognition();
    } else {
      this.supportRecognition = false;
    }
    console.log(`Speech supported: ${this.supportRecognition}`);
  }

  private setupListener(selectedLanguage: string): void {
    this.speech.lang = selectedLanguage; //'en-US' 'pt-BR' 'it-IT'
    this.speech.interimResults = false; // We don't want partial results
    this.speech.maxAlternatives = 1; // By now we are interested only on the most accurate alternative

    if (!this.speech.onstart) {
      this.speech.onspeechstart = (event) => { this.handleSpeechStart(event) };
    }

    if (!this.speech.onresult) {
      // VERY IMPORTANT: To preserve the lexical scoping of 'this' across closures in TypeScript, you use Arrow Function Expressions
      this.speech.onresult = (event) => { this.handleResultevent(event) };
    }

    if (!this.speech.onend) {
      // VERY IMPORTANT: To preserve the lexical scoping of 'this' across closures in TypeScript, you use Arrow Function Expressions
      this.speech.onend = (event) => { this.handleEndEvent(event) };
    }

    if (!this.speech.onspeechend) {
      // VERY IMPORTANT: To preserve the lexical scoping of 'this' across closures in TypeScript, you use Arrow Function Expressions
      this.speech.onspeechend = (event) => { this.handleSpeechEndEvent(event) };
    }

    if (!this.speech.nomatch) {
      // VERY IMPORTANT: To preserve the lexical scoping of 'this' across closures in TypeScript, you use Arrow Function Expressions
      this.speech.nomatch = (event) => { this.handleNoRecognitionAvaliable(event) };
    }

  }
  handleSpeechStart(event: any): void {
    this.lastResult = null;
    console.log('Listening...');
    this.snackOpened = this.snackBar.open('Listening...');
  }

  handleNoRecognitionAvaliable(event: any): any {
    console.log('no recognition');
  }

  private handleResultevent(event: any): void {
    console.log('Handling recognition event.')
    const result = event.results[0][0];
    this.lastResult = { transcript: result.transcript };

    console.log(this.lastResult);
  }

  private handleEndEvent(event: any): void {
    console.log('Handling end event.')
    console.log(event);
    this.isListening = false;
    if (this.lastResult) {
      (() => { this.showDialog(this.lastResult) })();
    } else {
      this.Result.emit(null);
    }
    this.lastResult = null;
    if (this.snackOpened) {
      this.snackOpened.dismiss();
    }
  }

  private handleSpeechEndEvent(event: any): void {
    console.log('Handling speech end event.')
    console.log(event);
    this.isListening = false;
  }

  public requestListening(selectedLanguage: string): void {
    this.isListening = true;
    this.setupListener(selectedLanguage);
    this.speech.start();
    console.log('Request listening');
  }

  public stopListening(): void {
    this.isListening = false;
    this._speech.stop();
    console.log('Listening stopped');
  }
}

export interface RecognitionResult {
  transcript: string;
}
