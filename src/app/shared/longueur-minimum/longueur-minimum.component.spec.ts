import { ZonesValidator } from "./longueur-minimum.component";
import { AbstractControl } from '@angular/forms';

describe('longueur zone Validator', () => {
    it('une chaîne avec 10 espaces est invalide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '          ' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec des mots est valide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: 'Vive Angular' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        expect(result).toBeNull();
    });

    it('une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' je le veux ' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result).toBeNull();
    });

    it('une phrase avec 1 espace et 2 caractères est invalide. ', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: ' xx' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 2 espaces et 1 caractère est invalide ', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '  x' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

    it('une phrase avec 3 espaces et 3 caractères est valide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '   xxx' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result).toBeNull();
    });

    it('une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: '     xxxxx     ' };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result).toBeNull();
    });

    it('une chaîne nulle est invalide', () => {
        // Préparer une variable pour manipuler le validateur
        let Validator = ZonesValidator.longueurMinimum(3);
        let control = { value: null };
        // Faire l'appel du validateur
        let result=Validator(control as AbstractControl);
        // Comparer le résultat OBTENU avec le résultat PRÉVU
        // expect(result).toBeTruthy();
        expect(result['nbreCaracteresInsuffisants']).toBe(true);
    });

});