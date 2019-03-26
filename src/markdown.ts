import { promisify } from "es6-promisify";
const Remark = require("remark");
const RemarkHTML = require("remark-html");
export default promisify(
  Remark().use(RemarkHTML).process
) as (_: string) => Promise<string>;
