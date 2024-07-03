import { NgModule } from '@angular/core';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './screens/forgot-password/forgot-password.component';
import { HomeComponent } from './screens/home/home.component';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { SignInComponent } from './screens/sign-in/sign-in.component';
import { SignUpComponent } from './screens/sign-up/sign-up.component';

import { AccountsComponent } from './screens/accounts/accounts.component';
import { MenuSidebarComponent } from './components/menu-sidebar/menu-sidebar.component';
import { AccountComponent } from './components/account/account.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { TypeAccountsPipe } from './pipes/type-accounts.pipe';
import { genericErrorHandlingProviders } from './global-error-handler';
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    MenuSidebarComponent,
    AccountComponent,
    AccountsComponent,
    TypeAccountsPipe,
    ConfirmationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    AvatarGroupModule,
    AvatarModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DropdownModule,
    DialogModule,
    FloatLabelModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    PanelModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RippleModule,
    SidebarModule,
    SplitButtonModule,
    StyleClassModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  providers: [
    genericErrorHandlingProviders,
    httpInterceptorProviders,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
