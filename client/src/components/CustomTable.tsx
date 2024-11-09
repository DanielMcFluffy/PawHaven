import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, TableOptions, useReactTable } from "@tanstack/react-table";
import { User } from "../models/User";
import { Medicine } from "../models/Medicine";
import { Admin } from "../models/Admin";
import { Veterinarian } from "../models/Veterinarian";
import { Case } from "../models/Case";
import { PetOwner } from "../models/PetOwner";
import { Pet } from "../models/Pet";
import { FaArrowUp, FaArrowDown, FaPlus, FaRegMinusSquare, FaEdit, FaFilter } from "react-icons/fa";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Paginator } from "./Paginator";
import React from "react";
import { Dropdown } from "./Dropdown";
import { ReactNode } from "@tanstack/react-router";
import { useTooltip } from "../hooks/useTooltip";

type TableProps<TData> = Pick<TableOptions<TData>, 'data' | 'columns'>

//type guards
const isUser = (entity: unknown): entity is User => (entity as User).user_id !== undefined;
const isAdmin = (entity: unknown): entity is Admin => (entity as Admin).admin_id !== undefined;
const isPetOwner = (entity: unknown): entity is PetOwner => (entity as PetOwner).owner_id !== undefined;
const isPet = (entity: unknown): entity is Pet => (entity as Pet).pet_id !== undefined;
const isVeterinarian = (entity: unknown): entity is Veterinarian => (entity as Veterinarian).vet_id !== undefined;
const isCase = (entity: unknown): entity is Case => (entity as Case).vet_id !== undefined;
// const isMedicine = (entity: unknown): entity is Medicine => (entity as Medicine).medicine_id !== undefined;

export const CustomTable = <
T extends User | Admin | PetOwner | Pet | Veterinarian | Case | Medicine
>({data, columns}: TableProps<T>) => {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  })
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      return;
    }
    return setIsDropdownOpen(false);
  }

  const table = useReactTable({
    data,
    columns,
    //should've just make id property the same name; what a mess
    getRowId: row => 
      isUser(row) ? row.user_id : 
      isAdmin(row) ? row.admin_id : 
      isPetOwner(row) ? row.owner_id :
      isPet(row) ? row.pet_id :
      isVeterinarian(row) ? row.vet_id :
      isCase(row) ? row.case_id :
      row.medicine_id,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      globalFilterFn: 'auto',
      getSortedRowModel: getSortedRowModel(),
      getRowCanExpand: () => true,
      getExpandedRowModel: getExpandedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      state: {
        pagination
      }
  })

  const headers = React.useMemo(() => columns.map(x => x.header), [columns])

  const [currentMobileHeader, setCurrentMobileHeader] = React.useState<typeof headers[number]>(headers[0]);

  const goToNextMobileHeader = () => {
    const currentIndex = headers.indexOf(currentMobileHeader);
    if (currentIndex === headers.length - 1) {
      return setCurrentMobileHeader(headers[0]);
    }
    return setCurrentMobileHeader(headers[currentIndex + 1]);
  }
  const goToPreviousMobileHeader = () => {
    const currentIndex = headers.indexOf(currentMobileHeader);
    if (currentIndex === 0) {
      return setCurrentMobileHeader(headers[headers.length - 1]);
    }
    return setCurrentMobileHeader(headers[currentIndex - 1]);
  }

  const {
    ref: addButtonRef,
    showTooltip: showAddButtonTooltip,
    hideTooltip: hideAddButtonTooltip,
    TooltipElement: addButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Add row');

  const {
    ref: deleteButtonRef,
    showTooltip: showDeleteButtonTooltip,
    hideTooltip: hideDeleteButtonTooltip,
    TooltipElement: deleteButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Delete row');

  const {
    ref: editButtonRef,
    showTooltip: showEditButtonTooltip,
    hideTooltip: hideEditButtonTooltip,
    TooltipElement: editButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Edit row');

  const {
    ref: filterButtonRef,
    showTooltip: showFilterButtonTooltip,
    hideTooltip: hideFilterButtonTooltip,
    TooltipElement: filterButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Filter columns');
  return(<>
  <div
    onClick={toggleDropdown}
    className="inline-flex flex-col w-full sm:w-[unset] gap-4 rounded-2xl px-2 min-h-fit">
    <header 
      className="sticky left-[1.5rem] w-max grid grid-rows-2 sm:grid-rows-1 sm:grid-flow-col items-center gap-y-4 sm:gap-x-10 z-10">
        <input 
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          type="text"
          placeholder='Search ...'
          className='px-4 py-2 rounded-xl shadow-md focus-visible:outline-none'
        />
        <div 
          className="flex gap-4">
          <button
            ref={addButtonRef}
            onMouseEnter={showAddButtonTooltip}
            onMouseLeave={hideAddButtonTooltip}
            className="rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
            <FaPlus />
          </button>
          {addButtonTooltipElement}

          <button
            ref={deleteButtonRef}
            onMouseEnter={showDeleteButtonTooltip}
            onMouseLeave={hideDeleteButtonTooltip}
            className="rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
            <FaRegMinusSquare />
          </button>
          {deleteButtonTooltipElement}

          <button
            ref={editButtonRef}
            onMouseEnter={showEditButtonTooltip}
            onMouseLeave={hideEditButtonTooltip}
            className="rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
            <FaEdit />
          </button>
          {editButtonTooltipElement}
        </div>
        <div
          className="hidden sm:inline-block">
          <button
            ref={filterButtonRef}
            onMouseEnter={showFilterButtonTooltip}
            onMouseLeave={hideFilterButtonTooltip}
            onClick={() => setIsDropdownOpen(x => !x)}
            className="relative rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
              <FaFilter />
            {isDropdownOpen && 
            <Dropdown 
              columns={table.getAllColumns()}/>}
          </button>
          {filterButtonTooltipElement}
        </div>
        </header>
      {
        data.length > 0 ? 
        (<>
      <table
        className="hidden sm:table bg-inherit border-collapse rounded-xl shadow-md">
        <thead 
          className="bg-2 sticky top-[-1rem]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    className="px-3 py-2 cursor-pointer select-none first:rounded-tl-xl last:rounded-tr-xl"
                    onClick={() => header.column.toggleSorting()}
                    key={header.id}>
                      <div
                        className="flex gap-4 justify-center items-center">
                        <div 
                          >
                          {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                          )} 
                        </div> 
                        <div>
                          {
                            header.column.getIsSorted() === 'asc' ? 
                            <FaArrowUp /> : header.column.getIsSorted() === 'desc' ?
                            <FaArrowDown /> : <div className="min-w-[1em]"></div>
                          }
                        </div>
                      </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody 
            className="bg-inherit">
            {table.getFilteredRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td 
                    className="p-2"
                    key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            )) : 
            <tr>
              <td colSpan={table.getCoreRowModel().flatRows.length}>
                <span 
                  className="p-4">The term you've searched doesn't exist!</span>
              </td>
            </tr>
            }
          </tbody>
          <Paginator 
            dataLength={data.length}
            getCanPreviousPage={table.getCanPreviousPage}
            getCanNextPage={table.getCanNextPage}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
            firstPage={table.firstPage}
            lastPage={table.lastPage}
            setPageIndex={table.setPageIndex}
            setPageSize={table.setPageSize}
            pagination={pagination}
            setPagination={setPagination}
            />
      </table>
      {/* // mobile table */}
      <table
        className="sm:hidden bg-slate-100 border-collapse rounded-xl shadow-md">
        <thead 
          className="sticky top-[-1rem] select-none">
            {table.getHeaderGroups().map(headerGroup => (
              <tr
                className="bg-2 rounded-tl-xl rounded-tr-xl flex justify-between px-4"
                key={headerGroup.id}>
                <button
                  onClick={goToPreviousMobileHeader}>
                  <RiArrowLeftWideFill />
                </button>
                {headerGroup.headers.map(header => (
                  header.column.columnDef.header === currentMobileHeader ?
                  <th
                    className="px-3 py-2 cursor-pointer select-none first:rounded-tl-xl last:rounded-tr-xl"
                    onClick={() => header.column.toggleSorting()}
                    key={header.id}>
                      <div
                        className="flex gap-4 justify-center items-center">
                        <div 
                          >
                          {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                          )} 
                        </div> 
                        <div>
                          {
                            header.column.getIsSorted() === 'asc' ? 
                            <FaArrowUp /> : header.column.getIsSorted() === 'desc' ?
                            <FaArrowDown /> : <div className="min-w-[1em]"></div>
                          }
                        </div>
                      </div>
                  </th> : undefined
                ))}
                <button
                  onClick={goToNextMobileHeader}>
                  <RiArrowRightWideFill />
                </button>
              </tr>
            ))}
          </thead>
          <tbody 
            >
            {table.getFilteredRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
              <tr 
                key={row.id}>
                {row.getVisibleCells().map(cell => (
                  cell.column.columnDef.header === currentMobileHeader ? 
                  <td 
                    key={cell.id}>
                      <div
                        onClick={() => row.toggleExpanded()}
                        className="flex justify-between gap-4 p-2 hover:bg-slate-300">
                        <div>
                          {
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          }
                        </div>
                        <button>
                          {
                            row.getIsExpanded() ?
                            <IoMdArrowDropup /> :
                            <IoMdArrowDropdown />
                          }
                        </button>
                      </div>
                      {
                        row.getIsExpanded() &&
                        <td
                          colSpan={row.getAllCells().length}
                          className="flex flex-col overflow-auto items-center gap-2 p-4 bg-slate-200">
                            <div
                              className="font-bold text-sm">
                              {row.getVisibleCells()[0].renderValue() as ReactNode}
                            </div>
                            <div
                              className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs">
                                {
                                  row.getVisibleCells().map(x => (
                                    <div
                                      className="flex flex-col gap-1">
                                      <div
                                        className="font-bold">
                                        {x.column.columnDef.header as ReactNode}:
                                      </div>
                                      
                                      <div>
                                        {x.renderValue() as ReactNode}
                                      </div>
                                    </div>
                                  ))
                                }
                            </div>
                        </td>
                      }
                  </td> : undefined
                  ))}
              </tr>
            )) : 
            <tr>
              <td colSpan={table.getCoreRowModel().flatRows.length}>
                <span 
                  className="p-4">The term you've searched doesn't exist!</span>
              </td>
            </tr>
            }
          </tbody>
          <Paginator 
            dataLength={data.length}
            getCanPreviousPage={table.getCanPreviousPage}
            getCanNextPage={table.getCanNextPage}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
            firstPage={table.firstPage}
            lastPage={table.lastPage}
            setPageIndex={table.setPageIndex}
            setPageSize={table.setPageSize}
            pagination={pagination}
            setPagination={setPagination}
            />
      </table>
  </>) :
    table.getRowModel().flatRows.length === 0 ?
    <span>Loading ...</span> : ''
      }
  </div>
  </>)
}