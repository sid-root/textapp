import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ListboxModule} from 'primeng/listbox';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatMenuModule} from '@angular/material/menu';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccordionModule } from 'primeng/accordion';
import { AddgroupdialogComponent } from './home/addgroupdialog/addgroupdialog.component'
import { HomeComponent } from './home/home.component';
import { GroupInfoComponent } from './home/group-info/group-info.component';
import { FoldersComponent } from './home/folders/folders.component';
import { AddfolderdlgComponent } from './home/folders/addfolderdlg/addfolderdlg.component';
import { WebsocketService } from './websocket.service';
import { GroupInfoDialogComponent } from './home/group-info/group-info-dialog/group-info-dialog.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AddgroupdialogComponent,
    GroupInfoComponent,
    FoldersComponent,
    AddfolderdlgComponent,
    GroupInfoDialogComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent
  ],
  imports: [
    AccordionModule,
    BrowserModule,
    InputTextModule,
    ListboxModule,
    HttpClientModule,
    PanelModule,
    CardModule,
    InputTextareaModule,
    ButtonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatGridListModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
