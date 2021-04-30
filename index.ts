import { recordUSBPacketsAsync } from './helpers/recordUSBPackets'
import { packetDataAssertAsync } from './helpers/packetAssert'
import { getDeviceDetailsAsync } from './helpers/getDeviceAddress'
import { transformPackets } from './helpers/transformPackets'
import { AnswerKey } from './global/typings'
import { delaySync } from "./helpers/delaySync"

import * as kill from 'tree-kill'

const test_case = async (answerKey: AnswerKey) => {

  console.log(`1. start to find device address of '${answerKey.Device}'`)
  const device_details = await getDeviceDetailsAsync(answerKey.VID, answerKey.PID)
  const bus_id: number = 1 //TODO: need to find a way to detect
  const device_address = device_details.deviceAddress
  console.log(`   -'${device_details.deviceName}' found on '${bus_id}:${device_address}'`)

  console.log(`2. start recording packets`)
  const record_process = await recordUSBPacketsAsync({ bus_id })
  
  const action_duration: number = 10000
  console.log(`3. start testing actions (for ${action_duration} seconds)`)
  await delaySync(action_duration) //START ACTIONS...

  console.log(`4. end recording`)
  kill(record_process.pid, 'SIGKILL')
  await delaySync(1000) //wait for process to stop

  console.log('5. transform binary packet into text format')
  transformPackets({ bus_id, device_address })

  console.log('6. start assertion ')
  const case_result = packetDataAssertAsync({ answerKey })

  console.log(`   -End task, result: ${case_result}`)
}


const assertion: AnswerKey = {
  Device: 'Hue2 Ambient',
  VID: 0x1e71,
  PID: 0x2002,
  Settings: {
    LightingMode: 'Pulse mode'
  }
}
test_case(assertion)