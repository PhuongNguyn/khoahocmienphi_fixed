import React from 'react'

type Props = {
    item: any;
}

function ProfessionalItem({ item }: Props) {
    return (
        <div className='professional-item mt-4 d-flex align-items-center' style={{ backgroundImage: `url(${item?.image})` }}>
            <div className='cus-a'>
                {item?.caption}
                {item?.price &&
                    <div className='price mt-2'>
                        {item?.price}
                    </div>
                }
                <div className='d-flex mt-1'>
                    <a className='cus-a' href='/'>
                        <button className='btn0'>
                            Xem ngay
                        </button>
                    </a>
                </div>

            </div>
        </div>
    )
}

export default ProfessionalItem