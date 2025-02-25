import { statfsSync } from "fs";
import osUtils from "os-utils";

console.log(osUtils.totalmem() / 1024);
const stat = statfsSync('C://');
console.log(`total size: ${stat.bsize * stat.blocks / (1024 ** 3)}`);

console.log(Array(10)[8]);

