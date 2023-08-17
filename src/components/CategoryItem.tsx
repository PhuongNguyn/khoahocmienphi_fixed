import Link from 'next/link';
import React from 'react'
import { FaFolder } from 'react-icons/fa';

type Props = {
    title: string;
    slug: string;
}

function CategoryItem({ slug, title }: Props) {
    return (
        <div className='col col-6 col-sm-6 col-md-4 col-lg-3'>
            <div className='category-item'>
                <Link href={`/${slug}`} className='cus-a'>
                    <FaFolder />
                    <span>{title}</span>
                </Link>

            </div>
        </div>
    )
}

export default CategoryItem