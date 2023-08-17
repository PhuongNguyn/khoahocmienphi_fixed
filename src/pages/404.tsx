import { useRouter } from "next/router";
import { useEffect } from "react"

export default function Custom404() {
    const router = useRouter()

    useEffect(()=>{
        let timeLeft = 10
        var countdown = setInterval(function(){
            if(document.getElementById("countdown")){
                document.getElementById("countdown")!.innerHTML = `${timeLeft}`;
                timeLeft -= 1;
                if(timeLeft <= 0){
                    clearInterval(countdown);
                    router.push('/')
                }
            }
        }, 1000);

        return () => {
            clearInterval(countdown)
        }
    },[])

    return (
        <center>
            <h1 style={{marginTop: '20px'}}>Không tìm thấy trang</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <p>Chúng tôi sẽ chuyển bạn về trang chủ trong <span id="countdown"></span> giây.</p>
        </center>
    )
}