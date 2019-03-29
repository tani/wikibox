import { promisify } from "util";
import Remark from "remark";
import RemarkHTML from "remark-html";
export default promisify(Remark().use(RemarkHTML).process) as (
  _: string
) => Promise<string>;
