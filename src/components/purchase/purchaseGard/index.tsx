import { Button, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { formatMoney, formatQty } from '../../tools/utils';

interface CardProps {
    purchase: Purchase;
}

const PurchaseCard: React.FC<CardProps> = ({ purchase }) => {
    return (
        <div className="card col-span-1 gap-2 flex flex-col">
            <div className='flex flex-row justify-between'>
                <div className='bg-[#6d758f] text-white w-10 h-10 rounded text-center'>
                    {purchase.id}
                </div>
                <div className='font-sans font-semibold bg-[#e1f4de] text-[#71ca61] border-[#71ca61] border rounded-lg text-center w-2/6 p-1'>
                    Хүлээн авсан
                </div>
            </div>
            <div className='flex flex-row justify-between font-semibold'>
                <div className='text-[#6d758f] h-8'>
                    {purchase.suplierName}
                </div>
                <div className='text-[#6d758f] h-8'>
                    {purchase.suplierId}
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-[#6d758f] h-8'>
                    {purchase.date}
                </div>
                <div className='text-[#6d758f] h-8'>
                    {purchase.time}
                </div>
            </div>
            <div className='text-center'>
                -----------------------------------------------------------
            </div>
            <div className="card-body">
                <div>
                    <Table size="small">
                        <TableHead className="">
                            <TableRow>
                                <TableCell className="border-none p-1 font-sans text-[#6d758f] font-semibold" align="left">Бараа</TableCell>
                                <TableCell className="border-none p-1 font-sans text-[#6d758f] font-semibold" align="center">Тоо/Шир</TableCell>
                                <TableCell className="border-none p-1 font-sans text-[#6d758f] font-semibold" align="right">Үнэ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                purchase.items.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="border-none p-1 font-sans text-[#8a91a5] " align="left" >{row.name}</TableCell>
                                        <TableCell className="border-none p-1 font-sans text-[#8a91a5] " align="center" >{formatQty(row.qty) + "ш"}</TableCell>
                                        <TableCell className="border-none p-1 font-sans text-[#8a91a5] " align="right">{formatMoney(row.qty * row.costPrice)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className='text-center'>
                -----------------------------------------------------------
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-[#6d758f] h-8'>
                    Хөнгөлөлт дүн:
                </div>
                <div className='text-[#6d758f] h-8'>
                    {formatMoney(purchase.totalAmount)}
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-[#6d758f] h-8'>
                    Нийт үнэ:
                </div>
                <div className='text-[#6d758f] h-8'>
                    {formatMoney(purchase.totalAmount)}
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <Button className='cardSecondaryButton w-40'>Дэлгэрэнгүй</Button>
                <Button className='cardButton w-40'>Төлөх</Button>
            </div>
        </div>
    );
};

export default PurchaseCard;
