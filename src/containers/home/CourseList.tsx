import React from 'react'
import CourseItem from './CourseItem'

const dummyData = [
    {
        id: 1,
        title: 'Học sinh Cấp 1 - Cấp 2 - Cấp 3',
        class: "left6 top6 left3 top3"
    },
    {
        id: 2,
        title: 'Tài Liệu - Khóa Học Sinh Viên',
        class: "top6 top3"
    },
    {
        id: 3,
        title: 'Luyện Thi Đại Học',
        class: "top6 top3"
    },
    {
        id: 4,
        title: 'Ngoại Ngữ',
        class: "top6 left3"
    },
    {
        id: 5,
        title: 'Marketing - Truyền Thông',
        class: "top6"
    },
    {
        id: 6,
        title: 'Kinh doanh',
        class: "top6"
    },
    {
        id: 7,
        title: 'Khởi Nghiệp',
        class: "left6 left3"
    },
    {
        id: 8,
        title: 'Khóa học Kỹ Năng Mềm - Tặng miễn phí 100%',
        class: ""
    },
    {
        id: 9,
        title: 'Lập Trình',
        class: "",
    },
    {
        id: 10,
        title: 'Phát Triển Bản Thân',
        class: "left3",
    },
    {
        id: 11,
        title: 'Bất Động Sản',
        class: "",
    }
]

type Props = {
    data?: any[];
}

function CourseList({ data }: Props) {
    return (
        <section className='row'>
            <div id='course-list' className='col col-12'>
                <div className='wrapper-course-list'>
                    <div className='text-center mb-4'>
                        <h2 className='h2'>
                            Danh mục khóa học
                        </h2>
                    </div>

                    <div className='row-course-list'>
                        {
                            (data || dummyData).map((item) => <CourseItem key={item?.id} item={item} />)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CourseList