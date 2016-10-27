export class Constants {
  adminEmail: string = "admin@ketogeniqapi.com";
  adminPassword: string = "*KetogeniqApi*admin**1*";


  baseUrl: string = "http://api.ketogeniq.com/";
  //baseUrl: string = "http://localhost:39897/";

  userUrl: string = this.baseUrl + "api/users/";
  createUserUrl: string = this.baseUrl + "api/users/create/";
  nutritionUrl: string = this.baseUrl + "api/nutrition/";
  tokenUrl: string = this.baseUrl + "Token";
  accountUrl: string = this.baseUrl + "api/Account/";
  taskUrl: string = this.baseUrl + "task/";
  nutritionixApiUrl = "https://api.nutritionix.com/v1_1/search/"
  grantString: string = "grant_type=password&username=";
  passwordString: string = "&password=";
  formEncodedContentType: string = "Content-Type', 'application/x-www-form-urlencoded";
  jsonContentType: string = "application/json";
}    