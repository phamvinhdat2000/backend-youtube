import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userDetail:{
  user_id:"",
  full_name:"",
  email:"",
  avatar:"",
  role:""
},isLogin:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUserDetail: (state,action) => {
      state.userDetail=action.payload;
    },
    changeStatusLogin:(state,action) =>{
      state.isLogin=action.payload
    }
  },
})


export const { createUserDetail,changeStatusLogin} = userSlice.actions

export default userSlice.reducer