"use strict";
var validator = require("email-validator");
var observableArray = require("data/observable-array");
var User = (function () {
    function User() {
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjaG9vbDFAdGVzdC5jb20iLCJpc1RlYWNoZXIiOiJmYWxzZSIsImlhdCI6MTQ2NDg4NTgzMH0.fUlLxDiFYtLHPp_FRDqFrf9SbaKgnf5sEOIWuuUunEE';
        this.matchingProfile = {
            orgTypes: [],
            orgTypesWgt: 0,
            cals: [],
            calsWgt: 0,
            states: [],
            statesWgt: 0,
            sizes: [],
            sizesWgt: 0,
            locTypes: [],
            locTypesWgt: 0,
            ageRanges: [],
            ageRangesWgt: 0,
            traits: [],
            traitsWgt: 0,
            trainings: [],
            trainingsWgt: 0
        };
        this.suggestedMatches = new observableArray.ObservableArray();
    }
    User.prototype.isValidEmail = function () {
        return validator.validate(this.email);
    };
    User.prototype.isValidPassword = function () {
        var capital = false;
        var lower = false;
        var number = false;
        var symbol = false;
        if (this.password.length < 8) {
            return false;
        }
        capital = this.password.search(/[A-Z]/g) != -1;
        lower = this.password.search(/[a-z]/g) != -1;
        number = this.password.search(/[0-9]/g) != -1;
        symbol = this.password.search(/[^a-zA-Z0-9]/g) != -1;
        return capital && lower && number && symbol;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map