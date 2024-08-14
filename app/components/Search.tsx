'use client'
import { SearchIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Search = ({ placeholder }: { placeholder: string }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className='relative flex flex-1 flex-shrink-0 mr-2'>
            <label htmlFor="search" className='sr-only'>
                Search
            </label>
            <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm'
                placeholder={placeholder}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get('query')?.toString()}
            />
            <SearchIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2' />
        </div>
    )
}

export default Search
