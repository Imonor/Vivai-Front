import { Component, OnInit, ChangeDetectorRef, EventEmitter, OnChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LilaMessage } from '../models/lila-message';
import { SpeechSupportService, RecognitionResult } from '../services/speech-support.service';
import { FormGroup, FormBuilder, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MediaMatcher } from '@angular/cdk/layout';
import { PlantService } from 'src/app/services/plant.service';
import { userInfo } from 'os';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'vivai-lila',
  templateUrl: './lila.component.html',
  styleUrls: ['./lila.component.scss']
})
export class LilaComponent implements OnInit {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  messages = [];
  plants = ['Autre demande', 'Basilic', 'Tulipe', 'Pommier'];
  private targetElementName: string;
  private SelectedLanguage = 'fr-FR';
  public readonly messageHeardField = 'message';
  public readonly selectedLanguageFieldName = 'selectedLanguage';
  public messageDiv: FormGroup;


  public get Message(): AbstractControl {
    return this.messageDiv.get(this.messageHeardField);
  }

  constructor(public dialogRef: MatDialogRef<LilaComponent>, public router: Router,
              private fb: FormBuilder, public speech: SpeechSupportService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _plantService: PlantService,
              private _notification: NotificationService, ) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

    }

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

    let plantList = this._plantService.getListUserPlants();

  }

  close() {
    this.dialogRef.close();
  }

  sendMessage(message: string) {
    if (message) {
      this.messages.unshift(new LilaMessage(message, true));
      this.Message.setValue(null);
      this.getLilaResponse(message);
    }
  }

  receiveMessage(message: string) {
    if (message) {
      this.messages.unshift(new LilaMessage(message, false));
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

  getLilaResponse(userMessage) {
    this.speech.getLilaResponse(userMessage).subscribe(data => {
      console.log(data);
      this.receiveMessage(data.Response);
    });

    }
}

