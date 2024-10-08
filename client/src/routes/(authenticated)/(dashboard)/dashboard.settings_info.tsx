import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings_info')({
  component: () =>       <div className='flex flex-col gap-6'>
  <h2
    className='font-bold text-center'>About PawHaven</h2>
  <p>PawHaven is a comprehensive platform designed to connect pet owners with the best pet care services. Whether you need a vet, a groomer, or a pet sitter, PawHaven has got you covered.</p>
  <ul>
    <li>Find trusted pet care professionals</li>
    <li>Book appointments easily</li>
    <li>Access pet care tips and resources</li>
  </ul>
</div>
})