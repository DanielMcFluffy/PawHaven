import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, PaginationState, TableOptions, useReactTable, VisibilityState } from "@tanstack/react-table";
import { User } from "../models/User";
import { Medicine } from "../models/Medicine";
import { Admin } from "../models/Admin";
import { Veterinarian } from "../models/Veterinarian";
import { Case } from "../models/Case";
import { PetOwner } from "../models/PetOwner";
import { Pet } from "../models/Pet";
import { FaArrowUp, FaArrowDown, FaPlus, FaRegMinusSquare, FaEdit, FaFilter, FaThList } from "react-icons/fa";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Paginator } from "./Paginator";
import React from "react";
import { Dropdown } from "./Dropdown";
import { ReactNode } from "@tanstack/react-router";
import { useTooltip } from "../hooks/useTooltip";

type TableProps<TData> = Pick<TableOptions<TData>, 'data' | 'columns'> & 
{
  initialColumns: Record<string, boolean>
}

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
>({data, columns, initialColumns}: TableProps<T>) => {
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
    renderFallbackValue: 'N/A',
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: 'auto',
    getSortedRowModel: getSortedRowModel(),
    getRowCanExpand: () => true,
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination
    },
    initialState: {
      columnVisibility: initialColumns ? initialColumns as VisibilityState : undefined
    }
  })

  const headers = React.useMemo(() => columns.map(x => x.header), [columns])

  const [currentMobileHeader, setCurrentMobileHeader] = React.useState<typeof headers[number]>(headers[1]);
  const [isMobileSelectModeOn, setIsMobileSelectModeOn] = React.useState(false);

  const goToNextMobileHeader = () => {
    const currentIndex = headers.indexOf(currentMobileHeader);
    if (currentIndex === headers.length - 1) {
      return setCurrentMobileHeader(headers[1]);
    }
    return setCurrentMobileHeader(headers[currentIndex + 1]);
  }
  const goToPreviousMobileHeader = () => {
    const currentIndex = headers.indexOf(currentMobileHeader);
    if (currentIndex === 1) {
      return setCurrentMobileHeader(headers[headers.length - 1]);
    }
    return setCurrentMobileHeader(headers[currentIndex - 1]);
  }

  const {
    ref: addButtonRef,
    showTooltip: showAddButtonTooltip,
    hideTooltip: hideAddButtonTooltip,
    TooltipElement: AddButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Add row');

  const {
    ref: deleteButtonRef,
    showTooltip: showDeleteButtonTooltip,
    hideTooltip: hideDeleteButtonTooltip,
    TooltipElement: DeleteButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Delete row');

  const {
    ref: editButtonRef,
    showTooltip: showEditButtonTooltip,
    hideTooltip: hideEditButtonTooltip,
    TooltipElement: EditButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Edit row');

  const {
    ref: filterButtonRef,
    showTooltip: showFilterButtonTooltip,
    hideTooltip: hideFilterButtonTooltip,
    TooltipElement: FilterButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Filter columns');

  const {
    ref: selectButtonRef,
    showTooltip: showSelectButtonTooltip,
    hideTooltip: hideSelectButtonTooltip,
    TooltipElement: SelectButtonTooltipElement
  } = useTooltip<HTMLButtonElement>('Select');
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
          {AddButtonTooltipElement}

          <button
            ref={deleteButtonRef}
            onMouseEnter={showDeleteButtonTooltip}
            onMouseLeave={hideDeleteButtonTooltip}
            className="rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
            <FaRegMinusSquare />
          </button>
          {DeleteButtonTooltipElement}

          <button
            ref={editButtonRef}
            onMouseEnter={showEditButtonTooltip}
            onMouseLeave={hideEditButtonTooltip}
            className="rounded-md bg-white shadow-md px-4 py-2 hover:bg-slate-100">
            <FaEdit />
          </button>
          {EditButtonTooltipElement}

          <button
            onClick={() => setIsMobileSelectModeOn(x => !x)}
            ref={selectButtonRef}
            onMouseEnter={showSelectButtonTooltip}
            onMouseLeave={hideSelectButtonTooltip}
            className={`sm:hidden rounded-md shadow-md px-4 py-2 hover:bg-slate-100 ${isMobileSelectModeOn ? 'bg-slate-200' : 'bg-white'}`}>
            <FaThList />
          </button>
          {SelectButtonTooltipElement}
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
            // slice starts at index 1 to not consider the select column
              columns={table.getAllColumns().slice(1)}/>} 
          </button>
          {FilterButtonTooltipElement}
        </div>
        </header>
      {
        data.length > 0 ? 
        (<>
      <table
        className="hidden sm:table bg-inherit border-collapse rounded-xl shadow-md">
        <thead 
          className="sticky top-[-1rem]">
            {table.getHeaderGroups().map(headerGroup => (
              <tr 
                key={headerGroup.id}>
                {headerGroup.headers.map(header => ( 
                  header.id !== 'select' ?
                  (<th
                    className="bg-2 px-3 py-2 select-none text-nowrap first:rounded-tl-xl last:rounded-tr-xl first:flex"
                    key={header.id}>
                        {
                          table
                            .getAllLeafColumns()
                            .indexOf(header.column)
                          === 1 ?
                          flexRender(
                            table.getFlatHeaders()[0].column.columnDef.header,
                            header.getContext()
                          ) :
                          undefined
                        }
                      <div
                        onClick={() => header.column.toggleSorting()}
                        className="flex gap-4 justify-center items-center cursor-pointer">
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
                  </th>) :
                  null
                 ))}
              </tr>
            ))}
          </thead>
          <tbody 
            className="bg-inherit">
            {table.getFilteredRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
              <tr
                onClick={() => row.toggleSelected()}
                className={row.getIsSelected() ? 'bg-slate-200' : ''}
                key={row.id}>
                {row.getVisibleCells().map(cell => (
                  cell.column.id !== 'select' ?
                  <td 
                    className="p-2 align-baseline"
                    key={cell.id}>
                        {
                          table
                            .getAllLeafColumns()
                            .indexOf(cell.column)
                          === 1 ?
                          flexRender(
                            table.getAllLeafColumns()[0].columnDef.cell,
                            cell.getContext()
                          ) :
                          undefined
                        }
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        }
                  </td> :
                  null
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
                    className="flex px-3 py-2 cursor-pointer select-none first:rounded-tl-xl last:rounded-tr-xl"
                    key={header.id}>
                        { isMobileSelectModeOn &&
                          flexRender(
                            table.getFlatHeaders()[0].column.columnDef.header,
                            header.getContext()
                          )
                        }
                      <div
                        onClick={() => header.column.toggleSorting()}
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
                        className="flex justify-between gap-4 p-2 hover:bg-slate-300">
                        <div>
                        { isMobileSelectModeOn &&
                          flexRender(
                            table.getAllLeafColumns()[0].columnDef.cell,
                            cell.getContext()
                          )
                        }
                          {
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          }
                        </div>
                        <button
                          onClick={() => row.toggleExpanded()}>
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
                                    x.column.columnDef.id !== 'select' ?
                                    <div
                                      className="flex flex-col gap-1">
                                      <div
                                        className="font-bold">
                                        {x.column.columnDef.header as ReactNode}:
                                      </div>
                                      
                                      <div>
                                        {x.renderValue() as ReactNode}
                                      </div>
                                    </div> : null
                                  ))
                                }
                            </div>                            
                        </td>
                      }
                  </td> : null
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