export default class ApiError extends Error {
  status: number = 0;
  data: object | undefined;

  constructor(message: string, status: number, data?: object) {
    super(message);
    this.status = status;
    if (typeof data !== "undefined") {
      this.data = data;
    }
  }
}
