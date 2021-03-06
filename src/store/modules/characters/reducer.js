import produce from 'immer';

const INITIAL_STATE = {
    authorized: false,
    auth: null,
    loading: false,
    characters: null,
    offset: 5,
};

export default function characters(state = INITIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@characters/REQUEST': {
                draft.loading = true;
                break;
            }
            case '@characters/SUCCESS_REQUEST': {
                let data = {};

                if (state.characters) {
                    data = {
                        ...action.payload.data,
                        results: [
                            ...state.characters.results,
                            ...action.payload.data.results,
                        ],
                    };
                } else {
                    data = action.payload.data;
                }

                draft.authorized = true;
                draft.auth = action.payload.auth;
                draft.characters = data;
                draft.offset = action.payload.offset;
                draft.loading = false;
                break;
            }
            case '@characters/FAILURE_REQUEST': {
                draft.loading = false;
                break;
            }
            case '@characters/SIGN_OUT': {
                draft.loading = false;
                draft.authorized = false;
                draft.auth = null;
                draft.characters = null;
                draft.offset = null;
                break;
            }
            default:
        }
    });
}
