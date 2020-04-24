import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LilaMessage } from '../Models/lila-message';
import { SpeechSupportService, RecognitionResult } from '../service/speech-support.service';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'vivai-lila',
  templateUrl: './lila.component.html',
  styleUrls: ['./lila.component.scss']
})
export class LilaComponent implements OnInit {
  messages = [];
  private targetElementName: string;
  private SelectedLanguage = 'fr-FR';
  public readonly messageHeardField = 'message';
  public readonly selectedLanguageFieldName = 'selectedLanguage';
  public messageDiv: FormGroup;

  public get Message(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }

  constructor(public dialogRef: MatDialogRef<LilaComponent>, public router: Router,
              private fb: FormBuilder, public speech: SpeechSupportService) { }

  ngOnInit() {
    this.messageDiv = this.fb.group({
      message: [null]
    });

    this.speech.Result.subscribe((result: RecognitionResult) => {
      console.log('Result event on the controller.');
      console.log(result);
      console.log('target : ' + this.targetElementName);
      window.document.getElementById(this.targetElementName).focus();
      if (!result) {
        this.targetElementName = null;
        return;
      }
      if (this.targetElementName === this.messageHeardField) {
        this.Message.setValue(result.transcript);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  sendMessage(message: string) {
    if (message) {
      this.messages.push(new LilaMessage(message, true));
      this.Message.setValue(null);
    }
  }

  receiveMessage(message: string) {
    if (message) {
      this.messages.push(new LilaMessage(message, false));
    }
  }

  public toggleListening(fieldSelected: string): void {
    this.targetElementName = fieldSelected;
    console.log('field selected : ' + fieldSelected);

    if (this.speech.IsListening) {
      this.speech.stopListening();
    } else {
      this.speech.requestListening(this.SelectedLanguage);
    }
  }
}

