import { provide, inject, reactive } from 'vue'
import { isObject } from 'lodash'
import type { InjectionKey } from 'vue'

export interface FormContextProps {
	resetAction: ()=> Promise<void>;
	submitAction: ()=> Promise<void>;
}
type Context = Record<string, any>

const contextKey: InjectionKey<Context> = Symbol('tableFormContextKey')

export function createContext(context: Context) {

	if (!isObject(context)) throw Error('请传入一个对象')
	const state = reactive(context)

	provide(contextKey, state)
	return state
}

export function useContext(): Context {
	return inject(contextKey)!
}

