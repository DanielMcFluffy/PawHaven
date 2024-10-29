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
    // const numberedButtons = React.useMemo(() => {
    //     if (pageSize <= 0 || dataLength <= 0) return [];

    //     const roundedPageCount = Math.ceil(dataLength / pageSize);
    //     return pageArray(roundedPageCount);
    // }, [dataLength, pageSize]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const roundedPageCount = React.useMemo(() => Math.ceil(dataLength / pageSize), [dataLength, pageSize])

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
    return(
        <>
            <div 
                className="sticky left-[1.5rem] py-4 flex">
                <PaginatorButton 
                    disabled={!getCanPreviousPage()}
                    icon={FaAngleDoubleLeft}
                    callback={goToFirstPage}/>
                <PaginatorButton 
                    disabled={!getCanPreviousPage()}
                    icon={FaAngleLeft}
                    callback={goToPreviousPage}/>
                {/* {
                    numberedButtons.map((x, i) => 
                    <PaginatorButton 
                        key={i}
                        label={x}
                        updaterNumber={i}
                        updater={setPageIndex}
                        />)
                } */}
                {
                    `Page ${currentPage} out of ${roundedPageCount}`
                }
                <PaginatorButton 
                    disabled={!getCanNextPage()}
                    icon={FaAngleRight}
                    callback={goToNextPage}/>
                <PaginatorButton 
                    disabled={!getCanNextPage()}
                    icon={FaAngleDoubleRight}
                    callback={goToLastPage}/>
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