export default class ProjectError extends Error {
  constructor(message: string, status: number, data: Object) {
    super(message);
    this.status = status;
    this.data = data;
  }

  status: number = 0;
  data: Object = {};
}
