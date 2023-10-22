import axios from 'axios'
import type {
	AxiosResponse,
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig
} from 'axios'

interface SQRequestHook {
	requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
	requestInterceptorCatch?: (error: any) => any
	responseInterceptor?: (config: AxiosResponse) => AxiosResponse
	responseInterceptorCatch?: (error: any) => any
}

interface SQRequestConfig extends AxiosRequestConfig {
	interceptors?: SQRequestHook
}

class SQRequest {
	instance: AxiosInstance
	interceptors?: SQRequestHook

	constructor(config: SQRequestConfig) {
		this.instance = axios.create(config)
		this.interceptors = config.interceptors

		//单独实例的拦截器
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorCatch
		)
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorCatch
		)

		//所以实例都有的拦截器
		// this.instance.interceptors.request.use(
		// 	(config) => {
		// 		return config
		// 	},
		// 	(err) => {
		// 		return err
		// 	}
		// )
		// this.instance.interceptors.response.use(
		// 	(config) => {
		// 		return config
		// 	},
		// 	(err) => {
		// 		return err
		// 	}
		// )
	}
}

export default SQRequest
