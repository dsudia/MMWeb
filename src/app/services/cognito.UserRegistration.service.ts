import { Injectable, Inject } from "@angular/core";
import RegistrationUser from '../public/auth/RegistrationUser';
import { CognitoCallback, CognitoUtil } from './cognitoUtil.service'

declare let AWS:any;
declare let AWSCognito:any

@Injectable()
export class UserRegistrationService {
    constructor(@Inject(CognitoUtil) public cognitoConfigs:CognitoUtil) {}

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log(`user: ${user}`);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };

        const dataUsername = {
            Name: 'preferred_username',
            Value: user.username
        };

        const dataFirstName = {
            Name: 'given_name',
            Value: user.firstName
        };

        const dataLastName = {
            Name: 'family_name',
            Value: user.lastName
        };

        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataUsername));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFirstName));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataLastName));

        CognitoUtil.getUserPool().signUp(user.email user.password, attributeList, null, function(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                console.log(`registered user: ${result}`)
                callback.cognitoCallback(null, result);
            }
        });
    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(function(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        })
    }
}