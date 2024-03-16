import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm!: UntypedFormGroup;
  _formBuilder = inject(UntypedFormBuilder);
  get f() { return this.userForm.controls; }
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  ngOnInit(): void {
    this.userForm = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      image: ['', [Validators.required]],
      age: [, [Validators.required]],

    });
  }
  Save() {
    if(this.userForm.valid){
      let data = this.userForm.value;
      this.dialogRef.close({data});
    }else{
      this.userForm.markAllAsTouched()
    }
  }
  Close(){
    this.dialogRef.close();
  }
}
