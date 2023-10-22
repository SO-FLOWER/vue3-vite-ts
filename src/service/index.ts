import SQRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const sqRequest = new SQRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	interceptors: {
		requestInterceptor: (config) => {
			return config
		},
		requestInterceptorCatch: (error) => {
			return error
		},
		responseInterceptor: (config) => {
			return config
		},
		responseInterceptorCatch: (error) => {
			return error
		}
	}
})

export default sqRequest
