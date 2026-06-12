import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {IDialogPasswordReset} from "./IDialogPasswordReset";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {CommonAdminService} from "../../core/service";

@Component({
  selector: 'app-dialog-password-reset',
  standalone: true,
  imports: [
    MatDialogModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './dialog-password-reset.component.html',
  styleUrl: './dialog-password-reset.component.scss'
})
export class DialogPasswordResetComponent {
  formPwd = this.formBuilder.group({
    id: '',
    password: '',
  })

  constructor(public dialogRef: MatDialogRef<DialogPasswordResetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: IDialogPasswordReset,
              private formBuilder: FormBuilder,
              private service: CommonAdminService,
  ) {
  }

  randomPassword(): void {
    let pwd = Math.random().toString(36).slice(2, 12);
    this.formPwd.controls['password'].setValue(pwd);
  }

  update() {
    this.service.updatePwd(
      this.data.id,
      this.formPwd.controls['password'].value as string
    ).subscribe(() => {
      this.dialogRef.close(this.formPwd.value);
    })

  }
}
