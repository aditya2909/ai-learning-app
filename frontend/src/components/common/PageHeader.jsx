import React from 'react'

const PageHeader = ({title, subTitle, children}) => {
  return (
    <div className='flex items-center justify-between mb-6'>
        <div>
            <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>
                {title}
            </h1>
            {subTitle && (
                <p className='text-slate-500 text-sm'>
                    {subTitle}
                </p>
            )}
        </div>
        {children && <div>{children}</div>}
    </div>
  )
}

export default PageHeader