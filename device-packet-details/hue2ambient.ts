import { DeviceSettings } from '../global/typings'

const hue2ambient: DeviceSettings = {
    LightingMode: {
        isBitmask: false,
        bitIndex: -1,
        byteIndex: 4,
        value: {
            'Fixed mode': 0,
            'Fading mode': 1,
            'Spectrum Wave mode': 2,
            'Marquee mode': 3,
            'Covering marquee mode': 4,
            'Alternating mode': 5,
            'Pulse mode': 6,
            'Breathing mode': 7,
            'Candle mode': 8,
            'Starry night mode': 9,
            'Alert mode': 10,
            'Rainbow Flow mode': 11,
            'Super Rainbow mode': 12,
            'Rainbow Pulse mode': 13
        }
    }
}

export default hue2ambient