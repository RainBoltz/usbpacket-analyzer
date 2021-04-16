export interface AnswerKey{
    device: string,
    channel?: number,
    led_size?: number,
    direction?: 'left' | 'right',
    speed?: number,
    color?: string,
    runs?: number
}

export interface AnswerKeyInBinary{
    vid: string,
    pid: string,
    channel?: string,
    led_size?: string,
    direction?: string,
    speed?: string,
    color?: string,
    runs?: string
}