import * as validator from 'email-validator';
import MatchingProfile from './matchingProfile';
export class User {
    token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNjaG9vbDFAdGVzdC5jb20iLCJ' +
    'pc1RlYWNoZXIiOiJmYWxzZSIsImlhdCI6MTQ2NDg4NTgzMH0.fUlLxDiFYtLHPp_FRDqFrf9SbaKgnf5sEOIWuuUunEE';
    // Original Sign Up
    email: string;
    password: string;
    confPassword: string;
    displayName: string;
    // Rest of the profile
    lastName: string;
    image: string;
    state: string;
    description: string;
    isTeacher: boolean;
    interest: boolean;
    match: boolean;
    matchPercent: number;
    matchingProfile: MatchingProfile;
    suggestedMatches: string[];
    currentlyViewingProfile: string;

    isValidEmail() {
        return validator.validate(this.email);
    }
    isValidPassword() {
        let capital = false;
        let lower = false;
        let number = false;
        let symbol = false;
        if (this.password.length < 8) {
            return false;
        }
        capital = this.password.search(/[A-Z]/g) !== -1;
        lower = this.password.search(/[a-z]/g) !== -1;
        number = this.password.search(/[0-9]/g) !== -1;
        symbol = this.password.search(/[^a-zA-Z0-9]/g) !== -1;
        return capital && lower && number && symbol;
    }
}
