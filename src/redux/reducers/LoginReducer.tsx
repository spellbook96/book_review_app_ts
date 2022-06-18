interface IAction {
  type: string;
  isLogin?:boolean;
  userID?:string;
}
export const LoginReducer = (preState ={isLogin : false, userID :""}, action:IAction) =>{
  switch (action.type) {
    case "SET_LOGIN":
      const newState = { ...preState };
      newState.isLogin = action.isLogin as boolean;
      newState.userID = action.userID as string;
      return newState;
    default:
      return preState;
  }
}