import * as fs from 'fs'
import { exec } from 'child_process'
import { ChildProcess } from 'node:child_process';
import { FILES, THIRD_PARTY} from '../global/constants'
import { RecordFunctionProperties } from '../global/typings'
import { delaySync } from "./delaySync";

export const recordUSBPacketsAsync = async ({bus_id, output_name = FILES.PACKET_PCAP_FILE, usbpcap_path = THIRD_PARTY.USBPCAP_PATH}: RecordFunctionProperties): Promise<ChildProcess> => {
  const USBHUB_ID: string = `\\\\.\\USBPcap${bus_id}`
  const command = `"${usbpcap_path}" -d${USBHUB_ID} -A -o"${output_name}"`

  //delete duplicated file
  fs.unlink('record.pcap', (err) => {})

  console.log(`   -run: ${command}`)
  const subprocess = exec(command)

  subprocess.on('close', (code, signal) => {
    console.log(`   -(packet recording process terminated.)`)
  })

  console.log(`   -waiting for the process to begin`)
  await delaySync(1000) //to wait for the process started

  return subprocess

}










