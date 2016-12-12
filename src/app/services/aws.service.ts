import { Injectable } from '@angular/core';
import { Callback } from './cognitoUtil.service'
import { CognitoUtil } from './cognitoUtil.service'
import UserLoginService from './cognito.UserLogin.service'

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export default class AWSUtil {
    public static firstLogin: boolean = false;
    public static runningInit: boolean = false;

    static initAwsService(callback: Callback) {
      if (this.runningInit) {
        console.log(`Aborting running initAwsService()...running already`);
        if (callback !== null) {
          callback.callback();
          callback.callbackWithParam(null);
        }
        return;
      }

      console.log(`Running initAwsService()`);
      AWSUtil.runningInit = true;
      AWS.config.region = CognitoUtil._REGION;
      AWSCognito.config.region = CognitoUtil._REGION;

      // First check if the user is authenticated already
      UserLoginService.isAuthenticated({
        isLoggedIn(message: string, loggedIn: boolean) {
          // Include the passed-in callback here as well so that it's executed downstream
          AWSUtil.setupAWS(loggedIn, callback);
        }
      });
    }

    static setupAWS(isLoggedIn: boolean, callback: Callback): void {
      console.log(`in setupAWS()`);
      if (isLoggedIn) {
        console.log(`User is logged in`);


        CognitoUtil.getIdToken({
          callback() {},
          callbackWithParam(idToken: any) {
            console.log('about to call addCognitoCredentials')
            AWSUtil.addCognitoCredentials(idToken);
          }
        });
      } else {
        console.log(`User is not logged in`);
        console.log('creating new credentials in setupAWS')
        AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID
        });
      }
      this.runningInit = false;

      if (callback !== null) {
        callback.callback();
        callback.callbackWithParam(null);
      }
    }

    static addCognitoCredentials(idTokenJwt: string): void {
      let params = AWSUtil.getCognitoParametersForIdConsolidation(idTokenJwt);

      console.log(params)

      console.log('creating new credentials in addCognitoCredentials');
      AWS.config.credentials = new AWS.CognitoIdentityCredentials(params);
      AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials(params);

      console.log(AWS.config.credentials)
      AWS.config.credentials.get(function getCredentialsCallback(err) {
        console.log('tried to get credentials in addCognitoCredentials')
        if (err) {
          console.log('Error in getting credentials: ')
          console.log(err)
        }
        if (!err) {
          // var id = AWS.config.credentials.identityId;
          if (AWSUtil.firstLogin) {
            AWSUtil.firstLogin = false;
          }
        }
      });
    }

    public static getCognitoParametersForIdConsolidation(idTokenJwt: string): {} {
      console.log(`enter getCognitoParametersForIdConsolidation()`);
      const url = `cognito-idp.${CognitoUtil._REGION.toLowerCase()}.amazonaws.com/${CognitoUtil._USER_POOL_ID}`;
      let logins: any = {};
      logins[url] = idTokenJwt;
      const params = {
        IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
        Logins: logins
      }

      return params;
    }
}
