"use client"
import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
// import 'ag-grid-enterprise';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import styles from './branch.module.css';
import api from "@/src/api";
import { Drawer } from "@mui/material";

const index = () => {

    useEffect(() => {
        getAllBranch();
    },[]);

    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [branchList, setBranchList] = useState([]);
    const [currentBranchId, setCurrentBranchId] = useState(0);
    const [currentBranchName, setCurrentBranchName] = useState('');
    const [currentBranchPhone, setCurrentBranchPhone] = useState('');

    const openBranchRegister = () => {
        setCurrentBranchName('');
        setCurrentBranchPhone('');
        setIsOpenDrawer(true);
    };

    const closeBranchRegister = () => {
        setIsOpenDrawer(false);
    };

    const handleClickOnBranchItem = (row:any) => {
        setCurrentBranchId(row?.id);
        setCurrentBranchName(row?.name);
        setCurrentBranchPhone(row?.phone)
        setIsOpenDrawer(true);
    };

    const getAllBranch = async () => {
        try {
            const result = await api.getBranchAll.GetAllBranch();
            if (result.data.code === "200") {
                console.log(result.data.data)
                setBranchList(result.data.data)
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } 
    }

    const saveBranch = async () => {
        try {
            let body = {};
            if(currentBranchId > 0) {
                body = {
                    id: currentBranchId,
                    name: currentBranchName,
                    phone: currentBranchPhone,
                    longitude: 0,
                    latitude: 0
                }
            } else {
                body = {
                    name: currentBranchName,
                    phone: currentBranchPhone,
                    longitude: 0,
                    latitude: 0
                }
            }
            const result = await api.saveBranch.SaveBranch(body)
            if (result.data.code === "200") {
                alert("Амжилттай хадгаллаа");
                setIsOpenDrawer(false);
                getAllBranch();
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        } 
    }


        return ( 
            <div className={styles.mainBody}>
                <div className="flex justify-between">
                    <div className="flex px-1">
                        <p className="text-lg font-normal text-black/[0.6] mb-1 self-center">Хайлт:</p>
                        <input type="text" className="bg-white h-[42px] rounded-lg px-4 ml-3 font-normal text-base w-64 focus:bg-white focus:outline-none focus:border focus:placeholder:opacity-0" placeholder="Хайх утгаа оруулна уу."/>
                    </div>
                    <div className="flex">
                        <button onClick={() => openBranchRegister()} className="py-3 px-6 bg-black rounded-lg mr-3 group disabled:bg-neutralGray hover:opacity-80"><p className="text-white font-semibold text-base leading-5 group-disabled:text-black/50">Салбар нэмэх</p></button>
                    </div>
                </div>
                <div className={styles.branchHeader}>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Нэр</span></div>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Төрөл</span></div>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Хаяг</span></div>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Аймаг/хот</span></div>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Сум/дүүрэг</span></div>
                    <div className={styles.branchHeaderItem}><span style={{color: '#c9ccd1'}}>Утас</span></div>
                    <div className={styles.branchHeaderItemLast}><span style={{color: '#c9ccd1'}}>Цахим шуудан</span></div>
                </div>
                {
                    branchList.map((item, index) => (
                        // <div key={index}>{item}</div>
                        <div key={index} className={styles.branchListItem} onClick={() => handleClickOnBranchItem(item)}>
                            <div className={styles.branchItem}><span>{item?.name}</span></div>
                            <div className={styles.branchItem}><span>{item?.type_name}</span></div>
                            <div className={styles.branchItem}><span>{item?.address}</span></div>
                            <div className={styles.branchItem}><span>{item?.aimagKhot}</span></div>
                            <div className={styles.branchItem}><span>{item?.sumDuureg}</span></div>
                            <div className={styles.branchItem}><span>{item?.phone}</span></div>
                            <div className={styles.branchItem}><span>{item?.email}</span></div>
                        </div>
                    ))
                }

                <Drawer 
                    anchor="right"
                    open={isOpenDrawer}>
                    
                    <div className={styles.customerDrawer} >
                        <div className='flex w-auto justify-between'>
                            <div className="flex">
                                <button onClick={() => closeBranchRegister()} className="bg-gray-100 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center">
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg> */}
                                    Х
                                </button>
                            </div>
                            <span className={styles.spanHeader}>Салбарын мэдээлэл</span>
                            <div className="flex">
                                <button onClick={() => saveBranch()} className="py-3 px-6 bg-black rounded-lg mr-3 group disabled:bg-neutralGray hover:opacity-80"><p className="text-white font-semibold text-base leading-5 group-disabled:text-black/50">Хадгалах</p></button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full px-1 mt-5">
                            <div className="flex flex-col w-full px-1">
                                <p className="text-lg font-normal text-black/[0.8] mb-1">Салбарын нэр:</p>
                                <input value={currentBranchName} onChange={e => setCurrentBranchName(e.currentTarget.value)} type="text" className="bg-gray-100 h-[42px] rounded-lg px-4 font-normal text-base focus:bg-white focus:outline-none focus:border focus:border-green-600 focus:placeholder:opacity-0" placeholder="Салбарын нэр" />
                            </div>
                            <div className="flex flex-col w-full px-1 mt-3">
                                <p className="text-lg font-normal text-black/[0.6] mb-1">Төрөл:</p>
                                <select className="bg-gray-100 h-[42px] rounded-lg px-4 font-normal text-base focus:bg-white focus:outline-none focus:border focus:border-green-600">
                                    <option>Салбарын төрлөө сонгоно уу.</option>
                                    <option>8 нэрийн дэлгүүр</option>
                                    <option>6 нэрийн дэлгүүр</option>
                                    <option>Супермаркет</option>
                                </select>
                            </div>
                            <div className="flex flex-col w-full px-1 mt-3">
                                <p className="text-lg font-normal text-black/[0.8] mb-1">Утасны дугаар:</p>
                                <input value={currentBranchPhone} onChange={e => setCurrentBranchPhone(e.currentTarget.value)} type="text" className="bg-gray-100 h-[42px] rounded-lg px-4 font-normal text-base focus:bg-white focus:outline-none focus:border focus:border-green-600 focus:placeholder:opacity-0" placeholder="Утасны дугаар" />
                            </div>
                        </div>
                    </div>
                </Drawer>
            </div>
    )
}

export default index