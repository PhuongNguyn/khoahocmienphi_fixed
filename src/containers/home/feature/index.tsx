import React from 'react'

const data = [
  {
    id: 1,
    title: 'KHÔNG mua bán',
    extra: 'Khoá học'
  },
  {
    id: 2,
    title: 'KHÔNG thu thập',
    extra: 'Email'
  },
  {
    id: 3,
    title: 'KHÔNG quảng cáo',
    extra: 'Rút gọn link'
  },
  {
    id: 4,
    title: 'KHÔNG cần',
    extra: 'Đăng nhập'
  },
  {
    id: 5,
    title: 'Dự án vì',
    extra: 'Cộng đồng',
    class: 'last'
  }
]

function Feature() {
  return (
    <div className='feature'>
      {
        data.map((item) => <div key={item.id} className={`feature-item ${item?.class}`}>
          <h6 className='h6'>
            {item?.title}
          </h6>
          <div className='extra'>
            {item?.extra}
          </div>
        </div>)
      }
    </div>
  )
}

export default Feature