import { execSync } from 'child_process';
import { AnswerKey, AnswerKeyInBinary } from '../global/typings'
import { PACKET_PCAP_FILE, PACKET_TSV_FILE } from '../global/constants'

const WIRESHARK_PATH: string = 'C:\\Program Files\\Wireshark\\tshark.exe'

export const translatePackets = (filter?: {[key: string]: string} | AnswerKey | AnswerKeyInBinary) => {

  //add any field if you need: https://www.wireshark.org/docs/dfref/u/usb.html
  let filter_command: string = ''
  if(filter){
    filter_command = `-Y "usb.transfer_type == 0x01 && usb.bInterfaceClass" `
    filter_command = `-eusb.transfer_type -eusb.bInterfaceClass -eusb.addr -Y "usb.capdata"`
  }

  const command: string = `"${WIRESHARK_PATH}" -r"${PACKET_PCAP_FILE}" -Tfields -eusb.capdata ${filter_command} > "${PACKET_TSV_FILE}"`
  console.log(`run: ${command}`)
  execSync(command)
  
}
