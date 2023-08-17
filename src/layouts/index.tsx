import React, { useEffect } from 'react'
import Navbar from './Navbar'
import styles from '@/styles/layout/index.module.scss'
import Footer from './Footer';
import NewestCourse from '@/containers/home/newest-course';
import HotCourse from '@/containers/home/hot-course';
import Professional from '@/containers/home/professional';
import Feature from '@/containers/home/feature';
import {useState, useRef} from 'react'
import IBanner from '@/interfaces/IBanner';
import { getBanner } from '@/api/banner';
import Link from 'next/link';

type Props = {
    children: JSX.Element;
};

function Layout({ children }: Props) {
    const [banner, setBanner] = useState<IBanner>()
    const [bannerBot, setBannerBot] = useState(true)
    const getBanners = async () => {
        try {
            const banner = await getBanner()
            setBanner(banner.data?.banner)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getBanners()
        if(document.getElementById("video-banner")){

            //@ts-ignore
            document.getElementById("video-banner")?.play()
        }
    },[])
    return (
        <>
            <div className={styles.layout}>
                <div className='banner-left-1' dangerouslySetInnerHTML={{__html: banner?.bannerLeft1 || ''}}>
                </div>
                <div className='banner-left-2'>
                    <video id = "video-banner" src={`http://localhost:8017/uploads/${banner?.bannerLeft2}`} autoPlay muted/>
                </div>
                <a target='_blank' href={banner?.linkBannerRight || '#'}><div className='banner-right'>
                    <img src={banner?.bannerRight}/>
                </div></a>
                {bannerBot && banner?.linkBannerBot && <a target='_blank' href={banner?.linkBannerBot || '#'}><div className='banner-bot'>
                    <div className = "close-banner-bot" onClick={()=>setBannerBot(false)}>X</div>
                    <img src={banner?.bannerBot}/>
                </div></a>}
                <Navbar />
                <div className='container d-flex'>
                    <div className={`${styles.layoutSidebar} show-for-x-large`}>
                        <NewestCourse />
                        <HotCourse />
                        <Professional />
                        <Feature />
                    </div>
                    <div className={styles.layoutContent}>
                        {children}
                        <div className='hide-for-x-large'>
                            <NewestCourse />
                            <HotCourse />
                            <Professional />
                            <Feature />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default Layout