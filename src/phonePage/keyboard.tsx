import s from './phonePage.module.css'
type KeyboardType = {
    value:string
    currentValue:string
    onClickNumber:(value:string)=>void
    setCurrentValueHandler:(value:string)=>void
}
export const Keyboard = ({value,onClickNumber,currentValue,setCurrentValueHandler}:KeyboardType) =>{
    const onClickHandler = (value:string)=>{
        onClickNumber(value)
        setCurrentValueHandler(value)

    }
    return(
        <button className={`${s.btn} ${value===currentValue?s.btnActive:''}`}
        onClick={()=>onClickHandler(value)}>
            {value}
        </button>
    )
}