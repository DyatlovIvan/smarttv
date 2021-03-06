import s from './phonePage.module.css'
import img from '../components/pictures/backgroundImg.jpg'
import qr from '../components/pictures/QR.png'
import InputMask from 'react-input-mask';
import {useEffect, useState} from "react";
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

    const checkboxHandler = () => {
        setCheckbox(!checkbox)
    }

    const PressExitHandler = () => {
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
        } else if (code.replace(/[^a-z??-????]/gi, '') === 'Digit') {
            setPhoneNumber(phoneNumber + code.replace(/[^0-9]/g, ''))
        } else {
            if (commands[code]) {
                setCurrentValue(commands[code][currentValue]);
            }
        }
        setCode('')
    }, [code])

    useEffect(() => {
        phoneNumber.length < 10 || !checkbox ? setDisabled(true) : setDisabled(false)
    }, [phoneNumber, checkbox])
    return (
        <div className={s.phonePage}
             style={{background: `url(${img}) no-repeat center center/100%`}}
             onMouseDown={event => event.preventDefault()}>
            {!success ?
                <div className={s.promo}>
                    <div className={s.title}>?????????????? ?????? ?????????? ???????????????????? ????????????????</div>
                    <InputMask mask={'+7 (999) 999-99-99'}
                        // onChange={onChangeInput}
                               value={phoneNumber}
                               className={s.inputMask}
                               alwaysShowMask
                    />
                    <div className={s.text}>?? ?? ???????? ???????????????? ?????? ???????????????? ?????? ???????????????????? ????????????????????????</div>
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
                            ???????????????? ???? ?????????????????? ???????????????????????? ????????????
                        </label>
                    </div>

                    <button
                        className={`${s.btn} ${s.successBtn} ${btnData[11].value === currentValue ? s.btnActive : ''}`}
                        onClick={PressAcceptHandler}
                        disabled={disabled}
                    >
                        ?????????????????????? ??????????
                    </button>
                </div>
                :
                <div className={s.promo}>
                    <div className={s.successTitle}>???????????? ??????????????</div>
                    <div className={`${s.successText} ${s.text}`}>?????????????? ?????????????? ?????? ??????????.<br/> ?????????? ?? ???????? ????????????????
                        ?????? ????????????????.
                    </div>
                </div>}


            <div className={s.buttonExitContainer}>
                <button className={`${s.buttonExit} ${btnData[12].value === currentValue ? s.btnActive : ''}`}
                        onClick={PressExitHandler}>
                    X
                </button>
            </div>

            <div className={s.qrArea}>
                <div className={s.containerQR}>
                    <label className={s.labelQr}>???????????????????? QR-?????? ?????? ?????????????????? ???????????????????????????? ????????????????????</label>
                    <img className={s.qr} src={qr} alt="qr"/>
                </div>
            </div>
        </div>
    )
}