import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeComponent } from './probleme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeProblemeService } from './type-probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[TypeProblemeService]
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
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('a'.repeat(2));
      expect(zone.valid).toBeFalsy();
    });

    it('champ Prenom Valide avec 3 caractères', () => {
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('a'.repeat(3));
      expect(zone.valid).toBeTruthy();
    });

    it('champ Prenom Valide avec 200 caractères', () => {
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('a'.repeat(200));
      expect(zone.valid).toBeTruthy();
    });

    it('champ Prenom invalide avec aucune valeur', () => {
      let errors = {};
      let zone = component.problemeForm.controls['prenom'];
      errors = zone.errors || {};
      zone.setValue('a'.repeat(0));
      expect(errors['minlength']).toBeFalsy();
    });

    it('champ Prenom valide avec 10 espaces', () => {
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue(' '.repeat(10));
      expect(zone.valid).toBeFalsy();
    });
    
    it('champ Prenom valide avec 2 espaces et 1 caractère', () => {
      let zone = component.problemeForm.controls['prenom'];
      zone.setValue('  a'.repeat(1));
      expect(zone.valid).toBeFalsy();
    });

    it('Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications('nepasmenotifier');
  
      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });

    it('Zone TELEPHONE est vide quand ne pas me notifier', () => {
      component.appliquerNotifications('nepasmenotifier');

      let zone = component.problemeForm.get('telephone');
      expect(zone.status).toEqual('DISABLED');
    });
    
    it('Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.appliquerNotifications('nepasmenotifier');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');
    });

    it('Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier', () => {
      component.appliquerNotifications('nepasmenotifier');
  
      let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
      expect(zone.status).toEqual('DISABLED');
    });

});
