"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var user_1 = require('./user');
var config_1 = require('../config');
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/do');
require('rxjs/add/operator/map');
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this.user = new user_1.User();
    }
    UserService.prototype.register = function () {
        console.log('you are trying to register!');
        console.log(this.user.email);
        console.log(this.user.password);
        console.log(this.user.displayName);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(config_1.Config.apiUrl + 'auth/signup', JSON.stringify({
            email: this.user.email,
            password: this.user.password,
            isTeacher: false,
            displayName: this.user.displayName
        }), { headers: headers })
            .catch(this.handleErrors);
    };
    UserService.prototype.getSuggestedMatches = function () {
        console.log('Called!!!');
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(config_1.Config.apiUrl + 'matches/suggested?token=' + this.user.token, { headers: headers })
            .catch(this.handleErrors);
    };
    UserService.prototype.getProfile = function (profileEmail) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.get(config_1.Config.apiUrl + 'profile/get?token=' + this.user.token + '&profile=' + profileEmail, { headers: headers })
            .catch(this.handleErrors);
    };
    UserService.prototype.showInterest = function (profileEmail) {
        if (profileEmail === void 0) { profileEmail = null; }
        console.log(this.user.token);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(config_1.Config.apiUrl + 'matches/interest', JSON.stringify({
            token: this.user.token,
            interestedIn: profileEmail || this.user.currentlyViewingProfile,
        }), {
            headers: headers
        })
            .catch(this.handleErrors);
    };
    UserService.prototype.removeInterest = function (profileEmail) {
        if (profileEmail === void 0) { profileEmail = null; }
        console.log(this.user.token);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(config_1.Config.apiUrl + 'matches/uninterest', JSON.stringify({
            token: this.user.token,
            uninterestedIn: profileEmail || this.user.currentlyViewingProfile,
        }), {
            headers: headers
        })
            .catch(this.handleErrors);
    };
    UserService.prototype.loginUser = function (loginEmail, loginPass) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(config_1.Config.apiUrl + 'auth/login', JSON.stringify({
            email: loginEmail,
            password: loginPass
        }), { headers: headers })
            .catch(this.handleErrors);
    };
    UserService.prototype.handleErrors = function (error) {
        console.log('the error is: ', JSON.stringify(error.json()));
        return Rx_1.Observable.throw(error);
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=userService.js.map