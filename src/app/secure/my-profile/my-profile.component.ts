import { Component } from '@angular/core';
import { Callback, LoggedInCallback } from '../../services/cognitoUtil.service'
import UserParametersService from '../../services/cognito.UserParameters.service'
import UserLoginService from '../../services/cognito.UserLogin.service'
import { Parameters } from '../../types/classes'
import { Router } from '@angular/router'

@Component({
    selector: 'app-myprofile',
    templateUrl: './my-profile.html'
})
export default class MyProfileComponent implements LoggedInCallback {
    parameters: Parameters[] = [];
    router: Router;

    constructor(router: Router) {
        this.router = router;
        UserLoginService.isAuthenticated(this);
    }

    isLoggedIn(message: string, loggedIn: boolean) {
        if (!loggedIn) {
            this.router.navigate(['/login']);
        } else {
            UserParametersService.getParameters(new GetParametersCallback(this))
        }
    }
}

class GetParametersCallback implements Callback {
    me: MyProfileComponent

    constructor(me: MyProfileComponent) {
        this.me = me;
    }

    callback() {}

    callbackWithParam(result: any) {
        result.forEach((el, ind, arr) => {
            let parameter = new Parameters();
            parameter.name = el.getName();
            parameter.value = el.getValue();
            this.me.parameters.push(parameter)
        })
    }
}
