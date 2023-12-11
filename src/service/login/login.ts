import sqRequest from '../index'
import { IDataType, IChildType } from './type'

enum LoginApi {
	AccountLogin = '/login'
}

export function accountLoginRequest(account: any) {
	//<IDataType<IChildType>> 对返回数据的类型进行检测,进行多层检测
	return sqRequest.post<IDataType<IChildType>>({
		url: LoginApi.AccountLogin,
		data: account
	})
}
