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
	request<T>(config: SQRequestConfig): Promise<T> {
		return new Promise((resolve, reject) => {
			this.instance
				.request<any, T>(config)
				.then((res) => {
					if (config.interceptors?.requestInterceptor) {
						// res = config.interceptors.requestInterceptor(res)
						resolve(res)
					}
				})
				.catch((err) => {
					reject(err)
				})
		})
	}
	get<T>(config: SQRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}
	post<T>(config: SQRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}
	delete<T>(config: SQRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}
	patch<T>(config: SQRequestConfig): Promise<T> {
		return this.request<T>({ ...config, method: 'PATCH' })
	}
}

export default SQRequest
