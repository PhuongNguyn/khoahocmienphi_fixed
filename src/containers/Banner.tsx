import React from 'react'

type Props = {
    caption: React.ReactElement;
    image: string;
}

function Banner({ caption, image }: Props) {
    return (
        <div className='banner mt-4'>
            <div className='banner-bg d-flex align-items-center' style={{ backgroundImage: `url(${image})` }}>
                {caption}
            </div>
        </div>
    )
}

export default Banner