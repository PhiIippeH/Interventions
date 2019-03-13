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

    it('champ Prenom invalide avec aucune valeur', () => {
      let errors = {};
      let zone = component.problemeForm.controls['Prenom'];
      zone.setValue('a'.repeat(0));
      errors = zone.errors || {};
      expect(errors['minlength']).toBeFalsy();
      //expect(zone.valid).toBeTruthy();
    });

});
