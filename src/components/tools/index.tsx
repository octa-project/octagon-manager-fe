import React, { useState } from "react"
import CustomButton from "./customButton"
import CustomTextField from "./textField"
const showConsole = () => {
    alert('Component buttoniig zovhon client compnent deer duudna')
 }
export default function Tools() {
    const [val, setVal] = useState('')
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-4 gap-3">
                <div>
                    <CustomButton type="success" label="fullWidth" fullWidth/>
                </div>
                <div className="space-x-3 col-span-3">
                    <CustomButton type="default" label="default" onClick={showConsole}/>
                    <CustomButton type="success" label="Success"/>
                    <CustomButton type="info" label="info"/>
                    <CustomButton type="cancel" label="cancel"/>
                    <CustomButton type="disable" label="Disabled" disabled/>
                    <CustomButton label="Custome" classes="bg-gray-100 text-slate-700 hover:bg-gray-200"/>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div>
                <CustomTextField label="Бар кодоор хайх fullWidth" value={val} onChange={(e: { target: { value: string } }) => {setVal(e.target.value)}} fullWidth/>
                </div>
                <div className="space-x-3 col-span-2">
                <CustomTextField label="Бар кодоор хайх" value={val} onChange={(e: { target: { value: string } }) => {setVal(e.target.value)}}/>
                </div>
            </div>
        </div>
    )
}