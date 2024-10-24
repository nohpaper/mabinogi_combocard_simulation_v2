import {useSelector} from "react-redux";
import {useEffect, useState} from "react";


export default function Custom(){
    const combo = useSelector((state)=> state.combo.items );
    const skill = useSelector((state)=> state.skill );
    const [aaa, setAaa] = useState(false);
    
    const [customData, setCustomData] = useState([]);
    
    
    return (
        <div>
            <div>
                {/*title*/}
                <h1 className="pt-[20px] pb-[5px] text-center text-[32px] font-bold">콤보카드 커스텀마이징</h1>
                <p className="text-center">새로 고침이나 현재 창을 벗어날 시 입력한 데이터가 날아가니 주의해주세요</p>
            </div>
            <div className="pt-[30px] flex justify-center">
                <div className="w-[100px] h-[100px] mr-[10px] bg-gray-200">
                    {/* 도움말 */}
                    <h5>도움말</h5>
                </div>
                <div>
                    {/* 콤보 카드 입력 창 */}
                    <h5 className="w-[488px] pl-[56px] text-white text-[14px] leading-[53px] font-Mabinogi bg-[url('/public/images/common/bg_top.png')]">콤보
                        카드 입력창</h5>
                    <div
                        className="w-[484px] pt-[10px] pb-[20px] m-auto bg-no-repeat bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                        {/* 콤보 카드 내부 */}
                        <form action="">
                            <div
                                className="w-[351px] min-h-[468px] relative pt-[140px] px-[25px] pb-[44px] m-auto bg-no-repeat bg-[url('/public/images/common/combocard_bg.jpg')]">
                                <div>
                                    {
                                        combo.map(function (element, index) {
                                            if (index === 1 || index === 3 || index === 5) {
                                                return (
                                                    <div
                                                        className="h-[58px] relative flex flex-row-reverse items-center mt-[-20px]">
                                                        <div className="
                                                                    h-[100%] flex flex-row-reverse relative
                                                                    before:w-[61px] before:h-[29px] before:absolute before:top-[-10px] before:left-[-60px] before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_left.png')]
                                                                ">
                                                            <div className="
                                                                            w-[68px] h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                            before:content-['+'] before:absolute before:top-[50%] before:left-[10px] before:-translate-y-1/2
                                                                            after:content-['%'] after:absolute after:top-[50%] after:right-[10px] after:-translate-y-1/2
                                                                        ">
                                                                <input type="number" maxLength="2" min="0"
                                                                       max="100"
                                                                    /*value={inputData[index].percent}*/
                                                                       placeholder="00" className="
                                                                            w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                            " onChange={(event) => {
                                                                    // percentInput(index, event);
                                                                }}/>
                                                            </div>
                                                            <button type="button"
                                                                    className={`
                                                                                w-[58px] h-[58px] relative text-[0px]
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                /*onClick={() => {
                                                                    selectActive(index);
                                                                }}*/
                                                            ><img
                                                                src={`/images/common/skill/${element.skill}.jpg`}
                                                                alt={element.skill}
                                                                className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            } else if (index === 2 || index === 4) {
                                                return (
                                                    <div className="h-[58px] relative flex items-center mt-[-20px]">
                                                        <div className="
                                                                    h-[100%] flex relative
                                                                    before:w-[61px] before:h-[29px] before:absolute before:top-[-10px] before:right-[-60px] before:bg-[length:100%_100%] before:bg-[url('/public/images/common/arrow_right.png')]
                                                                ">
                                                            <div className="
                                                                            w-[68px] h-[100%] relative bg-black font-Mabinogi text-[#ffff5c]
                                                                            before:content-['+'] before:absolute before:top-[50%] before:left-[10px] before:-translate-y-1/2
                                                                            after:content-['%'] after:absolute after:top-[50%] after:right-[10px] after:-translate-y-1/2
                                                                        ">
                                                                <input type="number" maxLength="2" min="0"
                                                                       max="100"
                                                                    /*value={inputData[index].percent}*/
                                                                       placeholder="00" className="
                                                                            w-[28px] h-[100%] absolute inset-1/2 text-[#ffff5c] font-Mabinogi -translate-x-1/2 -translate-y-1/2 focus:outline-0 bg-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                                                                            " onChange={(event) => {
                                                                    /*percentInput(index, event);*/
                                                                }}/>
                                                            </div>
                                                            <button type="button"
                                                                    className={`
                                                                                w-[58px] h-[58px] relative text-[0px]
                                                                                before:w-[100%] before:h-[100%] before:absolute before:inset-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:z-[2] before:bg-[url('/public/images/common/skill_line.png')]
                                                                                after:w-[115%] after:h-[115%] after:absolute after:inset-1/2 after:rounded-sm after:-translate-x-1/2 after:-translate-y-1/2 after:bg-white ${element.isSelect ? "after:animate-blink" : "after:opacity-0"}
                                                                            `}
                                                                /*onClick={() => {
                                                                    selectActive(index);
                                                                }}*/
                                                            ><img
                                                                src={`/images/common/skill/${element.skill}.jpg`}
                                                                alt={element.skill}
                                                                className="w-[51px] h-[51px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 z-10"/>
                                                            </button>
                                                        </div>
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
                                                            /*onClick={() => {
                                                                selectActive(index);
                                                            }}*/
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
                                            min-w-[145px] absolute bottom-[43px] left-1/2 px-[20px] pt-[8px] pb-[6px] box-content text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg_long.png')] -translate-x-1/2
                                        `}
                                >선택한 칸부터 끝까지 제거
                                </button>
                            </div>
                            <div className="flex justify-center gap-[5px] mt-[10px]">
                                <button type="submit"
                                        className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]"
                                >다음
                                </button>
                                <button type="button"
                                        className="px-[20px] pt-[10px] pb-[8px] text-white text-[14px] font-Mabinogi bg-[length:100%_100%] bg-no-repeat bg-[url('/public/images/common/btn_bg.png')]"
                                        onClick={() => {
                                            window.location.replace("/");
                                        }}>초기화
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div
                    className="relative px-[10px] py-[10px] ml-[10px] bg-[length:100%_100%] bg-[url('/public/images/common/bg_content.jpg')]">
                    {/*<h5 className={`${countSelect >= 1 ? "visible" : "invisible"}`}>스킬 목록</h5>*/}
                    <div className="h-[548px] overflow-y-auto
                        [&::-webkit-scrollbar]:bg-[#282828] [&::-webkit-scrollbar-track]:bg-[#010101]
                        [&::-webkit-scrollbar-thumb]:bg-[#282828] [&::-webkit-scrollbar-thumb]:border-[1px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-[#5d5d5d] [&::-webkit-scrollbar-thumb]:rounded-[3px]
                        [&::-webkit-scrollbar-button]:bg-[#282828] [&::-webkit-scrollbar-button]:border-[1px] [&::-webkit-scrollbar-button]:border-solid [&::-webkit-scrollbar-button]:border-[#5d5d5d] [&::-webkit-scrollbar-button]:rounded-[3px]
                    ">
                        {skill.map(function (element) {
                            return (
                                <div className="flex cursor-pointer" onClick={() => {
                                    /*const countSelect = inputData.filter((element) => element.isSelect === true).length;
                                    
                                    //inputData.isSelect true 갯수가 0개보다 클 때
                                    if (countSelect > 0) {
                                        //isSelect value 중에 true 의 index 를 가져와, inputData[trueIndexSelect] 에 클릭한 skill.englishName 삽입
                                        inputData[trueIndexSelect].skill = element.englishName;
                                        setInputData([...inputData]);
                                    }*/
                                }}>
                                    <div
                                        className="w-[58px] h-[58px] relative bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">
                                        <img src={`/images/common/skill/${element.englishName}.jpg`} alt={element.name}
                                             className="w-[50px] absolute inset-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                    </div>
                                    <p
                                        className="w-[150px] h-[58px] text-white text-[14px] font-Mabinogi text-center leading-[58px] bg-[length:100%_100%] bg-[url('/public/images/common/skill_line.png')]">{element.name}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <p className={`
                        absolute top-[102%] right-0 px-[10px] pt-[9px] pb-[5px] border-[1px] border-solid border-[#6b855e] rounded-sm text-[12px] text-[#151811] font-Mabinogi bg-[#a6ce92]
                        before:absolute before:top-[-12px] before:right-[19px] before:border-[12px] before:border-t-[0] before:border-r-[0] before:border-solid before:border-transparent before:border-b-[#6b855e]
                        after:absolute after:top-[-10px] after:right-[20px] after:border-[10px] after:border-t-[0] after:border-r-[0] after:border-solid after:border-transparent after:border-b-[#a6ce92]
                        `}>여기에서 선택해요!</p>
                </div>
            </div>
        </div>
    )
}