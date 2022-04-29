
const initialState = {
    kittenList: []
};
const _reducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_KITTER":
            return state.kittenList = Object.assign({});

        case "KITTER_LIST":
            return state.kittenList = Object.assign(action.data);

        default:
            return state
    }
};
export default _reducer;