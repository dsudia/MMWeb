import { Injectable } from '@angular/core';

declare let AWS: any;
declare let AWSCognito: any;

@Injectable()
export class AWSUtil {
    public static firstLogin: boolean = false;
    public static runningInit: boolean = false;

    static initAwsService(callback: Callback) {}
}
