import { createFileRoute } from '@tanstack/react-router'
import { Table } from '../../../components/Table';

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/medicines')({
  component: Medicines,
})

function Medicines() {


  return(
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
          <Table />
        </section>
      </div>
    </>
  )
}