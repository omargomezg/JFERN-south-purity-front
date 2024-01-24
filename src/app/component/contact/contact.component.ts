import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactService} from "../../core/service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

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
        this.contactService.sendContact(this.formContact.value).subscribe(() => this.toastr.success('Mensaje enviado correctamente'));
    }
}
