import React from 'react'
import SalesWrapper from '../../components/SalesWrapper'
import BarCharts from '@/app/components/BarChart'

export type PageProps = {
    params: { [key: string]: string | undefined }
    searchParams: { [key: string]: string | undefined }
}

const Sales = (props: PageProps) => {
    return (
        <div className='flex p-4 min-h-full w-full overflow-hidden'>
            <div className='mr-4 flex-1 h-full w-1/2'>
                <BarCharts />
            </div>
            <div className='flex-1 h-full w-1/2'>
                <SalesWrapper {...props} />
            </div>
        </div>
    )
}

export default Sales
