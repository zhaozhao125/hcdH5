#!/usr/bin/chioce node

const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {
  exec
} = require('child_process')

program
  .version('0.0.1')
  .description(`${chalk.blue('A')} ${chalk.blue('B')}uild ${chalk.blue('C')}ommander 一个构建代码的命令`)
  .option('-b, --build', '构建代码')
  .option('-d, --dev', '开启服务')

program.parse(process.argv)

let runBuild = () => {
  inquirer.prompt({
    message: '选一个构建环境吧：',
    name: 'chioce',
    type: 'list',
    choices: [{
      name: '测试环境',
      value: 'test'
    }, {
      name: '正式环境',
      value: 'production'
    }, {
      name: '返回上级',
      value: 'return'
    }]
  }).then(answer => {
    if (answer.chioce == 'return') {
      runMenu()
      return
    }
    let cmdStr
    let envStr
    if (answer.chioce == 'test') {
      cmdStr = 'npm run build:dev'
      envStr = '测试环境'
    } else if (answer.chioce == 'production') {
      cmdStr = 'npm run build:prod'
      envStr = '正式环境'
    }
    console.log(chalk.blue('构建程序正在运行...(ง •̀_•́)ง'))
    let cmd = exec(cmdStr, {
      maxBuffer: 100000 * 1024 // stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。
    }, (err, stdout, srderr) => {
      if (err) {
        console.log('====err====', err)
      } else {
        // if(stdout){
        //   console.log('====stdout====', stdout)
        // }
        if (srderr) {
          console.log('====srderr====', srderr)
        }
      }
    })
    cmd.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    cmd.stderr.on('data', (data) => {
      console.log(data.toString())
    })

    cmd.on('exit', (code) => {
      console.log(chalk.yellow(envStr), chalk.green('代码构建完成了!'))
      console.log(chalk.blue(
        `　☆  *　.  　☆
　　. ∧＿∧　∩　* ☆
*  ☆ ( ·∀·)/ .
　.  つ　　 ノ* ☆
☆ * (つ ノ  .☆
　　 (ノ`
      ))
    })
  })
}

let runDev = () => {
  inquirer.prompt({
    message: '选一个服务环境吧：',
    name: 'chioce',
    type: 'list',
    choices: [{
      name: '测试环境',
      value: 'test'
    }, {
      name: '正式环境',
      value: 'production'
    }, {
      name: '返回上级',
      value: 'return'
    }]
  }).then(answer => {
    if (answer.chioce == 'return') {
      runMenu()
      return
    }
    let cmdStr
    if (answer.chioce == 'test') {
      cmdStr = 'npm run serve:dev'
    } else if (answer.chioce == 'production') {
      cmdStr = 'npm run serve:prod'
    }
    console.log(chalk.blue('开启服务中...(๑¯◡¯๑)'))
    let cmd = exec(cmdStr, {
      maxBuffer: 100000 * 1024
    }, (err, stdout, srderr) => {
      if (err) {
        console.log('====err====', err)
      } else {
        // if(stdout){
        //   console.log('====stdout====', stdout)
        // }
        if (srderr) {
          console.log('====srderr====', srderr)
        }
      }
    })
    let progress = 0
    cmd.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    cmd.stderr.on('data', (data) => {
      let str = String(data)
      if (str.match('%')) {
        let current = str.split('%')[0].trim()
        if (str.split('%')[0].trim().length > 3) {
          current = current.substr(-2)
        }
        if (current > progress && current % 10 === 0) {
          progress = current
          console.log(str)
        }
      } else {
        // console.log(str)
      }
    })

    cmd.on('exit', (code) => {
      console.log(chalk.green(`Child exited with code ${code}`))
    })
  })
}

let runMenu = () => {
  inquirer.prompt({
    message: '你想做什么？',
    name: 'choice',
    type: 'list',
    choices: [{
      name: '开启服务',
      value: 'dev'
    }, {
      name: '构建代码',
      value: 'build'
    }, {
      name: '点错了',
      value: 'exit'
    }]
  }).then(answer => {
    if (answer.choice == 'dev') {
      runDev()
    }
    if (answer.choice == 'build') {
      runBuild()
    }
    if (answer.chioce == 'exit') {

    }
  })
}

if (program.build) {
  runBuild()
} else if (program.dev) {
  runDev()
} else {
  runMenu()
}
