import React, { useState } from 'react';
const styles = require('./Paginator.module.css');

type propsType = {
    totalItemsCount:number,
    pageSize:number,
    currentPage:number, 
    onPageChanged:(p:number)=>void,
    portiozSize?:number,
}
const Paginator:React.FC<propsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portiozSize=10})=>{
    let pagesCount = Math.ceil (totalItemsCount /pageSize);

    let pages: Array<number> = [];
    for (let i=1; i <= pagesCount; i++) {
        pages.push(i);
    }

   let portionCount = Math.ceil(pagesCount/portiozSize); //кол-во порций = кол-во страниц / размер порции
   let [portionNumber, setPortionNumber] = useState<number>(1); //устанавливаем номер порции 1

   let portionRigthBorder = portionNumber*portiozSize; 
   let portionLeftBorder = (portionNumber-1)*portiozSize+1;


return (
    <div className = {styles.paginator}>
        {portionNumber>1&&
        <button onClick={()=>{setPortionNumber(portionNumber-1)}}>prev</button>}
            {pages.filter(p=>(p>=portionLeftBorder&&p<=portionRigthBorder))
            .map(p => { 
                return <span key={p}className={currentPage === p ? styles.selectedPage:styles.pageNumber}
                             onClick={(e) => {
                                 onPageChanged(p);
                             }}>{p}</span>
            })}
            {portionNumber<portionCount&&
        <button onClick={()=>{setPortionNumber(portionNumber+1)}}>next</button>}
        </div>
)
}

export default Paginator;




   