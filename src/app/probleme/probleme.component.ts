import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { TypeProblemeService } from './type-probleme.service';
import { ITypeProbleme } from './typeProbleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

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
        probleme: ['',Validators.required],

        noTypeProbleme: ['', Validators.required],
        courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
        }),
        telephone: [{value: '', disabled: true}], 

    });

    this.typeProbleme.obtenirCategories()
    .subscribe(cat => this.categoriesProbleme = cat,
               error => this.errorMessage = <any>error);
  }

    appliquerNotifications(TypeProbleme: string): void {
    const courriel = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmation = this.problemeForm.get('courrielGroup.courrielConfirmation')
    const telephone = this.problemeForm.get('telephone');
    const courrielGroup = this.problemeForm.get('courrielGroup');

    courriel.clearValidators();
    courriel.reset();
    courriel.disable();

    courrielConfirmation.clearValidators();
    courrielConfirmation.reset();
    courrielConfirmation.disable();

    telephone.clearValidators();
    telephone.reset();
    telephone.disable();
    

      if(TypeProbleme === "ParTelephone"){
        telephone.enable();
        telephone.setValidators([Validators.required])
      }

      if(TypeProbleme === "ParCourriel"){
        courriel.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
        courriel.enable();
        courrielConfirmation.setValidators([Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
        courrielConfirmation.enable();
        courrielGroup.setValidators([Validators.compose([emailMatcherValidator.courrielConfirmation()])])
      }
      courriel.updateValueAndValidity();
      courrielConfirmation.updateValueAndValidity();
      telephone.updateValueAndValidity();

  }

  

}
