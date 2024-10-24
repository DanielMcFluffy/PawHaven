import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, TableOptions, useReactTable } from "@tanstack/react-table";
import { User } from "../models/User";
import { Medicine } from "../models/Medicine";
import { Admin } from "../models/Admin";
import { Veterinarian } from "../models/Veterinarian";
import { Case } from "../models/Case";
import { PetOwner } from "../models/PetOwner";
import { Pet } from "../models/Pet";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

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
  })

  return(<>
  <div 
    className="inline-flex flex-col gap-4 rounded-2xl p-4">
    <header 
      className="sticky left-[1.5rem] w-max">
        <input 
          onChange={e => table.setGlobalFilter(String(e.target.value))}
          type="text"
          placeholder='Search ...'
          className='px-4 py-2 rounded-xl shadow-md focus-visible:outline-none'
        />
    </header>
    {data.length > 0 ? <table
      className="border-collapse overflow-hidden rounded-xl shadow-md">
      <thead 
        className="bg-2">
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  className="px-3 py-2 cursor-pointer select-none"
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
    </table> :
    table.getRowModel().flatRows.length === 0 ?
    <span>Loading ...</span> : ''
    }
  </div>
  </>)
}