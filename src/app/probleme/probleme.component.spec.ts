import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('champ Prenom invalide avec 2 caractères', () => {
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue('a'.repeat(2));
      expect(zone.valid).toBeFalsy();
    });

    it('champ Prenom invalide avec 3 caractères', () => {
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue('a'.repeat(3));
      expect(zone.valid).toBeTruthy();
    });

    it('champ Prenom invalide avec 200 caractères', () => {
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue('a'.repeat(200));
      expect(zone.valid).toBeTruthy();
    });

    it('champ Prenom invalide avec aucune valeur', () => {
      let errors = {};
      let zone = component.problemeForm.controls['Prenom'];
      errors = zone.errors || {};
      zone.setValue('a'.repeat(0));
      expect(errors['minlength']).toBeFalsy();
    });

    it('champ Prenom valide avec 10 espaces', () => {
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue(' '.repeat(10));
      expect(zone.valid).toBeTruthy();
    });
    
    it('champ Prenom valide avec 10 espaces', () => {
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue('  a'.repeat(1));
      expect(zone.valid).toBeTruthy();
    });
    
});
