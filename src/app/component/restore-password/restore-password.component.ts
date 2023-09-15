import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../core/service';
import {ToastrService} from 'ngx-toastr';
import {UserInterface} from "../../core/model/user.interface";

@Component({
    selector: 'app-restore-password',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent {
    formRestorePwd = this.formBuilder.group({
        email: ['', [Validators.email, Validators.required]],
    });

    constructor(private matDialogRef: MatDialogRef<RestorePasswordComponent>,
                private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
    }

    close() {
        this.matDialogRef.close({status: false});
    }

    sendEmail(): void {
        let user = this.formRestorePwd.value as UserInterface;
        this.authService.restoreAccount(user).subscribe(() => {
            this.matDialogRef.close({status: true, email: user.email});
        });
    }

    haveACode(): void {
        if (this.formRestorePwd.valid) {
            let email = this.formRestorePwd.controls['email'].value as string;
            this.matDialogRef.close({status: true, email: email});
        }
    }
}
