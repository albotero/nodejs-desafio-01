import { readFileSync, writeFileSync } from "fs"

const dataFile = "./citas.json"
const encoding = "utf-8"
const labels = {
  nombre: "Nombre",
  edad: "Edad",
  animal: "Tipo de Animal",
  color: "Color",
  enfermedad: "Enfermedad",
}
const labelsKeys = Object.keys(labels)
const addLabels = (el, i) => ({ [labelsKeys[i]]: el })
const loadPatients = () => JSON.parse(readFileSync(dataFile, encoding))

export const registrar = (patientDataArr) => {
  // Check user did input all values
  if (patientDataArr.length != 5) {
    const keys = labelsKeys.map((el) => labels[el]).join(", ")
    console.log(
      `\n*** Error al registrar el paciente ***\nRevise los datos ingresados ( ${keys} ) e intente nuevamente.\n`
    )
    return
  }
  // Create an object for the new entry
  const newPatient = Object.assign({}, ...patientDataArr.map(addLabels))
  // Update database (JSON file)
  const allPatientsData = JSON.stringify([...loadPatients(), newPatient], undefined, 2)
  writeFileSync(dataFile, allPatientsData, encoding)
  // Feedback user
  const { nombre, enfermedad } = newPatient
  console.log(`\n*** ÉXITO ***\nSe agregó al paciente ${nombre} ingresado por ${enfermedad} a la base de datos.\n`)
}

const formatPatient = (patient, i) =>
  `\nPaciente ${i + 1}:\n` +
  Object.keys(patient)
    .map((key) => ` -> ${labels[key]}: ${patient[key]}`)
    .join("\n")

export const leer = () => {
  // Format data from file
  const citas = loadPatients().map(formatPatient)
  // Print to user
  if (citas.length) console.log(`\n*** CITAS ACTIVAS ***\n${citas.join("\n")}\n`)
  else console.log("\n*** No tiene citas pendientes ***\n")
}
