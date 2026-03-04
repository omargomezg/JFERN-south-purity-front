import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ContactService} from "../../core/service";
import {ToastrService} from "ngx-toastr";
import {ReCaptchaV3Service} from "ng-recaptcha";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
})
export class ContactComponent {
  private recaptchaV3Service = inject(ReCaptchaV3Service);
  public formContact: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private contactService: ContactService,
              private toastr: ToastrService) {
    this.formContact = this.buildForm();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      names: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      telephone: [''],
      message: ['', [Validators.required]]
    });
  }

  send(): void {
    this.recaptchaV3Service.execute('login')
      .pipe(take(1))
      .subscribe((token) => {
        console.log('Token de reCaptcha:', token);

        if (token) {
          this.proceedWithLogin(token);
        } else {
          console.error('Error al generar el token de reCaptcha');
        }
      });
  }

  proceedWithLogin(token: string) {
    this.contactService.sendContact(this.formContact.value).subscribe(() => this.toastr.success('Mensaje enviado correctamente'));
  }
}
