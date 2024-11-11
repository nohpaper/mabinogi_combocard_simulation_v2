import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {deleteData} from "../store/data";


export default function Custom(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const combo = useSelector((state)=> state.combo.items );
    const skill = useSelector((state)=> state.skill );
    const [isHelp, setIsHelp] = useState(false);
    const [allCoin, setAllCoin] = useState(0);
    const [customData, setCustomData] = useState([]);
    
    const countSelect = customData.filter((element)=> element.isSelect === true).length;
    const trueIndexSelect = customData.findIndex((element)=> element.isSelect === true);
    
    const selectActive = (index) => {
        
        if(countSelect <= 2){
            customData.map(function(child, subIndex){
                if(index !== subIndex){
                    child.isSelect = false;
                    setCustomData([...customData]);
                }
                return [...customData]
            });
        }
        
        customData[index].isSelect = !customData[index].isSelect;
        setCustomData([...customData]);
    }
    
    useEffect(() => {
        combo.map(function(element, index){
            if(element.percent === undefined || element.percent === ""){
                setCustomData((prev)=> ([...prev, {skill:element.skill, percent:0, purePercent:0, useCoin:0, isSelect:false,}]));
            } else {
                setCustomData((prev)=> ([...prev, {skill:element.skill, percent:element.percent, purePercent:element.percent - Number(combo[index - 1].percent), useCoin:0, isSelect:false,}]));
            }
        });
    }, []);
    customData.splice(combo.length, customData.length - combo.length);//????
    
    return (
        <div>
            <div>
                {/*title*/}
                <h1 className="
                    pt-20pxr pb-5pxr text-center text-32pxr font-bold
                    desktop:text-20pxr
                ">콤보카드 커스텀마이징</h1>
                <p className="text-center text-red-500">새로 고침이나 현재 창을 벗어날 시 입력한 데이터가 날아가니 주의해주세요</p>
            </div>
            <div className="
                pt-30pxr flex justify-center
                desktop:pt-16pxr
            ">
                <div className={`
                    w-500pxr h-600pxr shrink-0 px-30pxr mr-10pxr bg-gray-200 duration-300 ease-in
                    laptop:absolute laptop:z-[90]
                    ${isHelp ? "laptop:left-[50%] laptop:-translate-x-1/2" : "laptop:left-0 laptop:-translate-x-[100%]"}
                    tablet:w-[100%]
                `}>
                    {/* 도움말 */}
                    <div className="relative font-bold">
                        <h5 className="pt-15pxr pb-10pxr">도움말</h5>
                        <button type="button"
                                className="w-30pxr h-25pxr absolute top-0 right-0 pt-10pxr pb-15pxr text-[#999999] font-light text-32pxr leading-[0] box-content hidden
                                laptop:block" onClick={() => {setIsHelp(false)}}>x
                        </button>
                    </div>
                    <div className="text-14pxr pt-20pxr border-t-[1px] border-t-solid border-t-[#979797]">
                        {/* 도움말 content box*/}
                        <p>1. 스킬과 퍼센트를 <b>변경할 콤보 칸을 클릭</b>하고, 오른쪽에서 변경할 스킬을 클릭(동일한 스킬로 변경 가능)</p>
                        <p>2. 변경한 칸 동그라미 안의 숫자와 아래 표 속 <u>최고치가 최대한 근접할 때까지 변경</u></p>
                        <div className="flex justify-center pt-10pxr">
                            <table className="border-[1px] border-solid border-[#979797]">
                                <caption className="hidden">랜덤 돌렸을 때 얻을 수 있는 구간별 확률표</caption>
                                <thead>
                                <tr>
                                    <th className="bg-gray-300"></th>
                                    <th className="px-30pxr py-3pxr border-l-[1px] border-l-solid border-l-[#979797] font-medium bg-gray-300">퍼센트</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border-t-[1px] border-t-solid border-t-[#979797]">
                                    <th className="px-10pxr py-3pxr bg-gray-300 font-medium">1 → 2</th>
                                    <td className="border-l-[1px] border-l-solid border-l-[#979797] font-bold text-center">0
                                        ~ 10%
                                    </td>
                                </tr>
                                <tr className="border-t-[1px] border-t-solid border-t-[#979797]">
                                    <th className="px-10pxr py-3pxr bg-gray-300 font-medium">2 → 3</th>
                                    <td className="border-l-[1px] border-l-solid border-l-[#979797] font-bold text-center">0
                                        ~ 12%
                                    </td>
                                </tr>
                                <tr className="border-t-[1px] border-t-solid border-t-[#979797]">
                                    <th className="px-10pxr py-3pxr bg-gray-300 font-medium">3 → 4</th>
                                    <td className="border-l-[1px] border-l-solid border-l-[#979797] font-bold text-center">0
                                        ~ 15%
                                    </td>
                                </tr>
                                <tr className="border-t-[1px] border-t-solid border-t-[#979797]">
                                    <th className="px-10pxr py-3pxr bg-gray-300 font-medium">4 → 5</th>
                                    <td className="border-l-[1px] border-l-solid border-l-[#979797] font-bold text-center">0
                                        ~ 20%
                                    </td>
                                </tr>
                                <tr className="border-t-[1px] border-t-solid border-t-[#979797]">
                                    <th className="px-10pxr py-3pxr bg-gray-300 font-medium">5 → 6</th>
                                    <td className="border-l-[1px] border-l-solid border-l-[#979797] font-bold text-center">0
                                        ~ 30%
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <img src={`${process.env.PUBLIC_URL}/images/step2/percent_img.jpg`}
                                 alt="왼쪽 표와 대조에서 볼 수 있는 비교 이미지" className="h-250pxr ml-10pxr"/>
                        </div>
                    </div>
                </div>
                <div>
                    {/* 콤보 카드 입력 창 */}
                    <h5 className="
                        w-404pxr pl-56pxr text-white text-14pxr leading-53pxr font-Mabinogi bg-[url('/public/images/common/bg_top.png')] bg-[length:100%_100%]
                        desktop:leading-40pxr
                    ">콤보 카드 입력창</h5>
                    <div
                        className="w-400pxr relative pt-10pxr pb-20pxr m-auto bg-no-repeat bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                        {/* 콤보 카드 내부 */}
                        <form action="">
                            <div
                                className="w-351pxr h-468pxr relative pt-140pxr px-25pxr pb-44pxr m-auto bg-no-repeat bg-[length:100%_100%] bg-[url('/public/images/common/combocard_bg.jpg')]">
                                <div>
                                    {
                                        customData.map(function (element, index) {
                                            if (index === 1 || index === 3 || index === 5) {
                                                return (
                                                    <div
                                                        className="h-58pxr relative flex flex-row-reverse items-center -mt-20pxr">
                                                        <div className="
                                                                    h-[100%] flex flex-row-reverse relative
                                                                    before:w-61pxr before:h-29pxr before:absolute before:-top-10pxr before:-left-60pxr before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_left.png')]
                                                        ">
                                                            <div className="
                                                                            w-68pxr h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                            before:content-['+'] before:absolute before:top-[50%] before:left-10pxr before:-translate-y-1/2
                                                                            after:content-['%'] after:absolute after:top-[50%] after:right-10pxr after:-translate-y-1/2
                                                                        ">
                                                                <p className={`w-28pxr h-[100%] absolute inset-1/2 py-17pxr font-Mabinogi -translate-x-1/2 -translate-y-1/2 ${element.percent === 0 ? "text-[#9ca3af]" : "text-[#ffff5c]"}`}>{element.percent === 0 ? "00" : element.percent}</p>
                                                                <div
                                                                    className={`flex absolute right-0 -bottom-15pxr px-10pxr pt-5pxr pb-1pxr text-14pxr text-white rounded-20pxr border-[1px] border-solid border-[#575757] bg-[#2b2b2b] ${element.isSelect >= 1 ? "visible" : "invisible"}`}>
                                                                    <img
                                                                        src={`${process.env.PUBLIC_URL}/images/step2/icon_coin.png`}
                                                                        alt="코인 사용량"
                                                                        className="w-16pxr h-16pxr mr-3pxr"/>
                                                                    {element.useCoin}
                                                                </div>
                                                                <span
                                                                    className={`w-44pxr block absolute -top-10pxr -left-106pxr px-3pxr pt-5pxr text-13pxr text-white border-2 border-solid border-[#e3e1e1] bg-black ${element.isSelect >= 1 ? "visible" : "invisible"}`}>+ {element.purePercent}</span>
                                                            </div>
                                                            <button type="button"
                                                                    className={`
                                                                                w-58pxr h-58pxr relative text-0
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                    onClick={() => {
                                                                        selectActive(index);
                                                                    }}
                                                            ><img
                                                                src={`${process.env.PUBLIC_URL}/images/common/skill/${element.skill}.jpg`}
                                                                alt={element.skill}
                                                                className="w-51pxr h-51pxr absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (index === 2 || index === 4) {
                                                return (
                                                    <div className="h-58pxr relative flex items-center -mt-20pxr">
                                                        <div className="
                                                                    h-[100%] flex relative
                                                                    before:w-61pxr before:h-29pxr before:absolute before:-top-10pxr before:-right-60pxr before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_right.png')]
                                                                ">
                                                            <div className="
                                                                            w-68pxr h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                            before:content-['+'] before:absolute before:top-[50%] before:left-10pxr before:-translate-y-1/2
                                                                            after:content-['%'] after:absolute after:top-[50%] after:right-10pxr after:-translate-y-1/2
                                                                        ">
                                                                <p className={`w-28pxr h-[100%] absolute inset-1/2 py-17pxr font-Mabinogi -translate-x-1/2 -translate-y-1/2 ${element.percent === 0 ? "text-[#9ca3af]" : "text-[#ffff5c]"}`}>{element.percent === 0 ? "00" : element.percent}</p>
                                                                <div
                                                                    className={`flex absolute left-0 -bottom-15pxr px-10pxr pt-5pxr pb-1pxr text-14pxr text-white rounded-20pxr border-[1px] border-solid border-[#575757] bg-[#2b2b2b] ${element.isSelect >= 1 ? "visible" : "invisible"}`}>
                                                                    <img
                                                                        src={`${process.env.PUBLIC_URL}/images/step2/icon_coin.png`}
                                                                        alt="코인 사용량"
                                                                        className="w-16pxr h-16pxr mr-3pxr"/>
                                                                    {element.useCoin}
                                                                </div>
                                                                <span
                                                                    className={`w-44pxr block absolute -top-10pxr left-130pxr px-3pxr pt-5pxr text-13pxr text-white border-2 border-solid border-[#e3e1e1] bg-black ${element.isSelect >= 1 ? "visible" : "invisible"}`}>+ {element.purePercent}</span>
                                                            </div>
                                                            <button type="button"
                                                                    className={`
                                                                                w-58pxr h-58pxr relative text-0
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                    onClick={() => {
                                                                        selectActive(index);
                                                                    }}
                                                            ><img
                                                                src={`${process.env.PUBLIC_URL}/images/common/skill/${element.skill}.jpg`}
                                                                alt={element.skill}
                                                                className="w-51pxr h-51pxr absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (index === 0) {
                                                return (
                                                    <div className="flex -mt-20pxr">
                                                        <div className="w-68pxr h-58pxr relative font-Mabinogi">
                                                            <div
                                                                className={`flex absolute left-0 -bottom-15pxr px-10pxr pt-5pxr pb-1pxr text-14pxr text-white rounded-20pxr border-[1px] border-solid border-[#575757] bg-[#2b2b2b] ${element.isSelect >= 1 ? "visible" : "invisible"}`}>
                                                                <img
                                                                    src={`${process.env.PUBLIC_URL}/images/step2/icon_coin.png`}
                                                                    alt="코인 사용량"
                                                                    className="w-16pxr h-16pxr mr-3pxr"/>
                                                                {element.useCoin}
                                                            </div>
                                                        </div>
                                                        <button type="button"
                                                                className={`
                                                                    w-58pxr h-58pxr relative text-0
                                                                    before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                    after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                `}
                                                                onClick={() => {
                                                                    selectActive(index);
                                                                }}
                                                        ><img
                                                            src={`${process.env.PUBLIC_URL}/images/common/skill/${element.skill}.jpg`}
                                                            alt={element.skill}
                                                            className="w-51pxr h-51pxr absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                        </button>
                                                    </div>
                                                )
                                            } else {
                                                return null;
                                            }
                                        })
                                    }
                                </div>
                                <div
                                    className={`
                                            flex absolute bottom-43pxr left-1/2 px-20pxr pt-8pxr pb-6pxr box-content text-white text-14pxr font-Mabinogi -translate-x-1/2
                                        `}
                                >총합 <img src={`${process.env.PUBLIC_URL}/images/step2/icon_coin.png`} alt="뱃지"
                                         className="w-16pxr h-16pxr ml-3pxr mr-10pxr"/> {allCoin === 0 ? "--" : allCoin}
                                </div>
                            </div>
                            <div className="flex justify-center gap-5pxr mt-10pxr">
                                <button type="button"
                                        className="px-20pxr pt-10pxr pb-8pxr text-white text-14pxr font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]"
                                        onClick={() => {
                                            setCustomData([]);
                                            combo.map(function (element, index) {
                                                if (element.percent === undefined || element.percent === "") {
                                                    setCustomData((prev) => ([...prev, {
                                                        skill: element.skill,
                                                        percent: 0,
                                                        purePercent: 0,
                                                        useCoin: 0,
                                                        isSelect: false,
                                                    }]));
                                                } else {
                                                    setCustomData((prev) => ([...prev, {
                                                        skill: element.skill,
                                                        percent: element.percent,
                                                        purePercent: element.percent - Number(combo[index - 1].percent),
                                                        useCoin: 0,
                                                        isSelect: false,
                                                    }]));
                                                }
                                            });
                                            customData.splice(combo.length, customData.length - combo.length);
                                            setAllCoin(0);
                                        }}>여기서 다시
                                </button>
                                <button type="button"
                                        className="px-20pxr pt-10pxr pb-8pxr text-white text-14pxr font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]"
                                        onClick={() => {
                                            navigate("/");
                                            customData.map((element) => dispatch(deleteData()));
                                        }}>처음부터
                                </button>
                            </div>
                        </form>
                        <div className="
                            w-35pxr h-30pxr absolute right-20pxr bottom-20pxr pt-5pxr text-white text-center border-[1px] border-solid border-black rounded-[100%] bg-[#262626] box-content hidden
                            laptop:block" onClick={() => {setIsHelp((prev) => !prev)}}>?
                        </div>
                    </div>
                </div>
                <div
                    className="relative ml-10pxr bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                    <h5 className="
                        pl-56pxr text-white text-14pxr leading-53pxr font-Mabinogi bg-[length:100%_100%] bg-[url('/public/images/common/bg_top_small.jpg')]
                        desktop:pl-0 desktop:leading-40pxr desktop:text-center desktop:rounded-5pxr desktop:overflow-hidden desktop:bg-cover desktop:bg-right
                    ">스킬 목록</h5>
                    <div className="h-548pxr overflow-y-auto px-10pxr
                        [&::-webkit-scrollbar]:bg-[#282828] [&::-webkit-scrollbar-track]:bg-[#010101]
                        [&::-webkit-scrollbar-thumb]:bg-[#282828] [&::-webkit-scrollbar-thumb]:border-[1px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#5d5d5d] [&::-webkit-scrollbar-thumb]:rounded-3pxr
                        [&::-webkit-scrollbar-button]:bg-[#282828] [&::-webkit-scrollbar-button]:border-[1px] [&::-webkit-scrollbar-button]:border-solid [&::-webkit-scrollbar-button]:border-[#5d5d5d] [&::-webkit-scrollbar-button]:rounded-3pxr
                        desktop:pr-5pxr
                    ">
                        {skill.map(function (element) {
                            return (
                                <div className="flex cursor-pointer" onClick={() => {
                                    //random percent 관련 변수
                                    const percentValue = [0, 10, 10, 12, 15, 20];
                                    const percentBreakLimitValue = [0, 0, 2, 3, 5, 10];
                                    const normalPercent = 90;
                                    const intervalProbability =  Math.floor((Math.random() * 99) + 1); //확률 값 0 ~ 100
                                    const mathPercent = [Math.floor((Math.random() * percentValue[trueIndexSelect]) + 1), Math.floor((Math.random() * percentValue[trueIndexSelect]) + 1) + Math.floor(Math.random() * percentBreakLimitValue[trueIndexSelect])];
                                    
                                    //inputData.isSelect true 갯수가 0개보다 클 때
                                    if (countSelect > 0) {
                                        //isSelect value 중에 true 의 index 를 가져와, inputData[trueIndexSelect] 에 클릭한 skill.englishName 삽입
                                        customData[trueIndexSelect].skill = element.englishName;

                                        if(trueIndexSelect !== 0){
                                            //select 한 index 가 0이 아니라면

                                            customData[trueIndexSelect].purePercent = intervalProbability < normalPercent ? mathPercent[0] : mathPercent[1];

                                            
                                            let total = 0;
                                            for (let index = 0; index < customData.length; index++) {
                                                if (index === 0){
                                                    // 0 번 째에 inputPercent 는 수정하지 않더라도 usingPercent 는 더해줘야 한다.
                                                    total = Number(customData[0].purePercent)
                                                    continue;
                                                }
                                                total += Number(customData[index].purePercent);

                                                if(customData[index].purePercent !== 0){
                                                    customData[index].percent = total;
                                                }
                                                
                                                
                                            }
                                        }
                                        setCustomData([...customData]);
                                    }
                                    
                                    //coin usage 관련 변수
                                    const skillName = customData.filter((element)=> element.skill === customData[trueIndexSelect].skill).length;
                                    const coinUsageOptions = [
                                        [3, 5, 7, 9, 11, 13], [8, 10, 12, 14, 16, 18],
                                        [13, 15, 17, 19, 21, 23], [18, 20, 22, 24, 26, 28],
                                        [23, 25, 27, 29, 31, 33], [28, 30, 32, 34, 36, 38]
                                    ];
                                    let coinUsage = [];
                                    let coinLength = 0;
                                    
                                    if(skillName >= 1 && skillName <= 6){
                                        coinUsage = coinUsageOptions[skillName - 1];
                                        customData[trueIndexSelect].useCoin += coinUsage[trueIndexSelect];
                                        coinLength = coinUsage[trueIndexSelect];
                                    }else {
                                        console.error("error");
                                    }
                                    
                                    setAllCoin((prev)=> prev + coinLength);
                                    setCustomData([...customData]);
                                }}>
                                    <div
                                        className="w-58pxr h-58pxr relative bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">
                                        <img src={`${process.env.PUBLIC_URL}/images/common/skill/${element.englishName}.jpg`} alt={element.name}
                                             className="w-50pxr absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                    <p
                                        className="
                                            w-150pxr h-58pxr text-white text-14pxr font-Mabinogi text-center leading-58pxr bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]
                                            desktop:hidden
                                        ">{element.name}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <p className={`
                        absolute top-[102%] right-0 px-10pxr pt-9pxr pb-5pxr border-[1px] border-solid border-[#6b855e] rounded-sm text-12pxr text-[#151811] font-Mabinogi bg-[#a6ce92] ${countSelect >= 1 ? "visible" : "invisible"}
                        before:absolute before:-top-12pxr before:right-19pxr before:border-12pxr before:border-t-[0] before:border-r-[0] before:border-solid before:border-transparent before:border-b-[#6b855e]
                        after:absolute after:-top-10pxr after:right-20pxr after:border-10pxr after:border-t-[0] after:border-r-[0] after:border-solid after:border-transparent after:border-b-[#a6ce92]
                        laptop:w-150pxr laptop:-top-60pxr laptop:before:opacity-0 laptop:after:opacity-0
                        tablet:w-250pxr tablet:top-[102%]
                        `}>스킬을 클릭하면 <br/>선택된 칸의 스킬과 %가 변경돼요!</p>
                </div>
            </div>
        </div>
    )
}