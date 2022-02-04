import s from './phonePage.module.css'
import img from '../components/pictures/backgroundImg.jpg'
import InputMask, {BeforeMaskedStateChangeStates, InputState} from 'react-input-mask';
import {ChangeEvent, useState} from "react";
import {Keyboard} from "./keyboard";

export const PhonePage = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [currentValue, setCurrentValue] = useState<number>(5)

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('onChanged', e.target.value)
        setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))
        console.log(e.target.value.replace(/[^0-9]/g, ''))

    }

    const onClickNumber = (value: string) => {
        if (value === 'clear') {
            setPhoneNumber(phoneNumber.slice(0, -1))
        } else {
            if (phoneNumber.length < 11) {
                setPhoneNumber(phoneNumber + value)
            }
        }

        console.log('phoneNumber', phoneNumber)
    }

    const a: { [key: string]: { [key: number]: number } } = {
        'down': {
            5: 8
        }
    }

    const btnData = [
        {class:'box1',value: '1'},
        {class:'box1',value: '2'},
        {class:'box1',value: '3'},
        {class:'box2',value: '4'},
        {class:'box2',value: '5'},
        {class:'box2',value: '6'},
        {class:'box3',value: '7'},
        {class:'box4',value: '8'},
        {class:'box5',value: '9'},
        {class:'box6',value: 'clear'},
        {class:'box6',value: '0'},

    ]

    function onKeyDownHandler(e: any) {
        const nextSelected = a['down'][currentValue];
        setCurrentValue(nextSelected)
    }

    return (

        <div className={s.phonePage} style={{background: `url(${img}) no-repeat center center/100%`}} onKeyDown={onKeyDownHandler}>

            <div className={s.promo}>
                <InputMask mask={'+7 (999) 999-99-99'}
                           onChange={onChangeInput}
                           value={phoneNumber}
                           className={s.inputMask}
                           alwaysShowMask/>
                <div className={s.keysDashboard}>
                    {btnData.map(btn => {
                        return <Keyboard key={btn.value}
                                         class = {btn.class}
                                         value={btn.value}
                                         onClickNumber={onClickNumber}/>
                    })}
                </div>
            </div>


        </div>
    )
}