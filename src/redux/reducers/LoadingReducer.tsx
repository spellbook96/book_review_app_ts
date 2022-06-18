interface ILoadingAction {
  type: string;
  isLoading?: boolean;
}
export const LoadingReducer = (preState = {isLoading : true}, action:ILoadingAction) => {
  switch (action.type) {
    case "SET_LOADING":
      const newState = { ...preState };
      newState.isLoading = action.isLoading as boolean;
      return newState;
    }
}