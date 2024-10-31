import {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {pageNextInitData} from "../store/data";

export default function Input(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const skill = useSelector((state)=> state.skill );
    //const combo = useSelector((state)=> state.combo.items );
    const [isBlink, setIsBlink] = useState([false, false, false, false, false, false]);
    const [inputData, setInputData] = useState([
        {skill:"blank", percent:"", isShow:true, isSelect:false},{skill:"blank", percent:"", isShow:false, isSelect:false},
        {skill:"blank", percent:"", isShow:false, isSelect:false},{skill:"blank", percent:"", isShow:false, isSelect:false},
        {skill:"blank", percent:"", isShow:false, isSelect:false},{skill:"blank", percent:"", isShow:false, isSelect:false},
    ])
    
    const countSelect = inputData.filter((element)=> element.isSelect === true).length;
    const trueIndexSelect = inputData.findIndex((element)=> element.isSelect === true);
    
    /** 변수
     *  1. skill : 선택 가능한 스킬들의 redux data
     *  2. isBlink : mouseEnter / mouseLeave 활용 event
     *      2-1. mouseEnter 시 enter element index 와 같거나 미만인 index가 true로 변환되며 깜빡임
     *      2-2. mouseLeave 시 ALL element index 가 false로 변환
     *  3. inputData : combo 관련 data
     *      3-1. skill : 초기 값 "blank", 스킬 목록에서 클릭 시 값 변경, 콤보 칸 제거 버튼 or 초기화 버튼 클릭 시 해당되는 index value reset
     *      3-2. percent : 초기 값 "", focus 하여 00~99까지 숫자로 기입 가능 3-1 과 마찬가지로 콤보 칸 제거 버튼 or 초기화 버튼 클릭 시 해당되는 index value reset
     *      3-3. isShow : 초기 값 false (index:0은 true), 클릭 시 not index 0 && before index all 값 true 로 변경, 콤보 칸 제거 버튼 or 초기화 버튼 클릭 시 value true
     *      3-4. isSelect : 초기 값 false isShow 가 true 인 칸의 skill 을 클릭 시 true 로 변경, all index 중에 true 은 1개의 index 만 가능, true인 상태로 콤보 칸 제거 버튼 or 초기화 버튼 클릭 시 value false
     *  4. countSelect : inputData.isSelect 에서 true 의 갯수 확인 변수
     *      4-1. 어떤 기능에서 사용되는지 서술 예정
     *  5. trueIndexSelect : inputData.isSelect 에서 true 의 값을 가지고 있는 index 확인 변수
     *      5-1. 어떤 기능에서 사용되는지 서술 예정
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
        inputData.map(function (child, subIndex) {
            if (index >= subIndex) {
                //isBlink이 현재 index 혹은 낮은 index가 true일 경우 모두 false로 변환
                isBlink[subIndex] = false;
                setIsBlink([...isBlink]);
                
                //isShow index 1부터 click index까지 모두 true로 변환
                if(subIndex !== 0){
                    inputData[subIndex].isShow = true;
                }
            }
            return setInputData([...inputData]);
        });
        
    }
    const percentInput = (index, event) => {
        //입력한 값이 maxLength보다 크거나 같을 경우 e.target.value값을 잘라줌
        if(event.target.value.length >= event.target.maxLength) {
            event.target.value = event.target.value.slice(0, event.target.maxLength);
        }

        inputData[index].percent = event.target.value;
        setInputData([...inputData]);
    }
    const selectActive = (index)=> {
        //element click false => true / true => all false
        
        
        if(countSelect <= 2){
            inputData.map(function(child, subIndex){
                if(index !== subIndex){
                    child.isSelect = false;
                    setInputData([...inputData]);
                }
                return [...inputData]
            });
        }
        //click 시 index.isSelect value 의 반대 값으로 계속 변경
        inputData[index].isSelect = !inputData[index].isSelect;
        setInputData([...inputData]);
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
                <div>
                    {/* 콤보 카드 입력 창 */}
                    <h5 className="w-[488px] pl-[56px] text-white text-[14px] leading-[53px] font-Mabinogi bg-[url('/public/images/common/bg_top.png')]">콤보 카드 입력창</h5>
                    <div className="w-[484px] pt-[10px] pb-[20px] m-auto bg-no-repeat bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                        {/* 콤보 카드 내부 */}
                        <form action="/custom">
                            <div className="w-[351px] pt-[140px] px-[25px] pb-[44px] m-auto bg-no-repeat bg-[url('/public/images/common/combocard_bg.jpg')]">
                                <div>
                                    {
                                        inputData.map(function(element, index){
                                            if(index === 1 || index === 3 || index === 5){
                                                return (
                                                    <div className="h-[58px] relative flex flex-row-reverse items-center mt-[-20px]">
                                                        {
                                                            !element.isShow ?
                                                                <button
                                                                    type="button"
                                                                    className={`${isBlink[index] && "animate-blink"} px-[15px] pt-[6px] pb-[4px] absolute right-[30%] text-white text-[14px] font-Mabinogi translate-x-full bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}
                                                                    onMouseEnter={()=>addMouseEnter(index)} onMouseLeave={()=>addMouseLeave()} onClick={() =>addClickShow(index)}>추가
                                                                </button>
                                                                : null
                                                        }
                                                        {
                                                            element.isShow ?
                                                                <div className="
                                                                    h-[100%] flex flex-row-reverse relative
                                                                    before:w-[61px] before:h-[29px] before:absolute before:top-[-10px] before:left-[-60px] before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_left.png')]
                                                                ">
                                                                    <div className="
                                                                            w-[68px] h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                            before:content-['+'] before:absolute before:top-[50%] before:left-[10px] before:-translate-y-1/2
                                                                            after:content-['%'] after:absolute after:top-[50%] after:right-[10px] after:-translate-y-1/2
                                                                        ">
                                                                        <input type="number" maxLength="2" min="0" max="100" value={element.percent} placeholder="00" className="
                                                                            w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                            " onChange={(event)=>{
                                                                                percentInput(index, event);
                                                                        }}/>
                                                                    </div>
                                                                    <button type="button"
                                                                            className={`
                                                                                w-[58px] h-[58px] relative text-[0px]
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                            onClick={()=>{
                                                                                selectActive(index);
                                                                            }}
                                                                    ><img src={`/images/common/skill/${element.skill}.jpg`} alt={element.skill} className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
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
                                                            !element.isShow ?
                                                                <button type="button"
                                                                        className={`${isBlink[index] && "animate-blink"}  px-[15px] pt-[6px] pb-[4px] absolute left-[22%] text-white text-[14px] font-Mabinogi translate-x-[-50%] bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]`}
                                                                        onMouseEnter={()=>addMouseEnter(index)} onMouseLeave={()=>addMouseLeave()} onClick={() =>addClickShow(index)}>추가
                                                                </button>
                                                                : null
                                                        }
                                                        {
                                                            element.isShow ?
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
                                                                               value={element.percent}
                                                                               placeholder="00" className="
                                                                            w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                            " onChange={(event) => {
                                                                            percentInput(index, event);
                                                                        }}/>
                                                                    </div>
                                                                    <button type="button"
                                                                            className={`
                                                                                w-[58px] h-[58px] relative text-[0px]
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                            onClick={() => {
                                                                                selectActive(index);
                                                                            }}
                                                                    ><img
                                                                        src={`/images/common/skill/${element.skill}.jpg`}
                                                                        alt={element.skill}
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
                                                                    after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                `}
                                                                onClick={() => {
                                                                    selectActive(index);
                                                                }}
                                                        ><img src={`/images/common/skill/${element.skill}.jpg`}
                                                              alt={element.skill}
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
                                            ${countSelect >= 1 && !inputData[0].isSelect ? "visible" : "invisible"}
                                        `} onClick={()=>{
                                            // trueIndexSelect 1이상 부터 실행
                                            if (trueIndexSelect !== -1 && trueIndexSelect !== 0) {
                                                //select된 index 부터 끝까지 isShow index false로 변환
                                                inputData.map(function(element, index){
                                                    //isSelect true 인 index 와 클릭한 index 가 같거나 크고, index 보다 inputData 갯수가 클 경우
                                                    if(index >= trueIndexSelect && index < inputData.length){
                                                        //inputData state in "isShow" value false
                                                        element.isShow = false;
    
                                                        //입력된 skill, percent 초기화
                                                        element.skill = "blank";
                                                        element.percent = "";
                                                        setInputData([...inputData]);
                                                    }
                                                    return [...inputData]
                                                });
                                                
                                                //isSelect 의 true값 false
                                                inputData[trueIndexSelect].isSelect = false;
                                                setInputData([...inputData]);
                                            } else {
                                                console.log('제거 불가 칸이거나 true 값이 없습니다');
                                            }
                                        }}
                                >선택한 칸부터 끝까지 제거</button>
                            </div>
                            <div className="flex justify-center gap-[5px] mt-[10px]">
                                <button type="submit" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]" onClick={(event)=>{
                                    event.preventDefault();
                                    const countShow = inputData.filter((element)=> element.isShow);
                                    const countShowAndSkill = inputData.filter((element)=> element.isShow && element.skill !== "blank");
                                    const countShowAndPercent = inputData.filter((element)=> element.isShow && element.percent !== "");
                                    
                                    const pageNextDataPush = () => {countShow.map((element)=>dispatch(pageNextInitData({skill:element.skill, percent:element.percent, })));}
                                    
                                    if(countShow.length >= 2){
                                        //isShow 값이 2개 이상일 경우
                                        console.warn("submit 1-1 →");
                                        if(countShow.length === countShowAndSkill.length){
                                            //isShow 갯수와 skill 입력한 갯수가 동일할 때
                                            console.warn("submit 2-1 →");
                                            if(countShowAndPercent.length === 0){
                                                //percent 가 모두 입력되어있지 않다면, 다음 페이지로 O
                                                pageNextDataPush();
                                                navigate("/custom");
                                                console.warn("submit 3-1 O");
                                                
                                            }else if(countShowAndPercent.length === 1){
                                                //percent 가 1개 이상 입력되어있다면
                                                
                                                console.warn("submit 3-2 →");
                                                if(countShow.length === 2){
                                                   //TODO:: isShow 값이 2개일 경우, 다음 페이지로 O
                                                    
                                                    pageNextDataPush();
                                                    navigate("/custom");
                                                    console.warn("submit 4-1 O");
                                                }else if(countShow.length > 2){
                                                    //isShow 값이 2개보다 클 경우, 다음 페이지로 X
                                                    event.preventDefault();
                                                    alert("% 값을 모두 입력하거나 모두 비워주세요");
                                                    console.warn("submit 4-2 X");
                                                }else{
                                                    console.error("error");
                                                    console.warn("submit 4-3 X");
                                                }
                                            }else if(countShowAndPercent.length >= 2){
                                                //percent 가 값이 2개 이상 있을 경우 before, after value comparison
                                                pageNextDataPush();//임시
                                                navigate("/custom");
                                                console.warn("submit 3-3 O");
                                                /*countShow.map(function(element, index){
                                                    const beforeIndex = index - 1;
                                                    const numberCurrent = countShow[index].percent === "" ? 0 : Number(countShow[index].percent);
                                                    let numberBefore;
                                                    
                                                    //index 1부터 확인
                                                    if(index !== 0){
                                                        numberBefore = countShow[beforeIndex].percent === "" ? 0 : Number(countShow[beforeIndex].percent);
                                                        
                                                        let positiveNumber = 0;
                                                        const mathPercent = numberCurrent - numberBefore;
                                                        
                                                        if(mathPercent >= 0) {
                                                            //양수 일 때
                                                            
                                                            //countShow - 1 (index 0 제외한 숫자)와 양수의 마지막 index가 동일한지 체크
                                                            /!*if(countShow.length - 1 === index){
                                                                console.log(countShow.length - 1, index, positiveNumber);
                                                                pageNextDataPush();
                                                            }else {
                                                                console.log(countShow.length - 1, index);
                                                                event.preventDefault();
                                                                console.error("error");
                                                            }*!/
                                                        }else if(mathPercent <= -1){
                                                            //음수일 때, 다음 페이지로 X
                                                            event.preventDefault();
                                                            
                                                            alert("앞의 % 보다 숫자가 작을 수 없습니다")
                                                            console.log(mathPercent, index, "음수");
                                                        }
                                                    }
                                                });*/
                                            }else{
                                                console.warn("submit 3-4 X");
                                                event.preventDefault();
                                                console.error("error");
                                            }
                                        }else if(countShow.length > countShowAndSkill.length) {
                                            //skill:"blank"값이 1개라도 있을 때, 다음 페이지로 X
                                            
                                            console.warn("submit 2-2 X");
                                            event.preventDefault();
                                            alert("스킬을 빈 칸없이 모두 채워주세요");
                                        }else {
                                            event.preventDefault();
                                            console.error("error");
                                            console.warn("submit 2-3 X");
                                        }
                                    }else if(countShow < 2){
                                        event.preventDefault();
                                        //isShow 값이 2개 미만일 경우, 다음 페이지로 X
                                        alert("콤보 칸이 2개 이상 오픈 되어야 합니다");
                                        console.warn("submit 1-2 X");
                                    }else{
                                        event.preventDefault();
                                        console.error("error");
                                        console.warn("submit 1-3 X");
                                    }
                                }}>다음</button>
                                <button type="button" className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]" onClick={()=>{
                                    //1. isShow, isSelect all false로 변경 / 2. inputData 초기화
                                    inputData.map(function(element){
                                        //isSelect 값 초기화
                                        element.isSelect = false;
                                        
                                        //isShow 값 초기화
                                        element.isShow = false;
                                        inputData[0].isShow = true;
    
                                        //skill, percent  전부 처음 값으로 초기화
                                        element.skill = "blank";
                                        element.percent = "";
                                        return setInputData([...inputData]);
                                    });
                                }}>초기화</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="relative px-[10px] py-[10px] ml-[10px] bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                    <h5 className={`${countSelect >= 1 ? "visible" : "invisible"}`}>스킬 목록</h5>
                    <div className="h-[548px] overflow-y-auto
                        [&::-webkit-scrollbar]:bg-[#282828] [&::-webkit-scrollbar-track]:bg-[#010101]
                        [&::-webkit-scrollbar-thumb]:bg-[#282828] [&::-webkit-scrollbar-thumb]:border-[1px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#5d5d5d] [&::-webkit-scrollbar-thumb]:rounded-[3px]
                        [&::-webkit-scrollbar-button]:bg-[#282828] [&::-webkit-scrollbar-button]:border-[1px] [&::-webkit-scrollbar-button]:border-solid [&::-webkit-scrollbar-button]:border-[#5d5d5d] [&::-webkit-scrollbar-button]:rounded-[3px]
                    ">
                    {skill.map(function(element){
                        return (
                            <div className="flex cursor-pointer" onClick={()=>{
                                const countSelect = inputData.filter((element)=> element.isSelect === true).length;
                                
                                //inputData.isSelect true 갯수가 0개보다 클 때
                                if(countSelect > 0) {
                                    //isSelect value 중에 true 의 index 를 가져와, inputData[trueIndexSelect] 에 클릭한 skill.englishName 삽입
                                    inputData[trueIndexSelect].skill = element.englishName;
                                    setInputData([...inputData]);
                                }
                            }}>
                                <div
                                    className="w-[58px] h-[58px] relative bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">
                                    <img src={`/images/common/skill/${element.englishName}.jpg`} alt={element.name} className="w-[50px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                </div>
                                <p
                                    className="w-[150px] h-[58px] text-white text-[14px] font-Mabinogi text-center leading-[58px] bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">{element.name}
                                </p>
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
}