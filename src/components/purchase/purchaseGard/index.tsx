import { Button, Divider, Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { formatMoney, formatQty } from '../../tools/utils';

interface CardProps {
    purchase: Purchase;
    onPayClick: (purchaseId: string) => void;
    onDetailClick: (purchase: Purchase) => void;
}

const PurchaseCard: React.FC<CardProps> = ({ purchase, onPayClick, onDetailClick }) => {

    const handlePayClick = () => {
        onPayClick(purchase.id);
    };

    const handleDetailClick = () => {
        onDetailClick(purchase);
    };

    return (
        <div className={`card col-span-1 gap-2 flex flex-col justify-between`}>
            <div className='flex flex-row justify-between'>
                <div className='bg-[#6d758f] text-white w-10 h-10 rounded text-center'>
                    {purchase.id}
                </div>
                <div>

                </div>
                {/* <div className=' font-semibold bg-[#e1f4de] text-[#71ca61] border-[#71ca61] border rounded-lg text-center w-2/6 p-1'>
                    Хүлээн авсан
                </div> */}
            </div>
            <div className='flex flex-row justify-between font-semibold'>
                <div className='text-[#6d758f] h-8 text-sm'>
                    Нийлүүлэгч : {purchase.supplierName}
                </div>
                <div className='text-[#6d758f] h-8 text-sm'>
                    Н/№ : {purchase.supplierId}
                </div>
            </div>
            <div className='flex flex-row justify-between'>
                <div className='text-[#6d758f] h-8 text-sm'>
                    {purchase.date}
                </div>
                <div className='text-[#6d758f] h-8 text-sm'>

                </div>
            </div>
            <Divider light />
            <div className="h-full">
                <div className='overflow-auto'>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="cardTable" align="left">Бараа</TableCell>
                                <TableCell className="cardTable" align="center">Тоо/Шир</TableCell>
                                <TableCell className="cardTable" align="right">Үнэ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                purchase.items.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="cardTable" align="left" >{row.itemName}</TableCell>
                                        <TableCell className="cardTable" align="center" >{formatQty(row.qty) + "ш"}</TableCell>
                                        <TableCell className="cardTable" align="right">{formatMoney(row.qty * row.costPrice)}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Divider light />
            <div className='flex flex-row justify-between'>
                <div className='text-[#6d758f] h-8'>
                    Хөнгөлөлт дүн:
                </div>
                <div className='text-[#6d758f] h-8'>
                    {formatMoney(purchase.totalDiscount)}
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
                <Button className='cardSecondaryButton w-40' onClick={() => handleDetailClick()} >Дэлгэрэнгүй</Button>
                <Button className='cardButton w-40' onClick={() => handlePayClick()} disabled={purchase.isPaid}> {purchase.isPaid ? "Төлөгдсөн" : "Төлөх"} </Button>
            </div>
        </div>
    );
};

export default PurchaseCard;
