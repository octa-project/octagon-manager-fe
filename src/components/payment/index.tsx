import React, { useState } from "react";
import { Box, Modal, Tab, Tabs } from "@mui/material";
import api from "@/src/api";
import Snackbar from '@/src/components/tools/snackAlert'
import CustomButton from "../tools/customButton";
import CustomTextField from "../tools/textField";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        className="bg-white"
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className="pl-8 pb-8">{children}</Box>
        )}
      </div>
    );
  }

const Payment = ({ totalAmount, totalQty, saleId, paidComfirmed }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [openModal, setOpenModal] = useState(false);
    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);
    const [currentCashAmount, setCurrentCashAmount] = useState(0);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const getTransactionsAmount = async () => {
        try {
            const res = await api.transaction_get_transactions_amount_sale_id.getTransactionsAmountBySaleId(saleId)
            setTotalPaidAmount(res.data.data)
            Snackbar.error(res.data.msg)
        } catch (error) {
            Snackbar.error(error.message)
        }
    };

    const saveTransaction = async () => {
        paidComfirmed(true)
        try {
            const body = {
                saleId: saleId,
                name: "Бэлнээр",
                amount: currentCashAmount,
                transactionType: 1,
                paidAmount: currentCashAmount,
                bankTransactionId: null,
                deleted: false,
            }
            const res = await api.transaction_save.saveTransaction(body)
            if (res.data.code == "200") {
                getTransactionsAmount()
                setCurrentCashAmount(totalAmount-res.data.data.amount)
                setCartAmount(totalAmount-res.data.data.amount)
                Snackbar.success('Бэлэн төлөлт амжилттай хийгдлээ')
                
            } else {
                Snackbar.error(res.data.msg)
            }
        } catch (error) {
            Snackbar.error(error.message)
        }
    };

    const doBankTerminalTransaction = async () => {

        try {
            const body = {
                Name: "EzPay",
                Amount: cartAmount,
                RefNo: "123456",
                Port: "COM9",
                PaymentType: 1
            }
            const res = await api.bank_terminal_transaction.bankTerminalTransaction(body)
            if (res.data.succeed == true) {
                const body = {
                    saleId: saleId,
                    name: "Банкаар",
                    amount: cartAmount,
                    transactionType: 2,
                    paidAmount: cartAmount,
                    bankTransactionId: null,
                    deleted: false,
                }
                const res = await api.transaction_save.saveTransaction(body)
                if (res.data.code == "200") {
                    Snackbar.success('Банкааар амжилттай гүйлгээ хийгдлээ')
                    getTransactionsAmount();
                    setCartAmount(0)
                }
            }else{
                Snackbar.error(res.data.msg)
            }
        } catch (error) {
            Snackbar.error(error.message)
        }
    }

    const printTransaction = async () => {
        try {
            const sales = await api.get_sale_items_by_sale_id.getSaleItemsBySaleId(saleId);
            if (sales.data.code === "200") {
                const saleItems = sales.data.data;

                const body = {
                    merchant: "Octa",
                    sale_items: saleItems.map((element: { itemName: any; qty: any; unitSalePrice: { toString: () => any; }; }) => ({
                        name: element.itemName,
                        qty: element.qty,
                        unit_price: element.unitSalePrice.toString(),
                    })),
                };
                const res = await api.bank_print_transaction.bankPrintTransaction(body);

                if (res.data.code === "200") {
                    handleCloseModal
                    Snackbar.success('Ажилттай борлуулалт хийгдлээ')
                    paidComfirmed(true)
                } else {
                    Snackbar.error(res.data.msg)
                }

                
            }else{
                Snackbar.error(sales.data.msg)
            }
        } catch (error) {
            Snackbar.error(error.message)
        }
    };

    
    const currencyFormat = (num:number) => {
        return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    return (
        <div>
            <div className="grid grid-cols-3 py-8 gap-y-8 text-2xl">
                <div className="px-8"></div>
                <div className="px-8 space-y-2 border-l border-r border-slate-300">
                    <div className="flex justify-between"><span>Нийт дүн:</span><strong>{currencyFormat(totalAmount)}₮</strong></div>
                    <div className="flex justify-between"><span>Хямдрал:</span><strong>0₮</strong></div>
                    <div className="flex justify-between"><span>Тоо ширхэг:</span><strong>{totalQty}</strong></div>
                </div>
                <div className="px-8 space-y-3">
                    <div className="flex justify-end gap-x-8"><span className="uppercase">Төлөх дүн:</span><strong>{currencyFormat(totalAmount)}₮</strong></div>
                    <div className="text-right">
                        <CustomButton type="success" label="Төлбөр төлөх" onClick={() => setOpenModal(true)}/>
                    </div>
                </div>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                 
                <div className="w-3/5 bg-white p-10 rounded-lg text-lg">
                    <Box className="grid grid-cols-3 w-full">
                        <Tabs orientation="vertical" value={value} onChange={handleChange}>
                            <Tab className={`text-xl py-6`} label="Бэлнээр" />
                            <Tab className={`text-xl py-6`} label="Картаар" />
                            <Tab className={`text-xl py-6`} label="Дансаар" />
                            <Tab className={`text-xl py-6`} label="Цахим хэтэвчээр" />
                            <Tab className={`text-xl py-6`} label="Зээлээр" />
                        </Tabs>
                        <div className="col-span-2">
                        <TabPanel value={value} index={0}>
                            <div className="space-y-8">
                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2">
                                            <div className="text-xl">Нийт төлөх дүн</div>
                                            <div className="text-left text-black">
                                                <CustomTextField fullWidth value={currencyFormat(totalAmount)} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="text-xl">Нийт төлсөн дүн</div>
                                            <div className="text-left text-black">
                                                <CustomTextField fullWidth value={currencyFormat(totalPaidAmount)} InputProps={{ readOnly: true }} />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="text-xl">Одоо төлөх дүн</div>
                                            <div className="text-left text-black">
                                                <CustomTextField fullWidth value={currentCashAmount} onChange={(e) => setCurrentCashAmount(e.currentTarget.value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <CustomButton type="success" label="Бэлэн төлөлт хийх" classes="h-20" onClick={saveTransaction}/>
                                    </div>
                                </div>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2">
                                        <div className="text-xl">Нийт төлөх дүн</div>
                                        <div className="text-left text-black font-bold text-lg">
                                            <CustomTextField fullWidth defaultValue={currencyFormat(totalAmount)} InputProps={{ readOnly: true }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="text-xl">Нийт төлсөн дүн</div>
                                        <div className="text-left text-black font-bold text-lg">
                                            <CustomTextField fullWidth defaultValue={currencyFormat(totalPaidAmount)} InputProps={{ readOnly: true }} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="text-xl">Картаар төлөх дүн</div>
                                        <div className="text-left text-black font-bold text-lg">
                                            <CustomTextField fullWidth value={cartAmount} onChange={(e) => setCartAmount(e.currentTarget.value)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <CustomButton type="success" label="Банкны гүйлгээ хийх" classes="h-20" onClick={doBankTerminalTransaction}/>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            Дансаар
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            Цахим хэтэвчээр
                        </TabPanel>
                        <TabPanel value={value} index={4}>
                            Зээлээр
                        </TabPanel>
                        </div>
                    </Box>
                    <div className="text-right border-t pt-10">
                        <CustomButton type="default" label="Баримт хэвлэх" classes="h-20" onClick={printTransaction}/>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default Payment;