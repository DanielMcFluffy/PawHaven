import { createFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { BaseResponse } from '../../../models/Response';
import { CustomTable } from '../../../components/CustomTable';
import { Medicine } from '../../../models/Medicine';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/medicines')({
  component: Medicines,
})

function Medicines() {

  const {AxiosGET} = useAxios();
  const [data, setData] = React.useState<Medicine[]>([]);

  React.useEffect(() => {

    const getData = async() => {
      const response = await AxiosGET('/medicines/')
      setData((response as BaseResponse<Medicine[]>).result);
      
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<Medicine, any>[] = React.useMemo(() => ([
    {
      header: 'Name',
      accessorFn: (row) => row.medicine.name,
      id: 'name'
    },
    {
      header: 'Type',
      accessorFn: (row) => row.medicine.type,
      id: 'type',
    },
    {
      header: 'Pronounciation',
      accessorFn: (row) => row.medicine.pronounciation,
      id: 'pronounciation',
    },
    {
      header: 'ID',
      accessorKey: 'medicine_id',
    },
  ]), []);


  return (
    <>
      <div className='flex flex-col gap-6 overflow-auto sm:overflow-visible'>
        <header className='inline-flex w-max justify-start sticky left-[1.5rem]'>
          A header
        </header>
        <section 
          >
          <CustomTable 
            columns={columns}
            data={data}/>
        </section>
      </div>
    </>
  );
}