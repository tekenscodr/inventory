import React from 'react'
import InventoryWrapper from '../../components/InventoryWrapper'


export type PageProps = {
    params: { [key: string]: string | string | undefined }
    searchParams: { [key: string]: string | undefined }
}


const Inventory = (props: PageProps) => {

    return (
        <div>
            <InventoryWrapper {...props} />
        </div>
    )
}

export default Inventory

