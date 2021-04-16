import { recordUSBPacketsAsync } from '@helpers/recordUSBPackets'
import { translatePackets } from '@helpers/translatePackets'
import { checkPacketDataAsync } from '@helpers/packetChecker'
import { AnswerKey } from '@global/typings'

const test_case = async (assertion: AnswerKey) =>{
    console.log('start recording')
    await recordUSBPacketsAsync()

    console.log('start translate')
    translatePackets()

    console.log('start parsing')
    const case_result = await checkPacketDataAsync(assertion)

    console.log(`end, result: ${case_result}` )
}


const check_target: AnswerKey = { device: 'Kraken X' }
test_case(check_target)