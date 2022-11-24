import {createReducer, on} from '@ngrx/store';
import {setUser, unsetUser} from './auth.actions';
import {UsuarioModel} from "../models/usuario.model";

export interface State {
  user: UsuarioModel | undefined
}

export const initialState: State = {
  user: undefined
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, {user}) => ({...state, user: {...user}})),
  on(unsetUser, (state) => ({...state, user: undefined}))
)
