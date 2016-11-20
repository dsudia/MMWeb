import { Injectable } from '@angular/core';
import { CognitoCallback, LoggedInCallback, CognitoUtil } from './cognitoUtil.service';
import { AWSUtil } from './aws.service'

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class UserLoginService {
    static authenticate(username: string, password: string, callback: CognitoCallback): void {
        // Need to provide placeholder keys unless unahtorised user access is enabled for user pool
        AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'})

        const authenticationData = {
            Username: username,
            Password: password
        };

        const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        console.log('Authenticating the user...');
        let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        console.log(AWS.config)
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function(err) {
                callback.cognitoCallback(err.message, null)
            }
        });
    };

    static forgotPassword(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: CognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function(result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function(err) {
                callback.cognitoCallback(err.message, null);
            },
            inputVerificationCode() {
                callback.cognitoCallback(null, null);
            }
        });
    }

    static confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback): void {
        const userData = {
            Username: email,
            Pool: CognitoUtil.getUserPool()
        };

        const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

        cognitoUser.forgotPassword({
            onSuccess: function(result) {
                callback.cognitoCallback(null, result);
            },
            onFailure: function(err) {
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
                cognitoUser.getSession(function(err, session) {
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
        }, callbackWithParam() {}})
    }

    constructor() {}
}
