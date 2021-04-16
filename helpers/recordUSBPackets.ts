import { exec } from 'child_process'
import * as kill from 'tree-kill'

const delaySync = (milliseonds: number): Promise<Function> => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseonds)
  })
}
const USBPCAP_PATH: string = 'C:\\Program Files\\USBPcap\\USBPcapCMD.exe'
const USBHUB_ID: string = '\\\\.\\USBPcap1'

export const recordUSBPacketsAsync = async (output_name: string = 'output.pcap',duration_seconds: number = 10) => {
  const subprocess = exec(`"${USBPCAP_PATH}" -d${USBHUB_ID} -A -o"${output_name}"`)

  subprocess.on('close', (code, signal) => {
    //console.log(`child process terminated due to receipt of signal ${signal}`)
  })

  await delaySync(Math.floor(duration_seconds * 1000))

  kill(subprocess.pid, 'SIGKILL')
  
}










