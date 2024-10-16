import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';

export default function Input(){
    const skill = useSelector((state)=> state.skill );
    const [isShow, setIsShow] = useState([true, false, false, false, false, false]);
    const [isBlink, setIsBlink] = useState([false, false, false, false, false, false]);
    const [isSelect, setIsSelect] = useState([false, false, false, false, false, false]);
    const [inputData, setInputData] = useState([
        {skill:"blank", percent:0},{skill:"blank", percent:0},{skill:"blank", percent:0},{skill:"blank", percent:0},{skill:"blank", percent:0},{skill:"blank", percent:0},
    ])
    
    const countSelect = isSelect.filter((element)=> element === true).length;
    const trueIndexSelect = isSelect.findIndex((element)=> element === true);
    
    /** 변수
     *  1. isShow: 추가 버튼 클릭 시 콤보 칸 활성화 false -> true
     *      1-1. index 0은 초기 값 true
     *      1-2. custom 에서도 해당 값이 연동되어야 하는 가? -> NO (redux store/data.js 삽입 여부)
 *      2. isBlink : mouseEnter / mouseLeave 활용 event
     *      2-1. mouseEnter 시 enter element index 와 같거나 미만인 index가 true로 변환되며 깜빡임
     *      2-2. mouseLeave 시 ALL element index 가 false로 변환
     *  3. isSelect : 스킬 칸 클릭 시 (스킬 변경을 위한) 활성화 여부 false -> true
     *      3-1. 클릭할 때 마다 prev value의 반대로 변경
     *      3-2. custom 에서도 연동되어야 하는가 ? -> NO, why? combeData에 있는 개수만큼 순서대로 custom에서 뿌려주면 되고, 중간을 뛰어넘고 기입할 수 없기 떄문
     * **/

    const addMouseEnter = (index) => {
        isBlink.map(function (child, subIndex) {
            if (index > subIndex) {
                //click index 의 값이 subIndex 보다 크거나 같을 때
                if(subIndex !== 0){
                    isBlink[subIndex] = true;
                    setIsBlink([...isBlink]);
                }
            }
            return [...isBlink]
        });
    }
    const addMouseLeave = () => {
        isBlink.map(function (child, subIndex) {
            isBlink[subIndex] = false;
            return setIsBlink([...isBlink]);
        });
    }
    const addClickShow = (index) => {
        isShow.map(function (child, subIndex) {
            if (index >= subIndex) {
                //isBlink이 현재 index 혹은 낮은 index가 true일 경우 모두 false로 변환
                isBlink[subIndex] = false;
                setIsBlink([...isBlink]);

                //isShow index 1부터 click index까지 모두 true로 변환
                if(subIndex !== 0){
                    isShow[subIndex] = true;
                    setIsShow([...isShow]);
                }
            }
            return [...isShow]  //?????
        });
    }
    const percentInput = (index, event) => {
        //입력한 값이 maxLength보다 크거나 같을 경우 e.target.value값을 잘라줌z
        if(event.target.value.length >= event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }

        inputData[index].percent = event.target.value;
        setInputData([...inputData]);
    }
    const selectActive = (index)=> {
        //element click false => true / true => all false
        
        if(countSelect <= 2){
            isSelect.map(function(child, subIndex){
                if(index !== subIndex){
                    isSelect[subIndex] = false;
                    setIsSelect([...isSelect]);
                }
                return [...isSelect]
            });
        }
        isSelect[index] = !isSelect[index];
        setIsSelect([...isSelect]);
    }

    return (
        <div>
            <div>
                {/*title*/}
                <h1 className="pt-[20px] pb-[5px] text-center text-[32px] font-bold">콤보카드 커스텀마이징</h1>
                <p className="text-center">새로 고침이나 현재 창을 벗어날 시 입력한 데이터가 날아가니 주의해주세요</p>
            </div>
            <div className="pt-[30px] flex justify-center">
                {/* content */}
                <div className="w-[100px] h-[100px] mr-[10px] bg-gray-200">
                    {/* 도움말 */}
                    <h5>도움말</h5>
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
                                                                className={`${isBlink[index] && "animate-blink"} px-[15px] pt-[6px] pb-[4px] absolute right-[30%] text-white text-[14px] font-Mabinogi translate-x-full bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}
                                                                onMouseEnter={()=>addMouseEnter(index)} onMouseLeave={()=>addMouseLeave()} onClick={() =>addClickShow(index)}>추가
                                                            </button>
                                                            : null
                                                    }
                                                    {
                                                        element ?
                                                            <div className="
                                                                h-[100%] flex flex-row-reverse relative
                                                                before:w-[61px] before:h-[29px] before:absolute before:top-[-10px] before:left-[-60px] before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_left.png')]
                                                            ">
                                                                <div className="
                                                                        w-[68px] h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                        before:content-['+'] before:absolute before:top-[50%] before:left-[10px] before:-translate-y-1/2
                                                                        after:content-['%'] after:absolute after:top-[50%] after:right-[10px] after:-translate-y-1/2
                                                                    ">
                                                                    <input type="number" maxLength="2" min="0" max="100" value={inputData[index].percent} placeholder="88" className="
                                                                        w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                        " onChange={(event)=>{
                                                                            //TODO:: 태그 내 value 공란, 이후 입력 시작 시 inputData state in data push
                                                                            percentInput(index, event);
                                                                    }}/>
                                                                </div>
                                                                <button type="button"
                                                                        className={`
                                                                            w-[58px] h-[58px] relative text-[0px]
                                                                            before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                            after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${isSelect[index] ? "after:animate-blink" : "after:opacity-0"}
                                                                        `}
                                                                        onClick={()=>{
                                                                            selectActive(index);
                                                                        }}
                                                                ><img src={`/images/common/skill/${inputData[index].skill}.jpg`} alt={inputData[index].skill} className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
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
                                                                    className={`${isBlink[index] && "animate-blink"}  px-[15px] pt-[6px] pb-[4px] absolute left-[22%] text-white text-[14px] font-Mabinogi translate-x-[-50%] bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}
                                                                    onMouseEnter={()=>addMouseEnter(index)} onMouseLeave={()=>addMouseLeave()} onClick={() =>addClickShow(index)}>추가
                                                            </button>
                                                            : null
                                                    }
                                                    {
                                                        element ?
                                                            <div className="
                                                                h-[100%] flex relative
                                                                before:w-[61px] before:h-[29px] before:absolute before:top-[-10px] before:right-[-60px] before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_right.png')]
                                                            ">
                                                                <div className="
                                                                        w-[68px] h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                        before:content-['+'] before:absolute before:top-[50%] before:left-[10px] before:-translate-y-1/2
                                                                        after:content-['%'] after:absolute after:top-[50%] after:right-[10px] after:-translate-y-1/2
                                                                    ">
                                                                    <input type="number" maxLength="2" min="0" max="100"
                                                                           value={inputData[index].percent}
                                                                           placeholder="00" className="
                                                                        w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                        " onChange={(event) => {
                                                                        //TODO:: 태그 내 value 공란, 이후 입력 시작 시 inputData state in data push
                                                                        percentInput(index, event);
                                                                    }}/>
                                                                </div>
                                                                <button type="button"
                                                                        className={`
                                                                            w-[58px] h-[58px] relative text-[0px]
                                                                            before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                            after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${isSelect[index] ? "after:animate-blink" : "after:opacity-0"}
                                                                        `}
                                                                        onClick={() => {
                                                                            selectActive(index);
                                                                        }}
                                                                ><img
                                                                    src={`/images/common/skill/${inputData[index].skill}.jpg`}
                                                                    alt={inputData[index].skill}
                                                                    className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
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
                                                            className={`
                                                                w-[58px] h-[58px] relative text-[0px]
                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${isSelect[index] ? "after:animate-blink" : "after:opacity-0"}
                                                            `}
                                                            onClick={() => {
                                                                selectActive(index);
                                                            }}
                                                    ><img src={`/images/common/skill/${inputData[index].skill}.jpg`}
                                                          alt={inputData[index].skill}
                                                          className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                    </button>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <button type="button"
                                    className={`
                                        block px-[20px] pt-[8px] pb-[6px] m-auto mt-[22px] box-content text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg_long.png')]
                                        ${countSelect >= 1 && !isSelect[0] ? "visible" : "invisible"}
                                    `} onClick={()=>{
                                        // trueIndexSelect 1이상 부터 실행
                                        if (trueIndexSelect !== -1 && trueIndexSelect !== 0) {
                                            //select된 index 부터 끝까지 isShow index false로 변환
                                            isShow.map(function(child, subIndex){
                                                if(subIndex >= trueIndexSelect && subIndex < isSelect.length){
                                                    isShow[subIndex] = false;
                                                    setIsShow([...isShow]);

                                                    //입력된 skill, percent 초기화
                                                    inputData[subIndex].skill = "blank";
                                                    inputData[subIndex].percent = 0;
                                                    setInputData([...inputData]);
                                                }
                                                return [...isShow]
                                            });
                                            
                                            //isSelect 의 true값 false
                                            isSelect[trueIndexSelect] = false;
                                            setIsSelect([...isSelect]);
                                        } else {
                                            console.log('제거 불가 칸이거나 true 값이 없습니다');
                                        }
                                    }}
                            >선택한 칸부터 끝까지 제거</button>
                        </div>
                        <div className="flex justify-center gap-[5px] mt-[10px]">
                            {/* TODO::
                                1. 입력한 skill value 중에 blank value => Boolean CHECK 
                                2. 입력한 percent blank value Boolean CHECK => true 1개 이상일 경우 custom.js 으로 넘어가지 않음
                                3. before percent value와 값을 비교했을 때 after value 이 같거나 작을 경우 custom.js 으로 넘어가지 않음
                                4. 위 내용이 모두 확인되어 문제 없을 경우 입력한 정보가 data.js(redux)에 저장되며 custom.js로 이동
                             */}
                            <button type="submit" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]">다음</button>
                            <button type="button" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]" onClick={()=>{
                                //1. isShow, isSelect all false로 변경 / 2. inputData 초기화

                                inputData.map(function(element, index){
                                    isShow[index] = false;
                                    isSelect[index] = false;
                                    setIsShow([...isShow]);
                                    setIsSelect([...isSelect]);

                                    element.skill = "blank";
                                    element.percent = 0;
                                    setInputData([...inputData]);
                                });
                            }}>초기화</button>
                        </div>
                    </div>
                </div>
                <div className="relative px-[10px] py-[10px] ml-[10px] bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                    <h5 className={`${countSelect >= 1 ? "visible" : "invisible"}`}>스킬 목록</h5>
                    {/* 스킬 목록 */}
                    <div className="h-[548px] overflow-y-auto">
                    {skill.map(function(element){
                        return (
                            <div>
                                <a href="#" title={element.name} className="flex" onClick={(event)=>{
                                    event.preventDefault();
                                    //isSelect value 중에 true 의 index 를 가져와, inputData[trueIndexSelect] 에 클릭한 skill.englishName 삽입
                                    inputData[trueIndexSelect].skill = element.englishName;
                                    setInputData([...inputData]);
                                }}>
                                    <div
                                        className="w-[58px] h-[58px] relative bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">
                                        <img src={`/images/common/skill/${element.englishName}.jpg`} alt={element.name} className="w-[50px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                    <p
                                        className="w-[150px] h-[58px] text-white text-[14px] font-Mabinogi text-center leading-[58px] bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">{element.name}
                                    </p>
                                </a>
                            </div>
                        )
                    })}
                    </div>
                    <p className={`
                        absolute top-[102%] right-0 px-[10px] pt-[9px] pb-[5px] border-[1px] border-solid border-[#6b855e] rounded-sm text-[12px] text-[#151811] font-Mabinogi bg-[#a6ce92] ${countSelect >= 1 ? "visible" : "invisible"}
                        before:absolute before:top-[-12px] before:right-[19px] before:border-[12px] before:border-t-[0] before:border-r-[0] before:border-solid before:border-transparent before:border-b-[#6b855e]
                        after:absolute after:top-[-10px] after:right-[20px] after:border-[10px] after:border-t-[0] after:border-r-[0] after:border-solid after:border-transparent after:border-b-[#a6ce92]
                        `}>여기에서 선택해요!</p>
                </div>
            </div>
        </div>
    )
};