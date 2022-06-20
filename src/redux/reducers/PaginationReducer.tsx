interface IPageAction {
  type: string;
  currPage?: number;
}

  export const PaginationReducer = (preState={currPage: 0},action:IPageAction) => {
    switch (action.type) {
      case "SET_PAGE":
        const newState = { ...preState };
        newState.currPage = action.currPage as number;
        return newState;
      default:
        return preState;
    }
  }
