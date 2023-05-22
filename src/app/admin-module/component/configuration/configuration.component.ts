import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CommonAdminService} from "../../service/common-admin.service";
import {ConfigurationInterface} from "../../service/interface/configuration.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configuration = {} as ConfigurationInterface;
  configurationForm = this.formBuilder.group({
    price: [0, [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private commonService: CommonAdminService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.commonService.getConfiguration().subscribe(configuration => {
      this.configuration = configuration;
      this.configurationForm.controls['price'].setValue(configuration.price);
    });
  }

  submit(): void {
    this.configuration.price = this.configurationForm.controls['price'].value as number;
    this.commonService.putConfiguration(this.configuration).subscribe(result => {
      this.toastr.success('Configuración actualizada');
    });
  }
}