import { Updater } from "@tanstack/react-table";
import React from "react";
import { IconType } from "react-icons";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";

export type PaginatorProps = {
    dataLength: number;
    getCanPreviousPage: () => boolean;
    getCanNextPage: () => boolean;
    previousPage: () => void;
    nextPage: () => void;
    firstPage: () => void;
    lastPage: () => void;
    setPageIndex: (updater: Updater<number>) => void;
    pageSize: number;
    setPageSize: (updater: Updater<number>) => void;
}

export const Paginator = ({
    dataLength,
    getCanPreviousPage,
    getCanNextPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
    setPageIndex,
    pageSize,
    setPageSize
}: PaginatorProps) => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const roundedPageCount = React.useMemo(() => Math.ceil(dataLength / pageSize), [dataLength, pageSize])
    const pageInputRef = React.useRef<HTMLInputElement>(null);

    const goToNextPage = () => {
        if (!getCanNextPage()) {return;}
        nextPage();
        setCurrentPage(currentPage + 1);
    }
    const goToPreviousPage = () => {
        if (!getCanPreviousPage()) {return;}
        previousPage();
        setCurrentPage(currentPage - 1);
    }
    const goToFirstPage = () => {
        if (!getCanPreviousPage()) {return;}
        firstPage();
        setCurrentPage(1);
    }
    const goToLastPage = () => {
        if (!getCanNextPage()) {return;}
        lastPage();
        setCurrentPage(roundedPageCount);
    }

    const pageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    
        const inputValue = e.target.value;
        if (!inputValue) {
            setCurrentPage(1);
            return setPageIndex(1);
        }
    
        const pageNumber = parseInt(inputValue);
        if (isNaN(pageNumber) || pageNumber < 1) {
            setCurrentPage(1);
            return setPageIndex(1);
        } else if (pageNumber >= roundedPageCount) {
            setCurrentPage(roundedPageCount);
            return setPageIndex(roundedPageCount - 1);
        }
    
        setCurrentPage(pageNumber);
        setPageIndex(pageNumber);
    };
    return(
        <>  
        <div
            className="sticky left-[1.5rem] flex gap-4 items-center">
            <div 
                className="py-4 flex">
                <PaginatorButton 
                    disabled={!getCanPreviousPage()}
                    icon={FaAngleDoubleLeft}
                    callback={goToFirstPage}/>
                <PaginatorButton 
                    disabled={!getCanPreviousPage()}
                    icon={FaAngleLeft}
                    callback={goToPreviousPage}/>
                <PaginatorButton 
                    disabled={!getCanNextPage()}
                    icon={FaAngleRight}
                    callback={goToNextPage}/>
                <PaginatorButton 
                    disabled={!getCanNextPage()}
                    icon={FaAngleDoubleRight}
                    callback={goToLastPage}/>
            </div>
            <div
                className="flex flex-col gap-2 w-max items-center">
                <div
                    className="">
                    <label htmlFor="pageIndex">Page: </label>
                    <input
                        name="pageIndex"
                        id="pageIndex"
                        className="input w-14 shadow-md text-center" 
                        type="text"
                        ref={pageInputRef}
                        onFocus={() => pageInputRef.current?.select()}
                        onClick={() => pageInputRef.current?.select()}
                        value={currentPage}
                        onChange={pageChange}/>
                </div>
                <div
                    className="text-nowrap text-center w-full">
                    {`${currentPage} out of ${roundedPageCount}`}
                </div>
            </div>
        </div>
    </>
    )
}

type PaginatorButtonProps = {
    icon?: IconType;
    label?: number;
    callback?: () => void;
    updaterNumber?: number;
    updater?: (updater: Updater<number>) => void;
    disabled?: boolean;
}
const PaginatorButton = ({icon, label, callback, updaterNumber, updater, disabled = false}: PaginatorButtonProps) => {

    const handleClick = () => {
        if (callback) {
            callback();
        } else if (updater && updaterNumber !== undefined) {
            updater(updaterNumber);
        }
    };
    return(
        <>
            <button
                disabled={disabled}
                className="bg-slate-50 p-4 solid outline outline-blue-500"
                onClick={handleClick}>
                {label ? label : React.createElement(icon!)}
            </button>
        </>
    )
}