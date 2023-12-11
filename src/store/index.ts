import { createStore } from 'vuex'

//单层数据类型的检测
interface IroomStats {
	name: string
	age: number
}
const store = createStore<IroomStats>({
	state() {
		return {
			name: 'Jason',
			age: 24
		}
	},
	mutations: {},
	getters: {},
	actions: {}
})

export default store
