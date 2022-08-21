import { Action, ActionCreator, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

const GET_CPU_LIST_REQUEST = "GET_CPU_LIST_REQUEST"
/*
export enum rawDataActionType {
  GET_CPU_LIST_REQUEST
}

export const getCPUDataList: ActionCreator<
  ThunkAction<Promise<Action>, IState, void>
> = () => {
  return async (dispatch: Dispatch<IState>): Promise<Action> => {
    try {
      const text = await Api.call()
      return dispatch({
        type: SET_TEXT,
        text,
      })
    } catch (e) {}
  }
}
*/