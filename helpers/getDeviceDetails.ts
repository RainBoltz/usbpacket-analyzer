import * as Devices from '../device-packet-details'
import * as usbDetect from 'usb-detection'

export const getDeviceDetailsAsync = async (device_name: string): Promise<usbDetect.Device> => {
  
  const target_device = device_name.toLowerCase().replace(/-/g, "").replace(/ /g, "").replace(/_/g, "")

  for (let device_details of Object.entries(Devices)){
    const device_name = device_details[0]
    if(device_name == target_device){
      const device_packet_details = device_details[1]
      const vid = device_packet_details.ID.value.VID as number
      const pid = device_packet_details.ID.value.PID as number
      const device = await usbDetect.find(vid, pid)
      return device[0]
    }
  }

  return {
      locationId: -1,
      vendorId: -1,
      productId: -1,
      deviceName: '',
      manufacturer: '',
      serialNumber: '',
      deviceAddress: -1
    }
}