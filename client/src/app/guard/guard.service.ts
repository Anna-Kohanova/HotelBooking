import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot} from "@angular/router";
import {User} from "../model/user";
import {LoginService} from "../authorization/login.service";
import {Role} from "../model/role";

@Injectable()
export class GuardService implements CanActivate {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        const roles = route.data["roles"] as Array<string>;
        const user: User = LoginService.getCurrentUser();
        if (roles.length > 0 && user) {
            return GuardService.checkRoles(roles, user.roles);
        }
        this.router.navigate(['/login']);
        return false;
    }

    private static checkRoles(availableRoleList: string[], currentRoleList: Role[]): boolean {
        for (let availableRole = 0; availableRole < availableRoleList.length; availableRole++)
            for (let userRole = 0; userRole < currentRoleList.length; userRole++)
                if (availableRoleList[availableRole] == currentRoleList[userRole].type) {
                    return true;
                }
        return false;
    }

    // public static isAdmin(): boolean {
    //     const user: User = LoginService.getCurrentUser();
    //     if (user != null)
    //         for (let role of user.roles) {
    //             if (role.type === "ROLE_ADMIN")
    //                 return true;
    //         }
    //     return false;
    // }
}