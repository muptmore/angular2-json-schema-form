import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { JsonSchemaFormService } from '../../library/json-schema-form.service';

@Component({
  selector: 'material-file-widget',
  template: `
    <div layout="row" [class]="options?.htmlClass">
      <td-file-upload #singleFileUpload (select)="selectEvent($event)" (upload)="uploadEvent($event)" [disabled]="disabled">
        <md-icon>file_upload</md-icon><span>{{ singleFileUpload.files?.name }}</span>
        <template td-file-input-label>
          <md-icon>attach_file</md-icon><span>Choose a file...</span>
        </template>
      </td-file-upload>
    </div>`,
})
export class MaterialFileComponent implements OnInit {
  private formControl: AbstractControl;
  private controlName: string;
  private controlValue: any;
  private controlDisabled: boolean = false;
  private boundControl: boolean = false;
  private options: any;
  @Input() formID: number;
  @Input() layoutNode: any;
  @Input() layoutIndex: number[];
  @Input() dataIndex: number[];


  private fileSelectMsg: string = 'No file selected yet.';
  private fileUploadMsg: string = 'No file uploaded yet.';

  constructor(
    private jsf: JsonSchemaFormService
  ) { }

  ngOnInit() {
    this.options = this.layoutNode.options;
    this.jsf.initializeControl(this);
  }

  private updateValue(event) {
    this.jsf.updateValue(this, event.target.value);
  }

  selectEvent(file: File): void {
    this.fileSelectMsg = file.name;
  };

  uploadEvent(file: File): void {
    this.fileUploadMsg = file.name;
  };
}
