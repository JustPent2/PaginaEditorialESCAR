const { exec } = require('child_process');
const path = require('path');

// Generar la ruta correcta hacia el archivo index.js en la carpeta Server
const serverPath = path.join(__dirname, 'Server', 'index.js');

// Ejecutar el archivo index.js del servidor
exec(`node "${serverPath}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing index.js: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});