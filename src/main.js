import { version } from "../package.json";
import ENDPOINTS from "./endpoints.json";

export default class Qrize {
  constructor() {
    this.version = version;
    this.ENDPOINTS = ENDPOINTS;
  }
}
