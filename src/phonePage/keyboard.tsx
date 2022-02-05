import s from './phonePage.module.css'
type KeyboardType = {
    value:string
    currentValue:string
    onClickNumber:(value:string)=>void
}
export const Keyboard = ({value,onClickNumber,currentValue}:KeyboardType) =>{

    return(
        <button className={`${s.btn} ${value===currentValue?s.btnActive:''}`}
        onClick={()=>onClickNumber(value)}>
            {value}
        </button>
    )
}