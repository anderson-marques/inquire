# inquire

Inquire CLI tool that takes a Inquirer questions files in `.js` format, proccess it and generates a `answers.json` file.

```bash
$ inquire -q ./questions.js
? Inform the project name awesome
$ cat ./answers.json| jq .projectName
"awesome"
```

## Inquirer example

File `questions.js`:

```javacript
[
  {
    name: 'projectName',
    message: 'Inform the project name'
  }
]

```
## Answers example

File `answers.json`:

```json
{"projectName":"awesome"}
```
