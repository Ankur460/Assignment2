import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { IoSaveSharp } from "react-icons/io5";
import { useState } from 'react';

function TableRow({data,setData,row,key,setPageNo,currPage,setCurrpage,handlePagintion,selectedData,setSelectedData}) {
// console.log(row);   
    const [ro,setro] = useState(row);
    const [updateMode,setUpdateMode] = useState((Boolean)(false));
    const [selected,setSelected] = useState(selectedData.includes(row.id))
    const deleteRow = () => {
        let newData = [...data]
        let newDataUpdated = newData.filter((dat) => dat.id !== row.id);
        let nPageCount=Math.ceil(newDataUpdated.length/10);
        setPageNo(nPageCount);
        if(currPage>nPageCount){
            setCurrpage(currPage-1);
            handlePagintion(currPage-1);
        }else{
            handlePagintion(currPage);
        }
        setData(newDataUpdated);
    }
    const handleEditClick= () => {
        console.log("hey");
        setUpdateMode(true);
        console.log(updateMode);
    }

    const handleSelection =() => {
        if(selectedData.includes(row.id)) {
            let newSelectedData = [];
            for(let i=0;i<selectedData.length;i++) {
                if(selectedData[i] !== row.id) {
                    newSelectedData.push(selectedData[i]);
                }
            }
            setSelected(false);
            console.log(newSelectedData);
            setSelectedData([...newSelectedData]);
        } else {
            setSelected(true);
            let newSelectedData = [...selectedData,row.id]
            console.log(newSelectedData);
            setSelectedData([...newSelectedData]);
            console.log(selectedData);
        }
    }
  return (
    updateMode === false ? <tr key={key} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td class="px-6 py-4">
                    <input type='checkbox' onClick={handleSelection} checked={selected}/>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {ro.name}
                </th>
                <td class="px-6 py-4">
                    {ro.email}
                </td>
                <td class="px-6 py-4">
                    {ro.role}
                </td>
                <td class="px-6 py-4 space-x-4">
                    <button className='p-2 rounded-lg border border-black text-black' onClick={handleEditClick}><FaPen/></button>
                    <button className='p-2 rounded-lg border border-red-800 text-red-800' onClick={deleteRow}><MdDelete/></button>
                </td>
            </tr> :
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <input onChange={(e) => {
                    setro({
                        ...ro,
                        name: e.target.value
                    })
                }} type = "text" className='p-2 border border-black' value = {ro.name}/>
            </th>
            <td class="px-6 py-4">
                <input  onChange={(e) => {
                    setro({
                        ...ro,
                        email: e.target.value
                    })
                }} className='p-2 border border-black' type = "text" value = {ro.email}/>
            </td>
            <td class="px-6 py-4">
                {row.role}
            </td>
            <td class="px-6 py-4 space-x-4">
                <button className='p-2 rounded-lg border border-black text-black' onClick={() => setUpdateMode(false)}><IoSaveSharp/></button>
            </td>
        </tr>
  )
}

export default TableRow

