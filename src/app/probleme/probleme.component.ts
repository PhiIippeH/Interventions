import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  categoriesProbleme: ITypeProbleme[];
  errorMessage: string;
  constructor(private fb: FormBuilder, private typeProbleme: TypeProblemeService) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
        prenom: ['',[ZonesValidator.longueurMinimum(3), Validators.required]],
        nom: ['',[Validators.required, Validators.maxLength(50)]],
        probleme: ['',Validators.required]
    });

    this.typeProbleme.obtenirCategories()
    .subscribe(cat => this.categoriesProbleme = cat,
               error => this.errorMessage = <any>error);


  }

}
