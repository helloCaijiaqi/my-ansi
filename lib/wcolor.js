var ansi = require('ansi')
  , cursor = ansi(process.stdout)

function setStyle (option) {
    let optionObj = option || null
    if(optionObj){
        for (key in optionObj){
            switch(key){
                case 'fg':
                    setColor(key,optionObj[key]) 
                    break;
                case 'bg':
                    setColor(key,optionObj[key])
                    break;
                case 'style':
                    if(checkStyle(optionObj[key])){
                        cursor[optionObj[key]]()
                    }
                    break;
                default:
                    break;
            }
        }
    }
}

function write (string) {
    cursor.write(string)
}

function reset () {
    cursor.reset()
    cursor.write('\n')
}

function setColor (key,value) {
    if(checkColorIs16(value)){
        cursor[key].hex(value)
    }else{
        if(checkColor(value)){
            cursor[key][value]()
        }
    }
}
function checkColor (color) {
    let colorList = ['white','black','blue','cyan','green','magenta','red','yellow'
        ,'grey','brightBlack','brightRed','brightGreen','brightYellow','brightBlue','brightMagenta'
        ,'brightCyan','brightWhite'
    ]
    for(item of colorList){
        if(item === color){
            return true
        }
    }
    handleError('没有这种默认颜色')
}

function checkStyle (style) {
    let styleList = ['bold','italic','underline','inverse']
    for(item of styleList){
        if(item === style){
            return true
        }
    }
    handleError('没有这种默认样式')
}

function checkColorIs16 (color){
    if(color[0]==='#'){
        let reg = /#([\da-f]{6})/gi
        if(reg.test(color)){
            return true
        }else{
            handleError ('16进制写法错误')
        }
    }
    return false
}

function handleError (msg) {
    throw new Error(msg)
}

module.exports = {setStyle,write,reset}