import { promisify } from "util";
const Remark = require("remark");
const RemarkHTML = require("remark-html");
export default promisify(Remark().use(RemarkHTML).process) as (
  _: string
) => Promise<string>;
