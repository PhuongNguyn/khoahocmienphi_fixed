import React from 'react'
import CategoryItem from './CategoryItem';

type Props = {
    data?: any[];
}

function BoxCategory({ data = [] }: Props) {
    return (
        <div className='row my-2 box-category'>
            {
                data.map((item, index) => <CategoryItem slug={item?.path} title={item?.name} key={index} />)
            }
        </div>
    )
}

export default BoxCategory