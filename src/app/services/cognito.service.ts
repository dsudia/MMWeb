import { Injectable, Inject } from '@angular/core';
import RegistrationUser from '../public/auth/RegistrationUser';

declare let AWS: any;
declare let AWSCognito: any;

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
    callback(): void;
    callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {
    public static _REGION = 'us-east-1';
    
    public static _IDENTITY_POOL_ID = 'us-east-1:1589ee70-aa37-4e78-a753-05ecdd3689a3';
    public static _USER_POOL_ID = 'us-east-1_hodxY4XR9';
    public static _CLIENT_ID = '66e6j6i6pobdifulaqmasiuqs3';

    public static _POOL_DATA = {
        UserPoolId: CognitoUtil._USER_POOL_ID,
        ClientId: CognitoUtil._CLIENT_ID
    }

    public static getUserPool() {
        return AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(CognitoUtil._POOL_DATA);
    }

    public static getCurrentUser() {
        return CognitoUtil.getUserPool().getCurrentUser();
    }

    public static getCognitoIdentity(): string {
        return AWS.config.credentials.identityId;
    }

    public static getAccessToken(callback: Callback): void {
        if (callback === null) {
            throw('callback in getAccessToken is nul ... returning')
        }
        CognitoUtil.getCurrentUser().getSession(function(serr, session) {
            if (err) {
                console.log(`Can't set the credentials: ${err}`)
            }
        })
    }
}