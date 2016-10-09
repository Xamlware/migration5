import {User} from "../interfaces/user";
import {IsLeapYear} from "./date.helper";

export function GetAge(user: User) {
    var today = new Date();
    var birthDate = new Date(user.dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;


//     var bd = new Date(user.dob).getDate();
//     var bm = new Date(user.dob).getMonth();
//     var by = new Date(user.dob).getFullYear();

//     // b = new Date(bm + '/' + bm + '/' + by);

//     var now = new Date();
//     var age = now.getFullYear() - new Date(user.dob).getFullYear();
//     var dayNow = now.g();
//     var dayBirth = new Date(user.dob).getDate();

//     // normalize day-of-year in leap years
//     if (IsLeapYear(now.getFullYear()) && dayNow > 58 && dayBirth > 59)
//         dayNow--;

//     if (IsLeapYear(new Date(user.dob).getFullYear()) && dayNow > 58 && dayBirth > 59)
//         dayBirth--;

//     if (dayNow <= dayBirth)
//         age--;  // birthday not yet passed this year, so -1

//    return age;
};
