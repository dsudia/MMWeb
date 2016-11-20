import { Injectable } from '@angular/core';
import { Callback, CognitoUtil } from './cognitoUtil.service';

@Injectable()
export class UserParametersService {
    static getParameters(callback: Callback) {
        const cognitoUser = CognitoUtil.getCurrentUser();

        if (cognitoUser !== null) {
            cognitoUser.getSession(function(err, session) {
                if (err) {
                    console.log('Could not retrieve the user.');
                } else { 
                    cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            console.log(`Error in parameters: ${err}`);
                        } else {
                            callback.callbackWithParam(result);
                        }
                    });
                }
            });
        } else {
            callback.callbackWithParam(null);
        }
    }

    getParameter(name: string, callback: Callback) {}
}
