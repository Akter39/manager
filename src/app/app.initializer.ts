import { firstValueFrom} from 'rxjs';
import { AuthService } from "src/app/services/auth.service";


export function appInitializer(auth: AuthService) {
    let isAuth;
    auth.isAuthenticated().subscribe(u => isAuth = u)
    if (isAuth) return () => firstValueFrom(auth.refreshToken());
    return () => new Promise(resolve => resolve(true))
}