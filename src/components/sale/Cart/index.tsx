import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from "@mui/material"
import React, { Component } from "react"
import { Add, Remove } from '@mui/icons-material'
interface Item {
    id: number,
    itemBarcode: string,
    itemName: string,
    qty: number,
    unitSalePrice: number
}
export class Cart extends Component {
    currencyFormat = (num:number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    onFocus = (event: { target: any }) => {
        var target = event.target;
        setTimeout(function() {
            target.select();
        }, 0);
    }
    render() {
        const { items, onCountUp, onCountDown } = this.props
        return (
            <div>
                <TableContainer sx={{ maxHeight: 575 }} component={Paper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell className="font-bold text-base w-9">№</TableCell>
                                <TableCell className="font-bold text-base">Бар код</TableCell>
                                <TableCell className="font-bold text-base">Барааны нэр</TableCell>
                                <TableCell className="font-bold text-base">Хэмжээ</TableCell>
                                <TableCell className="font-bold text-base">Үнэ</TableCell>
                                <TableCell className="font-bold text-base text-right">Нийт үнэ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item:Item, key:number) =>
                            <TableRow key={item.id}>
                                <TableCell className="text-base font-bold text-center">{key+1}</TableCell>
                                <TableCell className="text-base">{item.itemBarcode}</TableCell>
                                <TableCell className="text-base">{item.itemName}</TableCell>
                                <TableCell className="text-base space-x-1">
                                    <input readOnly type="text" className="border border-slate-200 rounded text-base py-1 w-12 h-9 text-center" value={item.qty}/>
                                    <button onClick={() => onCountUp(item)} className="rounded bg-slate-200 px-0 w-10 h-9 text-slate-700 hover:bg-green-400 hover:text-white"><Add className="text-base"/></button>
                                    {item.qty > 0 ?
                                    (<button onClick={() => onCountDown(item)} className="rounded bg-slate-200 px-0 w-10 h-9 text-slate-700 hover:bg-red-400 hover:text-white disabled:bg-gray-100">
                                    <Remove className="text-base"/>
                                    </button>) : null}
                                </TableCell>
                                <TableCell className="text-base">{this.currencyFormat(item.unitSalePrice)}₮</TableCell>
                                <TableCell className="text-base text-right font-bold">{this.currencyFormat(item.qty*item.unitSalePrice)}₮</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
        }
}
export default Cart