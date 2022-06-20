interface ICollapsedAction{
  type: string;
  isCollapsed?: boolean;
}
export const CollapsedReducer = (prevState={
  isCollapsed:false
},action: ICollapsedAction)=>{
      // console.log(action)
  let {type} =action

  switch(type){
      case "change":
          let newstate = {...prevState}
          newstate.isCollapsed = !newstate.isCollapsed
          return newstate
      default:
          return prevState
  }
}
export default CollapsedReducer;