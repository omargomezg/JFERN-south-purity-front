import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {matchValidator} from "../../core/match-validator";
import {AuthService} from "../../core/service";

@Component({
    selector: 'app-reset-pwd-modal',
    templateUrl: './reset-pwd-modal.component.html',
    styleUrls: ['./reset-pwd-modal.component.scss']
})
export class ResetPwdModalComponent {

    formPwd = this.formBuilder.group({
        password: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            matchValidator('confirmPassword', true)]
        ],
        confirmPassword: ['', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
            matchValidator('password')]]
    });

    constructor(private formBuilder: FormBuilder, public matDialogRef: MatDialogRef<ResetPwdModalComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private toastr: ToastrService,
                private authService: AuthService) {
    }

    submit(): void {
        const {password} = this.formPwd.value;
        this.authService.updatePassword({id: this.data.id, password: password}).subscribe(result => {
            this.toastr.success('Contraseña actualizada');
            this.matDialogRef.close();
            this.authService.logout();
        });
    }
}
