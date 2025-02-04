import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// export function getPreloadPath() {

//   return path.join(
//     app.getAppPath(),
//     isDev() ? "." : "..",
//     '/dist-electron/preload.cjs'
//   )
// }

export function getPreloadPath() {

  return path.join(
    __dirname,
    'preload.cjs'
  )
}