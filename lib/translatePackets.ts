import { execSync } from 'child_process';

const WIRESHARK_PATH: string = 'C:\\Program Files\\Wireshark\\tshark.exe'

export const translatePackets = (input_name: string = 'output.pcap', output_name: string = 'output.txt') => {
  //add any field if you need: https://www.wireshark.org/docs/dfref/u/usb.html
  execSync(`"${WIRESHARK_PATH}" -r"${input_name}" -Tfields -eusb.capdata > "${output_name}"`)
}
