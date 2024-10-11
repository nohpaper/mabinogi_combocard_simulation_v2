import {useState} from "react";

export default function Input(){
    const [isShow, setIsShow] = useState([true, false, false, false, false, false]);
    const [isBlink, setIsBlink] = useState([false, false, false, false, false, false]);
    const [isSelect, setIsSelect] = useState([false, false, false, false, false, false]);
    const [isDelete, setIsDelete] = useState(false);
    
    /** 변수
     *  1. 추가 버튼 클릭 시 콤보 칸 활성화 false -> true
     *      1-1. index 0은 초기 값 true
     *      1-2. custom 에서도 해당 값이 연동되어야 하는 가? -> NO (redux store/data.js 삽입 여부)
     *  2. 스킬 칸 클릭 시 (스킬 변경을 위한) 활성화 여부 false -> true //클릭할 때 마다 변경, focus out 되면 false로 변경
     *      2-1. custom 에서도 연동되어야 하는가 ? -> NO, why? combeData에 있는 개수만큼 순서대로 custom에서 뿌려주면 되고, 중간을 뛰어넘고 기입할 수 없기 떄문
     *  3. 선택한 칸부터 끝까지 제거
     *      3-1. isSelect 에서 하나라도 true가 될 경우 true로 변경
     *      3-2. 클릭 시 isSelect 값 확인 후 그에 따른 isShow 에 값 반영
     * **/
    
    
    console.log(isShow);
    return (
        <div>
            <div>
                {/*title*/}
                <h1>콤보카드 커스텀마이징</h1>
                <p>새로 고침이나 현재 창을 벗어날 시 입력한 데이터가 날아가니 주의해주세요</p>
            </div>
            <div className="flex justify-center">
                {/* content */}
                <div className="w-[100px] h-[100px] bg-gray-200">
                    {/* 도움말 */}
                </div>
                <div className="">
                    {/* 콤보 카드 입력 창 */}
                    <h5 className="w-[488px] pl-[56px] text-white text-[14px] leading-[53px] font-Mabinogi bg-[url('/public/images/common/bg_top.png')]">콤보 카드 입력창</h5>
                    <div className="w-[484px] pt-[10px] pb-[20px] m-auto bg-no-repeat bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                        {/* 콤보 카드 내부 */}
                        <div className="w-[351px] pt-[140px] px-[25px] pb-[44px] m-auto bg-no-repeat bg-[url('/public/images/common/combocard_bg.jpg')]">
                            <div>
                                {
                                    isShow.map(function(element, index){
                                        if(index === 1 || index === 3 || index === 5){
                                            return (
                                                <div className="h-[58px] relative flex flex-row-reverse items-center mt-[-20px]">
                                                    {
                                                        !element ?
                                                            <button
                                                                type="button"
                                                                className={`${isBlink[index] && "blink_animation"} px-[15px] pt-[6px] pb-[4px] absolute right-[30%] text-white text-[14px] font-Mabinogi translate-x-full bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}
                                                                onMouseEnter={()=>{
                                                                    isBlink.map(function (child, subIndex) {
                                                                        if (index > subIndex) {
                                                                            //click index 의 값이 subIndex 보다 크거나 같을 때
                                                                            if(subIndex !== 0){
                                                                                console.log(index, subIndex);
                                                                                isBlink[subIndex] = true;
                                                                                setIsBlink([...isBlink]);
                                                                            }
                                                                        }
                                                                    });
                                                                }}
                                                                onMouseLeave={()=>{
                                                                    isBlink.map(function (child, subIndex) {
                                                                        isBlink[subIndex] = false;
                                                                        setIsBlink([...isBlink]);
                                                                        if (index > subIndex) {
                                                                            //click index 의 값이 subIndex 보다 크거나 같을 때
                                                                            if(subIndex !== 0){
                                                                                console.log(index, subIndex);


                                                                            }
                                                                        }
                                                                    });
                                                                }}
                                                                onClick={() => {
                                                                    isShow.map(function (child, subIndex) {
                                                                        if (index >= subIndex) {
                                                                            //click index 의 값이 subIndex 보다 크거나 같을 때
                                                                            if(subIndex !== 0){
                                                                                console.log(subIndex);
                                                                                isShow[subIndex] = true;
                                                                                setIsShow([...isShow]);
                                                                            }
                                                                        }
                                                                    });
                                                                }}>추가
                                                            </button>
                                                            : null
                                                    }
                                                    {
                                                        element ?
                                                            <div className="h-[100%] flex flex-row-reverse">
                                                                <div className="w-[68px] h-[100%] bg-black"></div>
                                                                <button type="button"
                                                                        className="w-[58px] h-[100%] text-[0px] bg-[url('/public/images/common/skill_line.png')]">blank
                                                                </button>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            )
                                        } else if (index === 2 || index === 4) {
                                            return (
                                                <div className="h-[58px] relative flex items-center mt-[-20px]">
                                                    {
                                                        !element ?
                                                            <button type="button"
                                                                    className={`${isBlink[index] && "blink_animation"} px-[15px] pt-[6px] pb-[4px] absolute left-[22%] text-white text-[14px] font-Mabinogi translate-x-[-50%] bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}>추가
                                                            </button>
                                                            : null
                                                    }
                                                    {
                                                        element ?
                                                            <div className="h-[100%] flex">
                                                                <div className="w-[68px] h-[100%] bg-black"></div>
                                                                <button type="button"
                                                                        className="w-[58px] h-[100%] text-[0px] bg-[url('/public/images/common/skill_line.png')]">blank
                                                                </button>
                                                            </div>
                                                            : null
                                                    }
                                                </div>
                                            )
                                        } else {
                                            return (
                                                <div className="flex mt-[-20px]">
                                                    <div className="w-[68px] h-[58px] invisible"></div>
                                                    <button type="button"
                                                            className="w-[58px] h-[58px] text-[0px] bg-[url('/public/images/common/skill_line.png')]">blank
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <button type="button" className="block px-[20px] pt-[8px] pb-[6px] m-auto mt-[22px] box-content text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg_long.png')]">선택한 칸부터 끝까지 제거</button>
                        </div>
                        <div className="flex justify-center gap-[5px] mt-[10px]">
                            <button type="submit" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]">다음</button>
                            <button type="button" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]">초기화</button>
                        </div>
                    </div>
                </div>
                <div className="px-[10px] py-[10px] ml-[10px] bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                    {/* 스킬 목록 */}
                    <div className="flex">
                        <button className="w-[58px] h-[58px] bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">blank</button>
                        <button className="w-[150px] h-[58px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">컴뱃 마스터리</button>
                    </div>
                </div>
            </div>
        </div>
    )
};