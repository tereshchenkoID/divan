import { createStore, combineReducers } from "redux";
import cartReducer from "./reducers/cartReducer";
import aboutReducer from "./reducers/aboutReducer";

const allReducer = combineReducers({
    cards: cartReducer,
    about: aboutReducer
});


const store = createStore(allReducer)

export default store;
