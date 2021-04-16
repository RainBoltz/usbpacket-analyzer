import { execSync } from 'child_process';

const WIRESHARK_PATH: string = 'C:\\Program Files\\Wireshark\\tshark.exe'

export const translatePackets = (input_name: string = 'output.pcap',
                                output_name: string = 'output.txt',
                                filter?: {vid: string, pid: string}) => {
  //add any field if you need: https://www.wireshark.org/docs/dfref/u/usb.html
  if(filter){
    execSync(`"${WIRESHARK_PATH}" -r"${input_name}" -Tfields -eusb.capdata -2 -R "usb.idVendor == ${filter.vid} && usb.idProduct == ${filter.pid}"> "${output_name}"`)
  } else {
    execSync(`"${WIRESHARK_PATH}" -r"${input_name}" -Tfields -eusb.capdata > "${output_name}"`)
  }
  
}
