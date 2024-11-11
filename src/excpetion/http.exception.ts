class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, mesage: string) {
    super(mesage);
    this.status = status;
  }
}
export default HttpException;
