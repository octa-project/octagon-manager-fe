"use client"
import React, { Component } from "react"
import PosSection from "./posSection"
import Payment from "../payment"
import { SnackbarProvider } from "notistack";

export class Sale extends Component {
  state = {
    totalAmount: 0,
    qty: 0,
    saleId: 0,
    paidComfirmed: false
  }
  dataMerge = async (sales:any) => {
    const sum = sales.saleItems.reduce(function(prev: number, current: { qty: string | number; }) {
      return prev + +current.qty
    }, 0)
    this.setState({
      saleId: sales.id,
      totalAmount: sales.amount,
      qty: sum
    })
  }
  paidComfirmed = (val: boolean) => {
    console.log('paidComfirmed: ', val)
    if(val){
      this.setState({
        totalAmount: 0,
        qty: 0,
        saleId: 0,
        paidComfirmed: false
      })
    }
  }
  render() {
    return (
    <SnackbarProvider>
      <div>
        <div>
          <PosSection
            dataMerge={this.dataMerge}
          />
        </div>
        <div className="bg-slate-200 shadow-sm shadow-black/20 absolute w-full left-0 bottom-0">
          <Payment
            totalAmount={this.state.totalAmount}
            totalQty={this.state.qty}
            saleId={this.state.saleId}
            paidComfirmed={this.paidComfirmed}
          />
        </div>
      </div>
    </SnackbarProvider>
    )
  }
}

export default Sale