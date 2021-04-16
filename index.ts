import { recordUSBPacketsAsync } from '@helpers/recordUSBPackets'
import { translatePackets } from '@helpers/translatePackets'
import { checkPacketDataAsync } from '@helpers/packetChecker'
import { AnswerKey } from '@global/typings'

const test_case = async (assertion: AnswerKey) =>{
    const record_time: number = 5

    console.log(`start recording packets (for ${record_time} seconds)`)
    await recordUSBPacketsAsync(record_time)

    console.log('start translating binary to text')
    translatePackets()

    console.log('start parsing ')
    const case_result = await checkPacketDataAsync(assertion)

    console.log(`end, result: ${case_result}` )
}


const check_target: AnswerKey = { device: 'Kraken X' }
test_case(check_target)