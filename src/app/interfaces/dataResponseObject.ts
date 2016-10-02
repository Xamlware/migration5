export class DataResponseObject {
  succeeded: boolean;
  data: any[];
  errorMessage: string;

  constructor(ok: boolean, data: any, errorMessage: string)
  {
    this.succeeded = ok;
    this.data = [];
    this.errorMessage = errorMessage;
  }
}