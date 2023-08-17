import React from 'react'

function HotCourseItem() {
    return (
        <div className={`product-item  slide`}>
            <div className='wrapper' style={{ border: 'none' }}>
                <a className='cus-a' href='/'>
                    <div className='img'>
                        <img src='https://tailieumienphi.info/upload/images/tai-video-tiktok-khong-co-logo-hinh-mo-watermark-mien-phi-moi-nhat.png' />
                    </div>
                    <div className='text-center price mt-1'>
                        Miễn phí <del style={{ color: '#9ca3a3', fontWeight: 500, fontSize: '16px' }}>$999</del>
                    </div>
                    <div className='title mt-1 text-center'>
                        Tải Video Tiktok Không Có Logo, Hình Mờ, Watermark Miễn Phí Mới Nhất dsa dsa dsa dassd as dsad sad s
                    </div>
                </a>
            </div>
        </div>
    )
}

export default HotCourseItem