import { PaginationState, Updater } from "@tanstack/react-table";
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
    setPageSize: (updater: Updater<number>) => void;
    pagination: PaginationState;
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
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
    setPageSize,
    pagination,
    setPagination
}: PaginatorProps) => {
    const roundedPageCount = React.useMemo(() => Math.ceil(dataLength / pagination.pageSize), [dataLength, pagination.pageSize])
    const pageInputRef = React.useRef<HTMLInputElement>(null);

    const goToNextPage = () => {
        if (!getCanNextPage()) {return;}
        nextPage();
        setPagination(x => ({
            ...x,
            pageIndex: x.pageIndex + 1
        }));
    }
    const goToPreviousPage = () => {
        if (!getCanPreviousPage()) {return;}
        previousPage();
        setPagination(x => ({
            ...x,
            pageIndex: x.pageIndex - 1
        }));
    }
    const goToFirstPage = () => {
        if (!getCanPreviousPage()) {return;}
        firstPage();
        setPagination(x => ({
            ...x,
            pageIndex: 0
        }));
    }
    const goToLastPage = () => {
        if (!getCanNextPage()) {return;}
        lastPage();
        setPagination(x => ({
            ...x,
            pageIndex: roundedPageCount - 1
        }));
    }

    const pageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    
        const inputValue = e.target.value;
        if (!inputValue) {
            setPagination(x => ({
                ...x,
                pageIndex: 0
            }));
            return setPageIndex(1);
        }
    
        const pageNumber = parseInt(inputValue);
        if (isNaN(pageNumber) || pageNumber < 1) {
            setPagination(x => ({
                ...x,
                pageIndex: 0
            }));
            return setPageIndex(1);
        } else if (pageNumber >= roundedPageCount) {
            setPagination(x => ({
                ...x,
                pageIndex: roundedPageCount - 1
            }));
            return setPageIndex(roundedPageCount - 1);
        }
    
            setPagination(x => ({
                ...x,
                pageIndex: pageNumber - 1
            }));
        setPageIndex(pageNumber);
    };

    const pageSizechange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const pageSize = parseInt(e.target.value);

        setPageSize(pageSize);
        setPagination(() => ({
            pageIndex: 0,
            pageSize
        }))
    }
    return(
        <>  
        <div
            className="sticky left-[1rem] flex gap-4 items-center text-xs">
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
                        value={pagination.pageIndex + 1}
                        onChange={pageChange}/>
                </div>
                <div
                    className="text-nowrap text-center w-full">
                    {`${pagination.pageIndex + 1} out of ${roundedPageCount}`}
                </div>
            </div>
            <div
                className="flex flex-col gap-2">
            <label htmlFor="pageSize"
                className="text-nowrap">Page Size:</label>
                <select 
                    name="pageSize" 
                    id="pageSize"
                    onChange={pageSizechange}
                    className="w-full input text-wrap">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
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