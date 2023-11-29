"use client"
import React, { Component } from "react"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"

class History extends Component {
    render () {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table>
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
                        <TableBody></TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default History