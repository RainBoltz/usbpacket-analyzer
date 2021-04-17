import { AnswerKey, AnswerKeyInBinary } from '../global/typings'

const mapBinValue = (key: string, value: string | number): {[key: string]: string} => {
    //convert device
    if(key == 'device'){
        switch (value){
            case 'Kraken X': return { vid: '0x1e71', pid: '0x0920' }
            case 'Kraken Z': return { vid: '0x1e71', pid: '0x0921' }
            //and else...
        }
    } else if(key == 'direction'){
        switch (value){
            case 'left': return { direction: '0x0001' }
            case 'right': return { direction: '0x0002' }
        }
    }
    //convert else...

    return {}
}

export const convertAnswersToBinary = (answerKey: AnswerKey): AnswerKeyInBinary => {
    const deviceBin = mapBinValue('device', answerKey.device)
    let binAnswerKey: AnswerKeyInBinary = { vid: deviceBin.vid, pid: deviceBin.pid }

    for(const [key, value] of Object.entries(answerKey)){
        if(key !== 'device'){
            binAnswerKey[key as keyof AnswerKeyInBinary] = mapBinValue(key, value)[key]
        }
    }
    return binAnswerKey
}

