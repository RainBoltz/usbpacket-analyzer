import * as fs from 'fs'
import { AnswerKey, RecordFunctionProperties, DeviceSettingDetails } from '../global/typings'
import { FILES } from '../global/constants'
import * as Devices from '../device-packet-details'

const bitwiseAssert = (raw_input: string, settingsDetail: DeviceSettingDetails, answer: string | number): boolean => {
  const answer_value = settingsDetail.value[answer]
  const check_byte = raw_input.substr(2*settingsDetail.byteIndex, 2)
  const check_bit = Number(`0x${check_byte}`).toString(2)
  console.log(`   -assert: ${check_bit.charAt(settingsDetail.bitIndex)} == ${answer_value}`)
  return check_bit.charAt(settingsDetail.bitIndex) == answer_value.toString()
}

const originalAssert = (raw_input: string, settingsDetail: DeviceSettingDetails, answer: string | number): boolean => {
  const answer_value = settingsDetail.value[answer]
  const check_byte = raw_input.substr(2*settingsDetail.byteIndex, 2)
  console.log(`   -assert: ${Number(`0x${check_byte}`)} == ${answer_value}`)
  return Number(`0x${check_byte}`).toString() == answer_value.toString()
}

const matchAnswer = (raw_input: string, answer_key: AnswerKey): boolean => {
  //do device name trimming
  const target_device = answer_key.Device.toLowerCase().replace(/-/g, "").replace(/ /g, "").replace(/_/g, "")
  
  //return false if device is not in the list
  if(!Object.keys(Devices).includes(target_device)){
    console.log(`   -no such device '${target_device}' found on this machine`)
    return false
  }

  //iterate all device details
  let passed: boolean
  for (let device_details of Object.entries(Devices)){
    const device_name = device_details[0]
    if(device_name == target_device){
      const device_packet_details = device_details[1]

      //checkout the changed settings
      for(let setting of Object.keys(answer_key.Settings)){
        if(device_packet_details[setting].isBitmask){
          passed = bitwiseAssert(raw_input, device_packet_details[setting], answer_key.Settings[setting])
        } else {
          passed = originalAssert(raw_input, device_packet_details[setting], answer_key.Settings[setting])
        }
        
        //show detail message if failed
        if(!passed){
          console.log(`   *assertion error at '${setting}'`)
          return false
        }

      }

      //end of assertion
      break
    }
  }
  
  return true
}

export const packetDataAssertAsync = ({answer_key, input_name = FILES.PACKET_TSV_FILE}: RecordFunctionProperties): string => {

  const lines = fs.readFileSync(input_name, 'utf-8').split('\n').filter(Boolean)

  if(answer_key){
    for(let line of lines){
      if(matchAnswer(line, answer_key)){
        return 'passed'
      }
    } 
  }

  return 'failed'
}