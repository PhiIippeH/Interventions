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
      declarations: [ProblemeComponent],
      providers: [TypeProblemeService]
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

  it('Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED');
  });

  it('Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED');
  });

  it('Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED');

  });

  it('Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue("");
    errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zone.setValue('');
    errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('ParCourriel');
    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');

    zone.setValue("a.2./");
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let gr = component.problemeForm.get('courrielGroup');
    courrielConfirmation.setValue('oskajdo@sde.ca');
    zone.setValue('');
    errors = gr.errors || {};
    expect(errors['match']).toBeUndefined();

  });

  it('Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let gr = component.problemeForm.get('courrielGroup');
    courrielConfirmation.setValue('');
    zone.setValue('sohd@oija.ca');
    errors = gr.errors || {};
    expect(errors['match']).toBeUndefined();

  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let gr = component.problemeForm.get('courrielGroup');
    courrielConfirmation.setValue('ioushd@opjs.ca');
    zone.setValue('sohd@oija.ca');
    errors = gr.errors || {};
    expect(errors['match']).toBeTruthy();

  });

  it('Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('ParCourriel');

    let errors = {};
    let zone = component.problemeForm.get('courrielGroup.courriel');
    let courrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let gr = component.problemeForm.get('courrielGroup');
    courrielConfirmation.setValue('sohd@oija.ca');
    zone.setValue('sohd@oija.ca');
    errors = gr.errors || {};
    expect(errors['match']).toBeUndefined();

  });

  it('#29 | Zone TELEPHONE est activée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let errors = {};
    let zone = component.problemeForm.get('telephone');
    zone.setValue('');
    errors = errors || {};
    expect(errors['required']).toBeUndefined();

  });

  it('#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED');

  });

  it('#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');

    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');

  });

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let errors = {};

    let zone = component.problemeForm.get('telephone');

    zone.setValue('');
    errors = zone.errors || {};

    expect(errors['required']).toBeTruthy();

  });

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let errors = {};
    let zone = component.problemeForm.get('telephone');

    zone.setValue("a");
    errors = zone.errors || {};
    expect(errors['pattern']).toBeTruthy();

  });

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('telephone');

    zone.setValue("000000000");
    expect(zone.valid).toBeFalsy();

  });

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('telephone');

    zone.setValue("00000000011");
    expect(zone.valid).toBeFalsy();

  });

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('ParTelephone');
    let zone = component.problemeForm.get('telephone');

    zone.setValue("0000000001");
    expect(zone.valid).toBeTruthy();

  });

});
