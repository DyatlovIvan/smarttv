import s from './phonePage.module.css'
import img from '../components/pictures/backgroundImg.jpg'
import qr from '../components/pictures/QR.png'
import InputMask from 'react-input-mask';
import {ChangeEvent, useEffect, useState} from "react";
import {Keyboard} from "./keyboard";
import {useNavigate} from "react-router-dom";
import {commands} from "../utils/commands";
import {btnData, ButtonsName} from "../utils/buttons";
import {URLS} from "../utils/urls";

export const PhonePage = () => {
    const navigation = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState<string>('7')
    const [currentValue, setCurrentValue] = useState<string>('5')
    const [code, setCode] = useState<string>('')
    const [checkbox, setCheckbox] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>(false)

    const onClickNumber = (value: string) => {
        if (value === ButtonsName.Clear) {
            setPhoneNumber(phoneNumber.slice(0, -1))
        } else {
            if (phoneNumber.length < 11) {
                setPhoneNumber(phoneNumber + value)
            }
        }
    }

    const onKeyPressHandler = (e: any) => {
        setCode(e.code)
    }

    const checkboxHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setCheckbox(!checkbox)
    }

    const PressExitHandler = () => {
        //setCurrentValueHandler('1')
        navigation(URLS.MAIN)
    }

    const PressAcceptHandler = () => {
        setCurrentValue(ButtonsName.Exit)
        setSuccess(true)
    }

    const setCurrentValueHandler = (value: string) => {
        setCurrentValue(value)
    }
    useEffect(() => {
        window.addEventListener("keydown", onKeyPressHandler)
        return () => {
            window.removeEventListener("keydown", onKeyPressHandler)
        }
    }, [])

    useEffect(() => {
        if (code === 'Enter' && currentValue === ButtonsName.Accept) {
            PressAcceptHandler()
        } else if (code === 'Enter' && currentValue === ButtonsName.Exit) {
            PressExitHandler()
        } else if ((code === 'Enter' && currentValue === ButtonsName.Clear) || code === 'Backspace') {
            setPhoneNumber(phoneNumber.slice(0, -1))
        } else if (code === 'Enter') {
            setPhoneNumber(phoneNumber + currentValue)
        } else if (code.replace(/[^a-zа-яё]/gi, '') === 'Digit') {
            setPhoneNumber(phoneNumber + code.replace(/[^0-9]/g, ''))
        } else {
            if (commands[code]) {
                setCurrentValue(commands[code][currentValue]);
            }
        }
        setCode('')
    }, [code])

    useEffect(() => {
        console.log(checkbox)
        phoneNumber.length < 10 || !checkbox ? setDisabled(true) : setDisabled(false)
    }, [phoneNumber, checkbox])
    return (
        <div className={s.phonePage}
             style={{background: `url(${img}) no-repeat center center/100%`}}
             onMouseDown={event => event.preventDefault()}>
            {!success ?
                <div className={s.promo}>
                    <div className={s.title}>Введите ваш номер мобильного телефона</div>
                    <InputMask mask={'+7 (999) 999-99-99'}
                        // onChange={onChangeInput}
                               value={phoneNumber}
                               className={s.inputMask}
                               alwaysShowMask
                    />
                    <div className={s.text}>и с Вами свяжется наш менеждер для дальнейшей консультации</div>
                    <div className={s.keysDashboard}>
                        {btnData.filter(f => f.value !== ButtonsName.Accept && f.value !== ButtonsName.Exit).map(btn => {
                            return <Keyboard key={btn.value}
                                             value={btn.value}
                                             currentValue={currentValue}
                                             onClickNumber={onClickNumber}
                                             setCurrentValueHandler={setCurrentValueHandler}/>
                        })}
                    </div>
                    <div className={s.agreement}>
                        <label className={s.agreementText}>
                            <input className={s.checkbox}
                                   type={'checkbox'}
                                   checked={checkbox}
                                   onChange={checkboxHandler}/>
                            Согласие на обработку персональных данных
                        </label>
                    </div>

                    <button className={`${s.btn} ${s.successBtn} ${btnData[11].value === currentValue ? s.btnActive : ''}`}
                            onClick={PressAcceptHandler}
                            disabled={disabled}
                    >
                        Подтвердить номер
                    </button>
                </div>
                :
                <div className={s.promo}>
                    <div className={s.successTitle}>ЗАЯВКА ПРИНЯТА</div>
                    <div className={s.text}>Держите телефон под рукой. Скоро с Вами свяжется наш менеджер.</div>
                </div>}


            <div className={s.buttonExitContainer}>
                <button className={`${s.buttonExit} ${btnData[12].value === currentValue ? s.btnActive : ''}`}
                        onClick={PressExitHandler}>
                    {btnData[12].value}
                </button>
            </div>

            <div className={s.qrArea}>
                <label>
                    Сканируйте QR-код ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
                    <img src={qr} alt="qr"/>
                </label>
            </div>
        </div>
    )
}