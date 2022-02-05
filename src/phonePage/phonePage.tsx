import s from './phonePage.module.css'
import img from '../components/pictures/backgroundImg.jpg'
import qr from '../components/pictures/QR.png'
import InputMask from 'react-input-mask';
import {ChangeEvent, useEffect, useState} from "react";
import {Keyboard} from "./keyboard";
import {useNavigate} from "react-router-dom";

export const PhonePage = () => {
    const navigation = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState<string>('7')
    const [currentValue, setCurrentValue] = useState<string>('5')
    const [code, setCode] = useState<string>('')
    const [checkbox, setCheckbox] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)


    // const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     console.log('onChanged', e.target.value)
    //     setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))
    //     console.log(e.target.value.replace(/[^0-9]/g, ''))
    //
    // }

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

    const commands: { [key: string]: { [key: string]: string } } = {
        'ArrowDown': {
            '1': '4',
            '2': '5',
            '3': '6',
            '4': '7',
            '5': '8',
            '6': '9',
            '7': 'clear',
            '8': 'clear',
            '9': '0',
            'clear': 'accept',
            '0': 'accept',
            'accept': 'accept',
            'exit': 'exit'
        },
        'ArrowUp': {
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '1',
            '5': '2',
            '6': '3',
            '7': '4',
            '8': '5',
            '9': '6',
            'clear': '7',
            '0': '9',
            'accept': 'clear',
            'exit': 'exit'
        },
        'ArrowLeft': {
            '1': '1',
            '2': '1',
            '3': '2',
            '4': '4',
            '5': '4',
            '6': '5',
            '7': '8',
            '8': '7',
            '9': '8',
            'clear': 'clear',
            '0': 'clear',
            'exit': '3',
            'accept': 'accept',

        },
        'ArrowRight': {
            '1': '2',
            '2': '3',
            '3': 'exit',
            '4': '5',
            '5': '6',
            '6': 'exit',
            '7': '8',
            '8': '9',
            '9': 'exit',
            'clear': '0',
            '0': 'exit',
            'accept': 'exit',
            'exit': 'exit'

        }
    }

    const btnData = [
        {value: '1'},
        {value: '2'},
        {value: '3'},
        {value: '4'},
        {value: '5'},
        {value: '6'},
        {value: '7'},
        {value: '8'},
        {value: '9'},
        {value: 'clear'},
        {value: '0'},
        {value: 'accept'},
        {value: 'exit'}
    ]

    const onKeyPressHandler = (e: any) => {
        setCode(e.code)
    }

    const checkboxHandler = (value: ChangeEvent<HTMLInputElement>) => {
        setCheckbox(!checkbox)
    }

    const exitHandler = () => {
        navigation('/main')
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
        if (code === 'Enter' && currentValue === 'accept') {

        } else if ((code === 'Enter' && currentValue === 'clear') || code === 'Backspace') {
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
                    {btnData.filter(f => f.value !== 'accept' && f.value !== 'exit').map(btn => {
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

                <button className={`${s.btn} ${btnData[11].value === currentValue ? s.btnActive : ''}`}
                        disabled={disabled}>
                    Подтвердить номер
                </button>
            </div>

            <div className={s.buttonExitContainer}>
                <button className={`${s.buttonExit} ${btnData[12].value === currentValue ? s.btnActive : ''}`}
                        onClick={exitHandler}>
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