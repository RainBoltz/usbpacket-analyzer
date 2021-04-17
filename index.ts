import { recordUSBPacketsAsync } from './helpers/recordUSBPackets'
import { translatePackets } from './helpers/translatePackets'
//import { checkPacketDataAsync } from './helpers/packetChecker'
import { convertAnswersToBinary } from './helpers/answerKeyConverter'
import { AnswerKey, AnswerKeyInBinary } from './global/typings'

const test_case = async (answerKey: AnswerKey) =>{
    const record_time: number = 10

    console.log(`start recording packets (for ${record_time} seconds)`)
    await recordUSBPacketsAsync(record_time)

    console.log('start translating binary to text')
    const answerKeyBin: AnswerKeyInBinary = convertAnswersToBinary(answerKey)
    translatePackets(answerKeyBin)

    //console.log('start parsing ')
    //const case_result = await checkPacketDataAsync(answerKeyBin)

    //console.log(`end, result: ${case_result}` )
}


const check_target: AnswerKey = { device: 'Kraken X' }
test_case(check_target)