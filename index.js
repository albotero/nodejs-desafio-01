import { registrar, leer } from "./operaciones.js"

// Switch by operation
switch (process.argv[2]) {
  case "registrar":
    registrar(process.argv.splice(3))
    break
  case "leer":
    leer()
    break
  default:
    console.log("No se especificó ninguna acción")
}
