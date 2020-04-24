import { Component, OnInit } from '@angular/core';
import { SpeechSupportService, RecognitionResult } from './speech-support.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'vivai-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss'],
})

export class SpeechComponent implements OnInit {
  title = 'speech-to-text';

  private targetElementName: string;
  private SelectedLanguage = 'fr-FR';
  public readonly messageHeardField = 'message';
  public readonly selectedLanguageFieldName = 'selectedLanguage';
  public messageDiv: FormGroup;

  public get Message(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }

constructor(private fb: FormBuilder, public speech: SpeechSupportService) {

}

public ngOnInit(): void {
  this.messageDiv = this.fb.group({
    message: [null]
  });

  this.speech.Result.subscribe((result: RecognitionResult) => {
    console.log('Result event on the controller.');
    console.log(result);
    console.log("dans la boucle subscribe");
    window.document.getElementById(this.targetElementName).focus();
    if (!result) {
      this.targetElementName = null;
      return;
    }
    if (this.targetElementName === this.messageHeardField) {
      console.log("dans le setValue");
      this.Message.setValue(result.transcript);
    }

    this.targetElementName = null;
  });
}


  public toggleListening(fieldSelected: string): void {
    this.targetElementName = fieldSelected;

    if (this.speech.IsListening) {
      this.speech.stopListening();
    } else {
      this.speech.requestListening(this.SelectedLanguage);
    }
  }
}
