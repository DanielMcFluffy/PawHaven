import { createFileRoute } from '@tanstack/react-router'
import { User } from '../../../models/User';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { BaseResponse } from '../../../models/Response';
import { CustomTable } from '../../../components/CustomTable';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/medicines')({
  component: Medicines,
})

function Medicines() {

  const {AxiosGET} = useAxios();
  const [data, setData] = React.useState<User[]>([]);

  React.useEffect(() => {

    const getData = async() => {
      const response = await AxiosGET('/users/');
      setData((response as BaseResponse<User[]>).result)
    }
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<User, any>[] = React.useMemo(() => ([
    {
      header: 'Username',
      accessorKey: 'username'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    }
  ]), []);


  return (
    <>
      <div className='flex flex-col gap-6'>
        <header className='flex justify-start'>
          <input 
            type="text"
            placeholder='Search ...'
            className='px-4 py-2 rounded-xl shadow-md focus-visible:outline-none'
          />
        </header>
        <section>
          <CustomTable 
            columns={columns}
            data={data}/>
        </section>
      </div>
    </>
  );
}