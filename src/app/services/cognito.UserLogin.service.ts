import { Injectable } from '@angular/core';
import { CognitoCallback, LoggedInCallback, CognitoUtil } from './cognitoUtil.service';
import AWSUtil from './aws.service'

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export default class UserLoginService {
    static authenticate(username: string, password: string, callback: CognitoCallback): void {
        // Need to provide placeholder keys unless unahtorised user access is enabled for user pool
        AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

        const authenticationData = {
            Username: username,
            Password: password
        };

        console.log('creating authentication details in UserLoginService')
        const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        console.log('Authenticating the user...');
        console.log('creating new cognitoUser in UserLoginService')
        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        console.log(AWS.config)
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function authenticateSuccess(result) {
                console.log(result)
                callback.cognitoCallback(null, result);
            },
            onFailure: function authenticateFailure(err) {
                callback.cognitoCallback(err.message, null)
            }
        });
    };

    static forgotPassword(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        console.log('creating new cognitoUser in forgotPassword')
        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function forgotPassSuccess(result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function forgotPassFailure(err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    static confirmNewPassword(username: string, verificationCode: string, password: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        console.log('creating new cognitoUser in confirmNewPassword')
        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function confirmForgotPassSuccess(result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function confirmForgotPassFailure(err) {
                callback.cognitoCallback(err.message, null);
            }
        });
    }

    static logout() {
        console.log('Logging out...');
        CognitoUtil.getCurrentUser().signOut();
    }

    static isAuthenticated(callback: LoggedInCallback) {
        if (callback === null) {
            throw('Callback in isAuthenticated() cannot be null');
        }

        AWSUtil.initAwsService({callback() {
            const cognitoUser = CognitoUtil.getCurrentUser();

            if (cognitoUser !== null) {
                cognitoUser.getSession(function initGetSession(err, session) {
                    if (err) {
                        console.log(`Couldn't get the session: ${err}`);
                        callback.isLoggedIn(err, false);
                    } else {
                        console.log(`Session is ${session.isValid()}`);
                        callback.isLoggedIn(err, session.isValid());
                    }
                });
            } else {
                callback.isLoggedIn('Cannot retrieve the current user.', false);
            }
        }, callbackWithParam(cognitoUser) {}})
    }
}
