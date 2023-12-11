//多层数据类型的检测
export interface IChildType {
	id: number
	name: string
	token: string
}

export interface IDataType<T = any> {
	//传入一个T泛型的数据类型，自行定义内部data的数据类型
	code: number
	date: T
}
