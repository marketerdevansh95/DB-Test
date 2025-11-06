import { google } from "googleapis";

async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, brandName, message, contact } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: "d2c-382@tensile-runway-376512.iam.gserviceaccount.com",
        client_id: "101039401407836664685",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDsxt3mW/4GTMKt\nHFaBw0ppHRvvbpZLh2QdzUDk1Bnf9gqz+Nm+z1WnK8jlnJyR2xyX+JjNVmRaqWn7\nShxIfnEHCgmlR0+43FnPcU45uKkCKO+8yI9d2Wos/cM9ldLa4K0z9Z6Aol5ID5QE\neeV7WWVcuKX2J7YI5PV02oBD+6yHknbmM1M7GNa5/dTlpG8ub5T30TjYGNjmi8kU\npM6wkSjJD+2FjY22/PahvSvHLW2bQONB7OV3pznhUShbUp4WrAItCCGnx7urLL6I\numGQ9zfN1Xw1bhpGdL3wHZIHIDgHEAI3ABX2kgif1gX6uY4sK+0JuWxlnJ6Un/eV\nZJIOnlChAgMBAAECggEANQQlSPB1rU7wMyc6dnU2Gtml+ONT20cOQ38DJgmY3pUe\nmeQhS1Bs3xDWe5Uo2J7NZPjIrAeJUmSHIrlaImBPahJVDREt2Fhccq6t445Fp4Jn\nhaeJtGubUsYiOo6qxxASMCVxz18ryapVS/hISil+4PdGT9rd71lm3XqUSESYwcT7\nPwEBKbkQ+sLCM9IXOxpgq8nOSdV0toUgYPu/3hYU1Z7ciGUzNIugvg0KzbAG3PHR\n+ukDi0ES0yrbZpC/ofOIDrfyWNhV4f0R00uXbqPR5S0t4m2tUCUka8WOOUGdf8pT\nE/KmyuRliqFj8t8iDkwVdr6GEG75Jf8dVBsJsqahjQKBgQD5vIbNO/peFZPofXE0\nQTz1WS4/u+bVQ17nBSyO4ehNuryl90CMhYr6DZ1e0wYIYi+179n+O+vfbgWEbwt3\n/7N1c70SSGZf2lD8EbnwvTMeNra0ZNcpGymloIsBupnkLs6CR2rxmoRBPRxjGB3c\nbvY7p/bOm9+trHu4sSnNxqGeTQKBgQDytyGF9kmfo+8o8ivyHl7UfoG4d7kxxKW5\nwUbR6F3QrTzPtZfAq8NbNFJO1Oc3f6p7HExROSpRjaXrc3KWzCPK6scBR70KJc9s\nrcg5ETjiUY8sGTkV1YBa4U3aw5oaF83j+zBGyrvRCpC73fHGsUC0h4jL5/G/SbN7\nGLd8+37tpQKBgHbJ0wDqR5PbBaivilpFsb4uNk6AjTLhwdF3Z5NrJzlZ2oPDEQQG\nPW3lbfZ9v7/bHECZHwLL880qIxu0SitBCFaUv9ljcLalPKI5uE0nYZo8gjlaQfG+\nhtfOfnBLFwovrXDQkbDsQ35YmBkWjpWcfikwIrhx8jpE8fCO7IiBs7x9AoGAXAgY\njAUxMXklrC73ft0JNCWr5lhvPnHELUUeJ2WmfQPTNSc0HXiDoMecFgwgiCi+aeP3\nBC1a4IWHTln+LzPEtqKDRvb+tSRVHG5gp1LicN5gHWaLAL5t5wfbT4Ivook4JqQO\nUCl7Qe5xpuqnTKHVWR6zPi36un+lsJ1Upe1u2YkCgYEA5oyx0gSZXHxPUdVq8JWo\nNP8Zk4b1f4s+LIyNoXFtHZS6m/anjroRXDFTdNkbyWEzroGAarCrRwuua9XG8H6V\nCuQR6rEuCGcuBbhZPni7BU6l0UWZY+GnUyeWWKQ8tC9ysCQjFk38l/PHVL486DaA\n/SlPuyrv196yHtBaBLXUKSQ=\n-----END PRIVATE KEY-----\n",
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: "1a79yMMBUGB9Yi_RB5bQ32T8QF-R3P2BNgc1TiN2Mseg",
      range: "Sheet2!A2:C",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, brandName, email, message, contact]],
      },
    });
    res
      .status(201)
      .json({ response, result: "Feedback posted to spreadsheet!" });
  }
}

export default handler;
