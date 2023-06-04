export default class ProjectError extends Error {
  constructor(message: string, status: number, data?: object) {
    super(message);
    this.status = status;
    if (typeof data !== "undefined") {
      this.data = data;
    }
  }
  status: number = 0;
  data: object | undefined;
}
