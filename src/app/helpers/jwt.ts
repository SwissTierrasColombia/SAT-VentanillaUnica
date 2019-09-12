import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

export class JwtHelper {

    public static closeSession(router) {
        sessionStorage.removeItem(environment.nameTokenSession);
        router.navigate(['/autenticacion']);
    }

    public getUserPublicInformation() {
        const token = sessionStorage.getItem(environment.nameTokenSession);
        const helper = new JwtHelperService();

        let decodedToken = null;
        try {
            decodedToken = helper.decodeToken(token);
        } catch (error) {
            decodedToken = null;
        }
        return decodedToken.dataToken;
    }

}