import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, TableOptions, useReactTable } from "@tanstack/react-table";
import { User } from "../models/User";
import { Medicine } from "../models/Medicine";
import { Admin } from "../models/Admin";
import { Veterinarian } from "../models/Veterinarian";
import { Case } from "../models/Case";
import { PetOwner } from "../models/PetOwner";
import { Pet } from "../models/Pet";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Paginator } from "./Paginator";

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

  const pagination = {
    pageIndex: 0,
    pageSize: 20,
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
      getPaginationRowModel: getPaginationRowModel(),
      initialState: {
        pagination
      }
  })

  return(<>
  <div 
    className="inline-flex flex-col gap-4 rounded-2xl px-2 min-h-fit">
    <header 
      className="sticky left-[1.5rem] w-max grid grid-rows-2 sm:grid-rows-1 sm:grid-flow-col items-center gap-y-4 sm:gap-x-10">
        <input 
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          type="text"
          placeholder='Search ...'
          className='px-4 py-2 rounded-xl shadow-md focus-visible:outline-none'
        />
        <div 
          className="flex gap-4">
          <button>Add</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div>
          <button>
            More
          </button>
        </div>
    </header>
      {
        data.length > 0 ? <table
      className="border-collapse rounded-xl shadow-md">
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
          className="bg-slate-50 sm:bg-inherit">
          {table.getFilteredRowModel().rows.length > 0 ? table.getRowModel().rows.map(row => (
            <tr key={row.id}
              className="">
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
          pageSize={pagination.pageSize}
          setPageSize={table.setPageSize}
          />
    </table> :
    table.getRowModel().flatRows.length === 0 ?
    <span>Loading ...</span> : ''
      }
  </div>
  </>)
}