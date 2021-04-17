import { exec } from 'child_process'
import * as kill from 'tree-kill'
import { PACKET_PCAP_FILE, PACKET_TSV_FILE } from '../global/constants'

const delaySync = (milliseonds: number): Promise<Function> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseonds)
  })
}
const USBPCAP_PATH: string = 'C:\\Program Files\\USBPcap\\USBPcapCMD.exe'
const USBHUB_ID: string = '\\\\.\\USBPcap1'

export const recordUSBPacketsAsync = async (duration_seconds: number = 10) => {
  const command = `"${USBPCAP_PATH}" -d${USBHUB_ID} -A -o"${PACKET_PCAP_FILE}"`
  console.log(`run: ${command}`)
  const subprocess = exec(command)

  subprocess.on('close', (code, signal) => {
    //console.log(`child process terminated due to receipt of signal ${signal}`)
  })

  await delaySync(Math.floor(duration_seconds * 1000))

  kill(subprocess.pid, 'SIGKILL')
  
}










