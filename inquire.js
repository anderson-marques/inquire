'strict'

const inquirer = require('inquirer')
const fs = require('fs')
const { program } = require('commander')

process.setMaxListeners(0)

async function main() {

  program
    .version('1.0.0')
    .description('Process a inquirer questions file and generates a answers.json file.')
    .usage("-q ./questions.js")
    .requiredOption('-q, --questions <questions>', 'JS file with the Inquirer questions')
    .parse(process.argv);

  exists = await fileExists(program.questions)
  questions = await evalFile(program.questions)

  const answers = await inquirer.createPromptModule()(questions)

  await writeContextFile(answers)
}

function writeContextFile(answers) {
  return new Promise((resolve, reject)=>{
    fs.writeFile('./answers.json', JSON.stringify(answers), (err) => {
      if (err) {
        return reject(err)
      }
      return resolve()
    })
  })
}

function fileExists(file) {
  return new Promise((resolve, _) => {
    fs.exists(file, exists => {
      resolve(exists)
    })
  })
}

function evalFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', function (err,data) {
        if (err) {
          return reject(err)
        }
        return resolve(eval(data))
      });
  })
}

main().catch(err => console.log(err.message))
