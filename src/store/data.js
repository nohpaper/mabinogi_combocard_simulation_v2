import { configureStore, createSlice } from '@reduxjs/toolkit'

let skill = createSlice({
   name:"skill",
   initialState:[
       {
           name:"다운 어택",
           englishName:"downAttack",
       },{
           name:"돌진",
           englishName:"assault",
       },{
           name:"디펜스",
           englishName:"defense",
       },{
           name:"랜스 차지",
           englishName:"lanceCharge",
       },{
           name:"레인지 컴뱃 마스터리",
           englishName:"rangedCombatMastery",
       },{
           name:"매그넘 샷",
           englishName:"magnumshot",
       },{
           name:"스매시",
           englishName:"smash",
       },{
           name:"윈드밀",
           englishName:"windMill",
       },{
           name:"카운터 어택",
           englishName:"counterAttack",
       },{
           name:"컴뱃 마스터리",
           englishName:"combatMastery",
       },{
           name:"크래시 샷",
           englishName:"crashShot",
       },{
           name:"라이트닝로드",
           englishName:"lightningRoad",
       },{
           name:"라이트닝볼트",
           englishName:"lightningbolt",
       },{
           name:"썬더",
           englishName:"thunder",
       },{
           name:"아이스 스피어",
           englishName:"iceSpear",
       },{
           name:"아이스볼트",
           englishName:"iceBolt",
       },{
           name:"파이어볼",
           englishName:"fireball",
       },{
           name:"파이어볼트",
           englishName:"firebolt",
       },{
           name:"힐링",
           englishName:"",
       },{
           name:"샌드 버스트",
           englishName:"sandBurst",
       },{
           name:"워터 캐논",
           englishName:"waterCannon",
       },{
           name:"플레이머",
           englishName:"flame",
       },{
           name:"연속기: 대쉬 펀치",
           englishName:"dashpunch",
       },{
           name:"연속기: 스크류 어퍼",
           englishName:"screwupper",
       },{
           name:"연속기: 파운딩",
           englishName:"pounding",
       },{
           name:"4막: 질투의 화신",
           englishName:"marionetteWindmill",
       },{
           name:"6막: 유혹의 올가미",
           englishName:"marionetteSpiral",
       },{
           name:"슈팅 러쉬",
           englishName:"shootingRush",
       },{
           name:"크로스 버스터",
           englishName:"crossBuster",
       },{
           name:"수리검 돌진",
           englishName:"shurikenCharging",
       },{
           name:"수리검 폭풍",
           englishName:"shurikenStorm",
       },{
           name:"데스 마커",
           englishName:"deathMarker",
       },{
           name:"스피닝 슬래시",
           englishName:"chainSpinningSlash",
       },/*{
           name:"",
           englishName:"",
       },*/
   ]
});
let comboData = createSlice({
    name: "comboData",
    initialState:{
        items:[
            {
                id:0,
                skill:"blank",
                percent:0,
            }
        ],
        nextId:0,
    },
});

export default configureStore({
    reducer: {
        skill: skill.reducer,
        combo: comboData.reducer,
    },
});