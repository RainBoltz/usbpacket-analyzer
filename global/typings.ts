export interface AnswerKey {
  Device: string,
  VID?: number,
  PID?: number,
  Settings: {
    Channel?: number,
    LEDLength?: number,
    Direction?: 'left' | 'right',
    ModesSpeed?: number,
    LightingMode?: string
    ColorLevel?: string,
    LEDSize?: number,
    Color?: Array<Array<string> | undefined>,
    LED?: Array<Array<string> | undefined>,
    [key: string]: any
  }
}


export interface RecordFunctionProperties {
  duration_seconds?: number,
  output_name?: string,
  input_name?: string,
  bus_id?: number,
  device_address?: number,
  answer_key?: AnswerKey,
  wireshark_path?: string,
  usbpcap_path?: string
}

export interface DeviceSettingDetails {
  isBitmask: boolean,
  bitIndex: number,
  byteIndex: number,
  value: {
    [key: string]: string | number | Array<number>,
    [key: number]: string | number | Array<number>
  }
}

export interface DeviceSettings {
  [key: string]: DeviceSettingDetails
}