import * as usbDetect from 'usb-detection'

export const getDeviceDetailsAsync = async (vid: number, pid: number): Promise<usbDetect.Device> => {
  const device = await usbDetect.find(vid, pid)
  return device[0]
}