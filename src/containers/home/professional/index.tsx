import React from 'react'
import ProfessionalItem from './ProfessionalItem'

const data = [
    {
        id: 1,
        image: 'https://tailieumienphi.info/images/1.png',
        caption: <div className='caption'>
            <div>Bạn muốn <br /> trở thành<br /><strong>Chuyên gia</strong> <br />Digital Marketing</div>
        </div>,
        price: 'Miễn phí'
    },
    {
        id: 2,
        image: 'https://tailieumienphi.info/images/2.png',
        caption: <div className='caption'>
            <div>Dành riêng cho <br /> <strong> Tiếng Anh</strong><br /> Căn bản <br /> đến nâng cao</div>
        </div>
    },
    {
        id: 3,
        image: 'https://tailieumienphi.info/images/widget-banner.png',
        caption: <div className='caption'>
            <div>Bạn muốn <br /> trở thành<br /><strong>Chuyên gia</strong> <br />Digital Marketing</div>
        </div>
    }
]

function Professional() {
    return (
        <section className='section-professional'>
            <div className='row p-0'>
                <div className='px-1'>
                    {
                        data?.map((item) => <ProfessionalItem key={item?.id} item={item} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default Professional