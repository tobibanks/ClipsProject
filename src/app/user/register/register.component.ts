import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import IUser from 'src/app/models/user.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService){
  }
  inSubmission =false;
  
  
  name= new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ])
  email= new FormControl('',[
    Validators.required,
    Validators.email
  ])
  age= new FormControl<number | null>(null,[
    Validators.required,
    Validators.min(18),
    Validators.max(100)
  ])
  password= new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  ])
  confirm_password= new FormControl('', [
    Validators.required
  ])
  phoneNumber= new FormControl('', [
    Validators.required,
    Validators.minLength(11),
    Validators.maxLength(11)
  ])
  
  showAlert= false;
  alertMsg = 'Please wait, your account is being created'
  alertColor = 'blue'
  
registerForm = new FormGroup({
 
  name: this.name,
  email: this.email,
  age:this.age,
  password: this.password,
  confirm_password: this.confirm_password,
  phoneNumber: this.phoneNumber
})

async register(){
  this.showAlert = true;
  this.alertMsg = 'Please wait, your account is being created'
  this.alertColor = 'blue';
  inSubmission: true
 
  
  try{
  await this.auth.createUser(this.registerForm.value as IUser) 
  }
  catch(e){
    console.error(e);
    this.alertMsg = 'An unexpected error occurred, please try again later';
    this.alertColor = 'red';
    return
  }
  
  this.alertMsg = 'Success! your account has been created';
  this.alertColor = 'green';
  
}
}
