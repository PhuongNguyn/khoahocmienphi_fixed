import ProductItem from '@/containers/ProductItem';
import React, { useEffect, useRef } from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import Slider, { Settings } from 'react-slick';
import HotCourseItem from './HotCourseItem';

function HotCourse() {
    const slider = useRef<any>(null);
    const settings: Settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
    };

    const onPrev = () => {
        slider.current?.slickPrev();
    }

    const onNext = () => {
        slider.current?.slickNext();
    }

    return (
        <section id='section-hot-course'>
            <div className='row justify-content-center'>
                <div className='pagination pb-1 d-flex align-items-center justify-content-between px-3'>
                    <h5 className='h5'>Khoá học nổi bật</h5>
                    <div>
                        <button onClick={onPrev} className='btn0 button-arrow'>
                            <TiArrowLeftThick />
                        </button>
                        <button onClick={onNext} className='btn0 button-arrow' style={{ marginLeft: '5px' }}>
                            <TiArrowRightThick />
                        </button>
                    </div>
                </div>
                <div className='wrapper-slider-newest-course mt-3 p-0'>
                    <Slider ref={slider} {...settings}>
                        {
                            [1, 2, 3, 4].map((item, index) => <HotCourseItem key={index} />)
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default HotCourse;