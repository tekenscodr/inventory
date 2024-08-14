import ProductTable from '@/app/components/ProductTable'
import ProductWrapper from '@/app/components/ProductWrapper'
import React from 'react'

export type PageProps = {
    params: { [key: string]: string | undefined }
    searchParams: { [key: string]: string | undefined }
}

const Product = (props: PageProps) => {
    return (
        <div>
            <ProductWrapper {...props} />
        </div>
    )
}

export default Product
