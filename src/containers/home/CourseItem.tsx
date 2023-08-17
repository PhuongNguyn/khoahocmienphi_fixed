import { CATE_ICON } from '@/util';
import Link from 'next/link';
import React from 'react'

type Props = {
    item: any;
}

function CourseItem({ item }: Props) {
    return (
        <Link href={`/${item.path}`} className={`cus-a course-item ${item?.class}`}>
            <div className='title'>
                {item?.name}
            </div>
            <div className='img'>
                <img className='cate-icon' src={CATE_ICON} alt={item?.name} />
            </div>

        </Link>
    )
}

export default CourseItem