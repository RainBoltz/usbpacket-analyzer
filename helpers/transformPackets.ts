import * as fs from 'fs'
import { execSync } from 'child_process';
import { RecordFunctionProperties } from '../global/typings'
import { FILES, THIRD_PARTY } from '../global/constants'

export const transformPackets = ({bus_id, device_address, input_name = FILES.PACKET_PCAP_FILE, output_name = FILES.PACKET_TSV_FILE, wireshark_path = THIRD_PARTY.WIRESHARK_PATH}: RecordFunctionProperties) => {
  //delete duplicated file
  fs.unlink('record.tsv', (err) => {})

  const filter_command = `-Y "usb.bus_id == ${bus_id} && usb.device_address == ${device_address} && usb.capdata"`

  const command: string = `"${wireshark_path}" -r"${input_name}" -Tfields -eusb.capdata ${filter_command} > "${output_name}"`
  console.log(`   -run: ${command}`)
  execSync(command)
  
}
