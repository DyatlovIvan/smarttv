import s from './phonePage.module.css'
type KeyboardType = {
    value:string
    class:string
    onClickNumber:(value:string)=>void
}
export const Keyboard = ({value,onClickNumber,...props}:KeyboardType) =>{

    return(
        <button className={`${s.btn}`}
        onClick={()=>onClickNumber(value)}>
            {value}
        </button>
    )
}