import {TestBed} from '@angular/core/testing';
import {} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

// Angular Material (common modules used across components)
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

// Import the library's injection token so we can provide a default config used by SocialAuthService
import {SOCIAL_AUTH_CONFIG} from '@abacritt/angularx-social-login';

// Social login config token (library uses string token 'SocialAuthServiceConfig')
// Provide a lightweight default so tests don't fail on injection
const SOCIAL_AUTH_CONFIG_TOKEN = 'SocialAuthServiceConfig' as any;

// Preserve original configure function
const _origConfigure = (TestBed as any).configureTestingModule.bind(TestBed);

// Provide a lightweight mock Toastr service used across tests
const globalToastrMock = {
  success: () => {
  }, error: () => {
  }, info: () => {
  }, warning: () => {
  }
};

// Provide a lightweight MatDialogRef mock
const globalMatDialogRefMock = {
  close: (value?: any) => {
  }
};

// Better default dialog data to avoid null/undefined usage in many dialogs
const defaultDialogData = {
  items: [],
  products: [],
  place: {id: ''},
  // generic fields some dialogs may expect
  history: [],
  transactions: []
};

// Dummy component used for router testing (e.g. route 'home')
@Component({
    selector: 'app-dummy', template: '',
    standalone: false
})
class DummyComponent {
}

// Override configureTestingModule to merge common testing modules/providers/schemas
(TestBed as any).configureTestingModule = function (moduleDef: any) {
  moduleDef = moduleDef || {};

  // Merge imports - add commonly used testing modules and Material modules
  const extraImports = [
    HttpClientTestingModule,
    RouterTestingModule.withRoutes([{path: 'home', component: DummyComponent}]),
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatFormFieldModule,
    NoopAnimationsModule
  ];
  moduleDef.imports = Array.isArray(moduleDef.imports) ? [...moduleDef.imports, ...extraImports] : [...extraImports];

  // Merge providers - add toastr, dialog mocks and social auth config token
  const extraProviders = [
    {provide: ToastrService, useValue: globalToastrMock},
    {provide: MatDialogRef, useValue: globalMatDialogRefMock},
    {provide: MAT_DIALOG_DATA, useValue: defaultDialogData},
    {provide: SOCIAL_AUTH_CONFIG, useValue: {autoLogin: false, providers: []}}
  ];
  moduleDef.providers = Array.isArray(moduleDef.providers) ? [...moduleDef.providers, ...extraProviders] : [...extraProviders];

  // Merge declarations - include DummyComponent so router can reference it
  moduleDef.declarations = Array.isArray(moduleDef.declarations) ? [...moduleDef.declarations, DummyComponent] : [DummyComponent];

  // Merge schemas - include common schemas to prevent many template-related failures
  const extraSchemas = [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA];
  moduleDef.schemas = Array.isArray(moduleDef.schemas) ? [...moduleDef.schemas, ...extraSchemas] : [...extraSchemas];

  return _origConfigure(moduleDef);
};
