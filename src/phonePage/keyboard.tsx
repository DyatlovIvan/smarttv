import s from './phonePage.module.css'
type KeyboardType = {
    value:string
    onClickNumber:(value:string)=>void
}
export const Keyboard = ({value,onClickNumber}:KeyboardType) =>{

    return(
        <button className={s.btn}
        onClick={()=>onClickNumber(value)}>
            {value}
        </button>
    )
}