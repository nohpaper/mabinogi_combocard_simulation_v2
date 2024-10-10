import { configureStore, createSlice } from '@reduxjs/toolkit'

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