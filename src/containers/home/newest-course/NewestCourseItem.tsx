import React from 'react'
import { CiTempHigh } from 'react-icons/ci'


interface IWeatherItem{
    title: string,
    image: string,
    temperature: number,
    description: string,
}

function NewestCourseItem(props: IWeatherItem) {
    return (
        <div className='newest-course-item'>
            <div className='img'>
                <img src={props.image} alt='khoa-hoc-mien-phi' />

            </div>
            <div className='info mt-3'>
                {/* <div className='create'>
                    Admin - 10:07 30/09/2021
                </div> */}
                <div className='title mt-1'>
                    Thời tiết {props.title} hiện tại
                </div>
                <a href='/' className='cus-a comment d-flex align-items-center mt-1'>
                    <CiTempHigh size={20} style={{color: 'blue'}}/>
                    <span className='text-primary' style={{fontSize: '15px'}}>{props.temperature}°C - {props.description}</span>
                </a>
            </div>
        </div>
    )
}

export default NewestCourseItem