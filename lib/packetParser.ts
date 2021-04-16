import * as fs from 'fs'
import * as readline from 'readline'

const mappings: {[key: number]: any} = { 0x04:"A",  0x05:"B",  0x06:"C", 0x07:"D", 0x08:"E", 0x09:"F", 0x0A:"G",  0x0B:"H", 0x0C:"I",  0x0D:"J", 0x0E:"K", 0x0F:"L", 0x10:"M", 0x11:"N",0x12:"O",  0x13:"P", 0x14:"Q", 0x15:"R", 0x16:"S", 0x17:"T", 0x18:"U",0x19:"V", 0x1A:"W", 0x1B:"X", 0x1C:"Y", 0x1D:"Z", 0x1E:"1", 0x1F:"2", 0x20:"3", 0x21:"4", 0x22:"5",  0x23:"6", 0x24:"7", 0x25:"8", 0x26:"9", 0x27:"0", 0x28:"\n", 0x2a:"[DEL]",  0X2B:"    ", 0x2C:" ",  0x2D:"-", 0x2E:"=", 0x2F:"[",  0x30:"]",  0x31:"\\", 0x32:"~", 0x33:";",  0x34:"'", 0x36:",",  0x37:"." }

export const parsePacketDataAsync = async (input_file: string = 'output.txt') => {
  let output: string = ''
  const inputStream = fs.createReadStream(input_file)
  const lineReader = readline.createInterface({ input: inputStream })
  lineReader.on('line', (line: string) => {
    if(line.trim()=='' || line[0]!='0' || line[1]!='0' || line[3]!='0' || line[4]!='0' || line[9]!='0' || line[10]!='0' || line[12]!='0' || line[13]!='0' || line[15]!='0' || line[16]!='0' || line[18]!='0' || line[19]!='0' || line[21]!='0' || line[22]!='0'){
      //pass
    } else {
      const this_num = parseInt(line.substring(6,8), 16)
      if(this_num != 0){
        //pass
      } else if(this_num in mappings){
        output += mappings[this_num]
      } else {
        output += '[unknown]'
      }
    }
  })

  console.log(output)
}