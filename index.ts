import { recordUSBPacketsAsync } from './lib/recordUSBPackets'
import { translatePackets } from './lib/translatePackets'
import { parsePacketDataAsync } from './lib/packetParser'

const main = async () =>{
    console.log('start recording')
    await recordUSBPacketsAsync()
    console.log('start translate')
    translatePackets()
    //console.log('start parsing')
    //await parsePacketDataAsync()
    console.log('end')
}

main()