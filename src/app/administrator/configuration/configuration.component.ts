import {Component, OnInit} from '@angular/core';
import {ConfigurationInterface} from "../../core/model/configuration.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommonAdminService, EmailService} from "../../core/service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configuration = {} as ConfigurationInterface;
  configurationForm: FormGroup;
  emailAddress?: string;

  constructor(private formBuilder: FormBuilder,
              private commonService: CommonAdminService,
              private emailService: EmailService,
              private toastr: ToastrService) {
    this.configurationForm = this.buildForm();
  }

  ngOnInit(): void {
    this.commonService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;
      this.configurationForm.controls['id'].setValue(configuration.id);
      this.configurationForm.controls['siteName'].setValue(configuration.siteName);
      this.configurationForm.controls['price'].setValue(configuration.price);
      this.configurationForm.controls['priceWithDrum'].setValue(configuration.priceWithDrum);
      this.configurationForm.controls['timeToPay'].setValue(this.toMinutes(configuration.timeToPay));
      this.configurationForm.controls['returnUrl'].setValue(configuration.returnUrl);
      if (configuration.smtp) {
        this.emailAddress = configuration.smtp.username;
        this.configurationForm.controls['smtp'].setValue({
          host: configuration.smtp.host,
          port: configuration.smtp.port,
          username: configuration.smtp.username,
          password: configuration.smtp.password,
          protocol: configuration.smtp.protocol,
          auth: configuration.smtp.auth,
          starttlsEnable: configuration.smtp.starttlsEnable,
          starttlsRequired: configuration.smtp.starttlsRequired
        });
      }
    });
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      siteName: ['Pureza del Sur', [Validators.required]],
      price: [0, [Validators.required]],
      priceWithDrum: [0, [Validators.required]],
      returnUrl: ['http://localhost:4200', [Validators.required]],
      timeToPay: [0, [Validators.required]],
      createdDate: [null],
      updatedAt: [null],
      smtp: this.formBuilder.group({
        host: ['smtp.gmail.com', [Validators.required]],
        port: [587, [Validators.required]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        protocol: ['smtp', [Validators.required]],
        auth: [true, [Validators.required]],
        starttlsEnable: [true, [Validators.required]],
        starttlsRequired: [true, [Validators.required]]
      })
    });
  }

  submit(): void {
    this.commonService.putConfiguration(this.configurationForm.value as ConfigurationInterface).subscribe(result => {
      this.toastr.success('Configuración actualizada');
    });
  }

  toMinutes(milliseconds: number): number {
    return Math.floor((milliseconds / 1000 / 60) % 60);
  }

  callTask(): void {
    this.commonService.getnetProcessPending().subscribe(() => this.toastr.success('Se ha iniciado el proceso de sincronización'));
  }

  sendEmail() {
    if (this.emailAddress) {
      this.emailService.sendTestEmail(this.emailAddress as string).subscribe(() => this.toastr.success('Se ha enviado el' +
          ' correo de prueba'),
        (error) => {
          console.log(error);
          this.toastr.error(error, 'No se ha podido enviar el correo de prueba')
        });
    }
  }
}
