import { Reducer, Action, combineReducers, ReducersMapObject } from "redux";

type ReducerMap = ReducersMapObject<any, Action>;

export interface ReducerManager {
  getReducerMap(): ReducerMap;
  reduce(state: { [key: string]: any }, action: Action): any;
  add(key: string, reducer: Reducer<any, Action>): void;
  remove(key: string): void;
}

export function createReducerManager(
  initialReducers: ReducerMap = {}
): ReducerManager {
  const reducers: ReducerMap = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);
  const keysToRemove = new Set<string>();

  return {
    getReducerMap: () => ({ ...reducers }),
    reduce(state, action) {
      if (keysToRemove.size > 0 && state) {
        state = { ...state };
        keysToRemove.forEach((k) => {
          delete (state as any)[k];
        });
        keysToRemove.clear();
      }
      return combinedReducer(state, action);
    },
    add(key, reducer) {
      if (!key || reducers[key]) return;
      reducers[key] = reducer;
      combinedReducer = combineReducers(reducers);
    },
    remove(key) {
      if (!key || !reducers[key]) return;
      delete reducers[key];
      keysToRemove.add(key);
      combinedReducer = combineReducers(reducers);
    },
  };
}

export const reducerManager = createReducerManager({})
