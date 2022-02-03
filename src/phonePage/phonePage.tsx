import s from './phonePage.module.css'
import img from '../components/pictures/backgroundImg.svg'
import InputMask from 'react-input-mask';
import {ChangeEvent, useState} from "react";
import {Keyboard} from "./keyboard";

export const PhonePage = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value)
        console.log(phoneNumber)
    }
    const onClickNumber = (value: string) => {
        setPhoneNumber(phoneNumber + value)
        console.log(phoneNumber)
    }


    return (
        <div className={s.phonePage} style={{backgroundImage: `url(${img})`}}>
            <div className={s.promo}>
                <InputMask mask={'+7 (999) 999-99-99'}
                           onChange={onChangeInput}
                           value={phoneNumber}
                           className={s.inputMask}
                           alwaysShowMask/>

                <div>
                    <div onClick={() => onClickNumber('1')}>1111111</div>
                </div>
                <div>
                    <div onClick={() => onClickNumber('2')}>22222</div>
                </div>


                {<Keyboard value={'1'}
                           onClickNumber={onClickNumber}/>}
            </div>


        </div>
    )
}