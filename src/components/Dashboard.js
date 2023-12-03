import React from 'react'
import TableRow from './TableRow'
import { useState, useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Pagination from './Pagination';

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [searchText, setSearchText] = useState("");
    const [pageNo,setPageNo]=useState(1);
    const [paginate,setPaginated]=useState([]);
    const [renderData,setrenderData]=useState([]);
    const [currPage,setCurrPage]=useState(1);
    const [selectedData,setSelectedData] = useState([]);
    const [allSelected,setallSelected] = useState(false);

    const handlePagintion=(page)=>{
         let sidx=(page-1)*10;
         let eidx=sidx+10;

         let newdata=data.slice(sidx,eidx);
         setPaginated(newdata);
    }

    useEffect(()=>{
        setrenderData(paginate);
    },[paginate])

   

    const deleteSelectedRow = () => {
        let newData = [...data]
        let newDataUpdated = newData.filter((dat) => !selectedData.includes(dat.id));
        console.log(newDataUpdated)
        let nPageCount=Math.ceil(newDataUpdated.length/10);
        setPageNo(nPageCount);
        if(currPage>nPageCount){
            setCurrPage(currPage-1);
            handlePagintion(currPage-1);
        }else{
            handlePagintion(currPage);
        }
        setData(newDataUpdated);
        setSelectedData([]);
    }
    const filterLogic=(searchText)=>{
        let filteredArray=[];
        for(let i=0;i<data.length;i++){
           let upperSearchText=searchText.toUpperCase();
           let name=data[i].name;
           let upperText=name.toUpperCase();
           let ans=upperText.includes(upperSearchText);
           if(ans){
            filteredArray.push(data[i]);
           }
        }
        return filteredArray;
    }
    const handleSearchText=(e)=>{
        let text=e.target.value;
        setSearchText(text);
        const newFilterdArray=filterLogic(text);
        if(newFilterdArray.length==0){
             setPageNo(Math.ceil(data.length/10));
             setCurrPage(1);
              handlePagintion(1);
             setPaginated(newFilterdArray);
        }else{
            setPageNo(Math.ceil(newFilterdArray.length/10));
            setCurrPage(1);
             setPaginated(newFilterdArray);
        }
    }

    const handleAllSelected = () => {
        if(!allSelected) {
            let newSelectedData = [];
            for(let i=0;i<data.length;i++) {
                newSelectedData.push(data[i].id);
            }
            setSelectedData(newSelectedData);
            setallSelected(true);
            console.log(selectedData);

        } else {

        }
    }
    
    useEffect(() => {
        (
            async function loadData() {
                setLoading(true);
                try {
                    let res = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
                    console.log(res);
                    if (res) {
                        if (res.status === 200) {
                            setLoading(false);
                            setData(res.data);
                            setPageNo(Math.ceil(res.data.length/10));
                            setPaginated(res.data.slice(0,10));
                        } else {
                            setLoading(false);
                            setError("There is Some Error");
                        }
                    }
                } catch (err) {
                    setError(err.message);
                    setLoading(false);
                }
            }
        )();
    }, []);

    
    const componentsArray = Array.from({ length: pageNo }, (_, index) => index);
    return (
        loading ? <div>Loading...</div> : error ? <div>{error}</div> : <div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-4 space-y-4">
                <div className='w-full flex justify-between items-center'>
                    <input type="text" className='w-[300px] p-2 rounded-lg border border-gray-500' placeholder='Search' value={searchText} onChange={handleSearchText} />
                    <button className='p-2 rounded-lg border border-red-800 text-red-800' onClick={deleteSelectedRow}><MdDelete /></button>
                </div>
                <table class="border border-black p-2 rounded-lg w-full text-sm text-left h-[800px] rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs border-b border-black text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <input type='checkbox' checked={allSelected} onClick={handleAllSelected}/>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderData.map((row) => {
                                return <TableRow selectedData={selectedData} setSelectedData={setSelectedData} data={data} setData={setData} row={row} key={row.id} setPageNo={setPageNo} currPage={currPage} setCurrPage={setCurrPage} handlePagintion={handlePagintion} />
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div class="flex justify-end p-2">


                <nav aria-label="Page navigation example">
                    <ul class="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Previous</span>
                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </a>
                        </li>
                             {
                                componentsArray.map((item,index)=>{
                                    return <Pagination index={index} setCurrPage={setCurrPage} handlePagintion={handlePagintion} />
                                })
                              }
                             
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>


            </div>

        </div>
    )
}

export default Dashboard

