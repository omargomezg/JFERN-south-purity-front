import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterModel} from "../../core/model";
import {AuthService} from "../../core/service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm = this.formBuilder.group({
            rut: [''],
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            city: ['', Validators.required],
            address: ['', Validators.required],
            telephone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
        },
        {
            validators: this.password.bind(this)
        });

    constructor(private formBuilder: FormBuilder, private authService: AuthService,
                private toastr: ToastrService, private router: Router) {
    }

    password(formGroup: FormGroup) {
        const {password} = formGroup.get('password')?.value;
        const {confirmPassword} = formGroup.get('confirmPassword')?.value;
        return password === confirmPassword ? null : {passwordNotMatch: true};
    }

    submit(): void {
        let register = this.registerForm.value as RegisterModel;
        register.role = 'CUSTOMER';
        this.authService.register(register).subscribe(() => {
            this.toastr.success('Genial, ya tienes tu cuenta.');
            let cart = localStorage.getItem('cart');
            if (cart != null) {
                this.router.navigate(['/hacer-pedido']);
            } else {
                this.router.navigate(['/mis-pedidos']);
            }
        }, error => {
            console.log(error);
            this.toastr.error('Ocurrió un error al registrarte, intenta nuevamente.', error);
        })
    }

}
