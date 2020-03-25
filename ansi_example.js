var ansi = require('ansi')
  , cursor = ansi(process.stdout)

// You can chain your calls forever:
cursor
  .red()                 // 设置颜色字体
  .bg.grey()             // 设置背景色
  .write('Hello World!') // Write 'Hello World!' to stdout
  .bg.reset()            // 重置背景色
                         //      to avoid Terminal glitches
  .write('\n')           // And a final \n to wrap things up

//用16进制表示颜色 .bold()保持样式不变 .underline()增加下划线
cursor.hex('#660000').bold().underline()

// You can use the regular logging functions, text will be green:
console.log('This is blood red, bold text')

//重置前景色
cursor.fg.reset()

console.log('This will still be bold')

//在终端任意位置写信息goto(x,y) 开始的index是1
cursor.goto(1, 5).write('Five down, ten over')

//horizontalAbsolute(0) 单前行的第一个位置 eraseLine() 整行修改(不保留上一次的内容)
cursor.horizontalAbsolute(0).eraseLine().write('Starting again')

//horizontalAbsolute(4) 单前行的第五个位置 
cursor.horizontalAbsolute(4).write('column five')

//重置实例
cursor.reset()