import { Injectable, Inject } from '@angular/core';
import { RegistrationUser } from '../types/classes';
import { CognitoCallback, CognitoUtil } from './cognitoUtil.service'
import UserLoginService from './cognito.UserLogin.service'

declare let AWS: any;
declare let AWSCognito: any

@Injectable()
export default class UserRegistrationService {
    constructor(@Inject(CognitoUtil) public cognitoConfigs: CognitoUtil) {}

    register(user: RegistrationUser, callback: CognitoCallback): void {
        console.log(user)

        let isTeacher = 0
        if (user.isTeacher === true) {
          isTeacher = 1
        }

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };

        const dataFirstName = {
            Name: 'given_name',
            Value: user.firstName
        };

        const dataLastName = {
            Name: 'family_name',
            Value: user.lastName
        };

        const dataIsTeacher = {
            Name: 'custom:isTeacher',
            Value: isTeacher.toString()
        }

        const dataID = {
            Name: 'custom:id',
            Value: user.id
        }

        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataFirstName));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataLastName));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataIsTeacher));
        attributeList.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataID));

        CognitoUtil.getUserPool().signUp(user.username, user.password, attributeList, null, function signUpCallback(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                UserLoginService.authenticate(user.username, user.password, callback)
                console.log(`registered user: ${result}`)
                callback.cognitoCallback(null, result);
            }
        });
    }

    confirmRegistration(email: string, confirmationCode: string, callback: CognitoCallback): void {
        const userData = {
            Username: email,
            Pool: CognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.confirmRegistration(function confRegCallback(err, result) {
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

        cognitoUser.resendConfirmationCode(function resendConfCallback(err, result) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        })
    }
}
