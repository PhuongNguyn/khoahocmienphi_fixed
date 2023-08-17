import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaGooglePlusG, FaTwitter, FaVimeo } from 'react-icons/fa';

const social = [
    {
        id: 1,
        name: 'Facebook',
        link: 'https://www.facebook.com/profile.php?id=100091811481402',
        icon: <FaFacebookF />
    },
]

function Footer() {
    return (
        <footer id='footer'>
            <div className='wrapper-top'>
                <div className='container'>
                    <div className='row justify-content-center align-items-center'>
                        <ul className='cus-ul d-flex m-0 p-0 justify-content-center flex-wrap'>
                            {
                                social.map((item) => (
                                    <li key={item.id} className="mt-2">
                                        <a href={item.link} target='_blank' className='cus-a d-flex align-items-center'>
                                            <i>
                                                {item.icon}
                                            </i>
                                            <span className='mx-2'>{item.name}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>

            <div className='wrapper-bottom'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-4 d-flex align-items-center'>
                            © Copyright 2021 by TailieuMienphi®. All rights reserved.
                        </div>
                        <div className='col-12 col-md-5 d-flex align-items-center justify-content-md-center'>
                            <div className=''>
                                <Link className='cus-a' href='/gioi-thieu-va-dieu-khoan-su-dung'>
                                    Giới thiệu điều khoản và sử dụng
                                </Link>
                            </div>
                        </div>
                              <div className="col-12 col-md-3 d-flex align-items-center justify-content-md-end font_size_14">
              <a
                style={{ color: "#BABABA", textDecoration: "none" }}
                href="https://jun88.tv"
                rel="nofollow"
              >
                JUN88
              </a>
            </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer