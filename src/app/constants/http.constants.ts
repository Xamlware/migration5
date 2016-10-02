export class Constants {
  adminEmail: string = "admin@ketogeniqapi.com";
  adminPassword: string = "*KetogeniqApi*admin**1*";

  
  //baseUrl: string = "http://www.ketogeniqapi.com/";
  baseUrl: string = "http://localhost:39897/";
  
  userUrl: string = this.baseUrl + "api/users/";
  //userLocalUrl: string = "http://localhost:39897/api/users/";

  createUserUrl: string = this.baseUrl + "api/users/create/";
  //createUserLocalUrl: string = "http://localhost:39897/api/users/create/";


  nutritionUrl: string = this.baseUrl + "api/nutrition/";
  //nutritionLocalUrl: string = "http://localhost:39897/api/nutrition/";

  tokenUrl: string = this.baseUrl + "Token";
  //tokenLocalUrl: string = "http://localhost:39897/Token";

  accountUrl: string = this.baseUrl + "api/Account/";
  //accountLocalUrl: string = "http://localhost:39897/api/Account/";

  taskUrl: string = this.baseUrl + "task/";
  //taskLocalUrl: string = this.baseLocalUrl + "task/" 

  // foodSearchUrl: string = this.userUrl + "search";
  // foodSearchLocalUrl: string = this.userLocalUrl + "search";

  // foodItemSearchUrl: string = this.userUrl + "item";
  // foodItemSearchLocalUrl: string = this.userLocalUrl + "item";

  // foodBrandSearchUrl: string = this.userUrl + "Brand";
  // foodBrandSearchLocalUrl: string = this.userLocalUrl + "Brand";

  grantString: string = "grant_type=password&username=";
  passwordString : string = "&password=";
  formEncodedContentType: string = "Content-Type', 'application/x-www-form-urlencoded";
  jsonContentType: string = "application/json";
}