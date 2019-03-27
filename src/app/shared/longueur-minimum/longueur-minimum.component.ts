import { ValidatorFn, AbstractControl } from '@angular/forms';

export class ZonesValidator{
    static longueurMinimum(longueur: number): ValidatorFn {
        //Sous ANGULAR dans les validateurs pour indiquer un succès retourner NULL autrement retourner une clé valeur JSON
        return (valeurControle: AbstractControl): { [key: string]: boolean} | null => {
            if(valeurControle.value !=null && valeurControle.value.trim().length >= longueur ){
                return null;
            }
            return {'nbreCaracteresInsuffisants' : true};
        };
    }
}