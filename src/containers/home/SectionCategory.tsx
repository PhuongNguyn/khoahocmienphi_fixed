import React, { useRef } from 'react';
import Slider, { Settings } from "react-slick";
import ProductItem from '../ProductItem';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'

type Props = {
    name: string;
    data: any[];
}

function SectionCategory({ name, data }: Props) {
    const slider = useRef<any>(null);
    const settings: Settings = {
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const getSetting = (length: number): Settings => {
        return {
            speed: 500,
            slidesToShow: length < 4 ? length : 4,
            slidesToScroll: length < 4 ? length : 4,
            infinite: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: length < 2 ? length : 2,
                        slidesToScroll: length < 2 ? length : 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        }
    }

    const onPrev = () => {
        slider.current?.slickPrev();
    }

    const onNext = () => {
        slider.current?.slickNext();
    }


    const render = {
        empty: <></>,
        has: <section className='row'>
            <div className='col col-12'>
                <div id='section-category'>
                    <div className='d-flex'>
                        <a href='/' className='cus-a title title-line-bottom'>
                            <h5 className='h5'>
                                {name}
                            </h5>
                        </a>
                    </div>
                    <div className='mt-2 position-relative wrapper-slider-category'>
                        <Slider ref={slider} {...getSetting(data?.length || 1)}>
                            {
                                (data || []).map((item, index) => <ProductItem image={item?.image} slug={item?.path} title={item?.title} key={index} index={index} isSlideItem />)
                            }
                        </Slider>
                        <button onClick={onPrev} className='button-arrow button-previous'>
                            <TiArrowLeftThick />
                        </button>
                        <button onClick={onNext} className='button-arrow button-next'>
                            <TiArrowRightThick />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    }

    return (
        <>
            {data?.length > 0 ? render['has'] : render['empty']}
        </>
    )
}

export default SectionCategory