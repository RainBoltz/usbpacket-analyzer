import * as fs from 'fs'
import * as readline from 'readline'
import { convertAnswersToBinary } from '@helpers/answerKeyConverter'
import { AnswerKey, AnswerKeyInBinary } from '@global/typings'

const matchAnswerBin = (rawInputBin: string, answerKeyBin: AnswerKeyInBinary): boolean => {
  //check if `rawInput` matches `answerKeyBin`
  //example: answerKeyBin.device == rawInputBin.substring(2, 4)
  return true
}

export const checkPacketDataAsync = async (answerKey: AnswerKey, input_file: string = 'output.txt'): Promise<string> => {

  const answerKeyBin: AnswerKeyInBinary = convertAnswersToBinary(answerKey)
  const inputStream = fs.createReadStream(input_file)
  const lineReader = readline.createInterface({ input: inputStream })
  lineReader.on('line', (lineBin: string) => {
    if(matchAnswerBin(lineBin, answerKeyBin)){
      return 'pass'
    }
  })

  return 'failed'
}