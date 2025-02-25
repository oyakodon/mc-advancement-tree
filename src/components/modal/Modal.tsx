const Modal = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='relative z-10' role='dialog'>
      <div className='fixed inset-0 bg-gray-700 opacity-50 transition-opacity'></div>

      {children && (
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center sm:p-0'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
              <div className='bg-white p-6'>{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
