import * as fs from 'fs'
import * as readline from 'readline'
import { AnswerKey, AnswerKeyInBinary } from '../global/typings'
import { PACKET_PCAP_FILE, PACKET_TSV_FILE } from '../global/constants'

const matchAnswerBin = (rawInputBin: string, answerKeyBin: AnswerKeyInBinary): boolean => {
  //check if `rawInput` matches `answerKeyBin`
  //example: answerKeyBin.device == rawInputBin.substring(2, 4)
  return true
}

export const checkPacketDataAsync = async (answerKeyBin: AnswerKeyInBinary): Promise<string> => {

  const inputStream = fs.createReadStream(PACKET_TSV_FILE)
  const lineReader = readline.createInterface({ input: inputStream })
  lineReader.on('line', (lineBin: string) => {
    if(matchAnswerBin(lineBin, answerKeyBin)){
      return 'pass'
    }
  })

  return 'failed'
}