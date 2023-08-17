import ProductItem from '@/containers/ProductItem';
import React, { useEffect, useRef, useState } from 'react';
import { TiArrowLeftThick, TiArrowRightThick } from 'react-icons/ti'
import Slider, { Settings } from 'react-slick';
import NewestCourseItem from './NewestCourseItem';
import { getListWeather } from '@/api/weather';
import IWeather from '@/interfaces/IWeather';
import { location } from '@/mocks/weather_locations';

function NewestCourse() {
    const [padding, setPadding] = useState<number>(734);
    const slider = useRef<any>(null);
    const [weathers, setWeathers] = useState<IWeather[]>([])
    const settings: Settings = {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
    };

    const convertFromKelvinToCelcius = (kelvin:number) => Math.round((kelvin - 273.15)*100)/100

    const onPrev = () => {
        slider.current?.slickPrev();
    }

    const onNext = () => {
        slider.current?.slickNext();
    }

    const getWeathers = async () => {
        try {
            const result = await Promise.all(
                location.map(async (item) =>{
                    const weather = await getListWeather(item.lat, item.lon)
                    return {...weather.data, city: item.name, image: item.image}
                })
            )
            setWeathers(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const menu = document.getElementById("category-menu");

        setPadding((menu?.scrollHeight || 654) + 80)
        getWeathers()
    }, [])


    return (
        <section id='section-newest-course' style={{ paddingTop: `${padding}px` }}>
            <div className='row justify-content-center'>
                <div className='pagination pb-1 d-flex align-items-center justify-content-between px-3'>
                    <h5 className='h5'>Thời tiết</h5>
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
                            weathers.map((item, index) => <NewestCourseItem description={item.weather?.[0].description == 'mây cụm' ? 'nhiều mây' : item.weather?.[0].description} temperature={convertFromKelvinToCelcius(item.main.temp)} image={`/images/${item.image}` || ''} title={item.city || ''} key={index} />)
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default NewestCourse;