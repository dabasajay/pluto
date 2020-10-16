import {
	SET_USER,
	RESET_USER,
} from './types';
import jwt_decode from 'jwt-decode';
import { notification } from 'antd';
import API from '../api';
import setAuthToken from '../utils/setAuthToken';
import { Dispatch } from 'redux';

export async function login (data: any = {}, dispatch: Dispatch) {
	const res = await API.auth.post(data);
	if (res.message == null) {
		const { accessToken } = res;
		const { id, username } = jwt_decode(accessToken);
		localStorage.setItem('accessToken', accessToken);
		setAuthToken(accessToken);
		dispatch({
			type: SET_USER,
			payload: {
				isAuthenticated: true,
				id,
				username,
			}
		});
	} else {
		notification.open({
			message: 'Error',
			description: res.message,
		});
	}
};

export function logout () {
	localStorage.removeItem('accessToken');
	setAuthToken(null);
	return {
    type: RESET_USER,
    payload: {},
  };
};