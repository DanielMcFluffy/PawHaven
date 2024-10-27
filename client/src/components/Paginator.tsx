import { Updater } from "@tanstack/react-table";
import React from "react";
import { IconType } from "react-icons";
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { log, pageArray } from "../utils";

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
    const numberedButtons = React.useMemo(() => {
        if (pageSize <= 0 || dataLength <= 0) return [];

        const roundedPageCount = Math.ceil(dataLength / pageSize);
        return pageArray(roundedPageCount);
    }, [dataLength, pageSize]);
    log(setPageIndex);
    return(
        <>
            <div 
                className="sticky left-[1.5rem] py-4 flex">
               {dataLength}
                <PaginatorButton 
                    icon={FaAngleDoubleLeft}
                    callback={firstPage}/>
                <PaginatorButton 
                    disabled={!getCanPreviousPage()}
                    icon={FaAngleLeft}
                    callback={previousPage}/>
                {
                    numberedButtons.map((x, i) => 
                    <PaginatorButton 
                        key={i}
                        label={x}
                        />)
                }
                <PaginatorButton 
                    disabled={!getCanNextPage()}
                    icon={FaAngleRight}
                    callback={nextPage}/>
                <PaginatorButton 
                    icon={FaAngleDoubleRight}
                    callback={lastPage}/>
            </div>
        </>
    )
}

type PaginatorButtonProps = {
    icon?: IconType;
    label?: number;
    callback?: () => void;
    disabled?: boolean;
}
const PaginatorButton = ({icon, label, callback, disabled = false}: PaginatorButtonProps) => {
    return(
        <>
            <button
                disabled={disabled}
                className="bg-slate-50 p-2 solid outline outline-blue-500"
                onClick={callback}>
                {label ? label : React.createElement(icon!)}
            </button>
        </>
    )
}