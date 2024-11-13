import { createFileRoute } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { useAxios } from '../../../hooks/useAxios';
import { BaseResponse } from '../../../models/Response';
import { CustomTable } from '../../../components/CustomTable';
import { Medicine } from '../../../models/Medicine';
import { IndeterminateCheckbox } from '../../../components/IndeterminateCheckbox';

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
      id: 'select',
      header: (context) => {
        const table = context?.table;
        return table ? (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ) : null;
      },
      cell: ({ row }) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
      ),
    },
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
    // TODO: Clean up this data
    //
    // {
    //   header: 'Adverse Effects',
    //   accessorKey: 'Adverse Effects',
    //   id: 'Adverse Effects',
    // },
    // {
    //   header: 'Contraindications/Precautions/Warnings',
    //   accessorKey: 'Contraindications/Precautions/Warnings',
    //   id: 'Contraindications/Precautions/Warnings',
    // },
    // {
    //   header: 'Overdosage/Acute Toxicity',
    //   accessorKey: 'Overdosage/Acute Toxicity',
    //   id: 'Contraindications/Precautions/Warnings',
    // },
    // {
    //   header: 'Pharmacokinetics',
    //   accessorKey: 'Pharmacokinetics',
    //   id: 'Pharmacokinetics',
    // },
    {
      header: 'ID',
      accessorKey: 'medicine_id',
      id: 'medicine_id',
    },
    {
      header: 'Updated At',
      accessorKey: 'updated_at',
      id: 'updated_at',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
      id: 'created_at',
    },
  ]), []);

  const initialColumns = React.useMemo(() => ( 
    {
      'medicine_id': false,
      'created_at': false,
      'updated_at': false,
    }
   ), [])
  return (
    <>
      <div className='flex flex-col gap-6'>
        <header className='inline-flex w-max justify-start sticky left-[1.5rem]'>
          A header
        </header>
        <section 
          >
          <CustomTable 
            columns={columns}
            initialColumns={initialColumns}
            data={data}/>
        </section>
      </div>
    </>
  );
}