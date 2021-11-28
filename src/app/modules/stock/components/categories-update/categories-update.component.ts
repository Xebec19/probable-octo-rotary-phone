import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories-update',
  templateUrl: './categories-update.component.html',
  styleUrls: ['./categories-update.component.css'],
})
export class CategoriesUpdateComponent implements OnInit {
  categoryDetail = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    parent: new FormControl(''),
  });
  constructor() {}

  ngOnInit(): void {}
}
