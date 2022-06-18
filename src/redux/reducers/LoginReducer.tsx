interface IAction {
  type: string;
  isLogin?:boolean;
  userName?:string;
  email?:string;
  password?:string;
}
export const LoginReducer = (preState ={isLogin : false, userName :"", email:"",password:''}, action:IAction) =>{
  switch (action.type) {
    case "SET_LOGIN":
      const newState = { ...preState };
      newState.isLogin = action.isLogin as boolean;
      newState.userName = action.userName as string;
      newState.email = action.email as string;
      newState.password = action.password as string;
      return newState;
    default:
      return preState;
  }
}