import { flexRender, getCoreRowModel, TableOptions, useReactTable } from "@tanstack/react-table";
import { User } from "../models/User";
import { Medicine } from "../models/Medicine";
import { Admin } from "../models/Admin";
import { Veterinarian } from "../models/Veterinarian";
import { Case } from "../models/Case";
import { PetOwner } from "../models/PetOwner";
import { Pet } from "../models/Pet";


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
    getCoreRowModel: getCoreRowModel()
  })

  return(<>
    <table>
    <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={() => console.log(row.id)}>
              {row.getVisibleCells().map(cell => (
                <td 
                  key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
    </table>
  </>)
}