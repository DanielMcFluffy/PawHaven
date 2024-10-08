import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(dashboard)/dashboard/settings_privacy')({
  component: () => <div className='flex flex-col gap-6'>
  <h2 
    className='text-center font-bold'>Privacy Policy</h2>
  <p>At PawHaven, we are committed to protecting your privacy. We collect and store your personal information only for the purpose of providing you with
    the best pet care services. We do not share your information with third parties without your consent. We use industry-standard security measures to protect your data.
  </p>
</div>
})