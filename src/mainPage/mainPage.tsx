import React from "react";
// @ts-ignore
import video from "../components/videos/video.mp4";
import qr from '../components/pictures/QR.png'
import s from "./mainPage.module.css";
import {useNavigate} from "react-router-dom";

export const MainPage = () =>{
    const navigate = useNavigate()
    const onClickHandler = () =>{
        navigate('/phonePage')
    }
    return(
        <div className={s.mainPage}>
            <video autoPlay loop muted
                   style={{
                       position:'absolute',
                       width:'100%',
                       left:'50%',
                       top:'50%',
                       height:'100%',
                       objectFit:'cover',
                       transform:'translate(-50%,-50%)',
                       zIndex:'-1'
                   }}>
                <source src={video} type="video/mp4"/>
            </video>
            <div className={s.banner}>
                <span className={s.topText}>ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! ПОДАРИТЕ ЕМУ СОБАКУ</span>
                <img className={s.qr} src={qr} alt="qr"/>
                <span className={s.botText}>Сканируйте QR-код или нажмите ОК</span>
                <button className={s.btn} onClick={onClickHandler}>OK</button>
            </div>
        </div>
    )
}