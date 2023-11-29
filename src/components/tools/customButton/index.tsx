import { Button } from "@mui/material"
import { Fragment } from "react"

const renderStyle = (type: string) => {
    switch(type) {
        case 'default':
        return 'bg-slate-500 text-white hover:bg-slate-600'
        case 'success':
        return 'bg-green-500 text-white hover:bg-green-600'
        case 'info':
        return 'bg-blue-500 text-white hover:bg-blue-600'
        case 'cancel':
        return 'bg-rose-500 text-white hover:bg-rose-600'
        case 'disable':
        return 'bg-gray-400 disabled:text-white'
        default:
        return ''
    }
}
export default function CustomButton (props:any) {
    const { classes, type, label, ...prop} = props
    
    return (
        <Fragment>
            <Button className={`${renderStyle(type)} text-lg py-4 px-8 ${classes}`} {...prop}>{label}</Button>
        </Fragment>
    )
}