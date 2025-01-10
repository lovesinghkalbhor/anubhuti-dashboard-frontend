class CustomApiResponse {
  apiResponse: any;
  storageStatus: boolean | null;
  Apierror: boolean;

  constructor(
    apiResponse: any,
    storageStatus: boolean | null,
    Apierror: boolean
  ) {
    this.apiResponse = apiResponse;
    this.storageStatus = storageStatus;
    this.Apierror = Apierror;
  }
}
export { CustomApiResponse };
