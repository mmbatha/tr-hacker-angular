const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');

const TEST_RESULTS_FOLDER = 'coverage';
const COBERTURA_FILENAME = 'cobertura-coverage.xml';
const COBERTURA_TARGET_FILENAME = 'test_results/cobertura-coverage-complete.xml';

async function mergeCoberturaFiles() {
  const allCoberturaTestFiles = getFilesRecursively(TEST_RESULTS_FOLDER);
  const commandPrefix = `npx cobertura-merge -o ${COBERTURA_TARGET_FILENAME}`;
  const allPackagesCommand = allCoberturaTestFiles
    .map((file, index) => `package${index + 1}=${file}`)
    .join(' ');
  const completeCommand = `${commandPrefix} ${allPackagesCommand}`;

  console.log(completeCommand);

  exec(completeCommand, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(stdout);
    console.error(stderr);
  });
}

function getFilesRecursively(dir, files = []) {
  const fileList = fs.readdirSync(dir);

  for (const file of fileList) {
    const name = `${dir}/${file}`;

    if (fs.statSync(name).isDirectory()) {
      getFilesRecursively(name, files);
    } else {
      const filename = path.basename(name);

      if (filename === COBERTURA_FILENAME) {
        files.push(name);
      }
    }
  }

  return files;
}

mergeCoberturaFiles();