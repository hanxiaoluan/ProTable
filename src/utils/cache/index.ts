import pkg from '../../../package.json'
import { createStorage as create, CreateStorageParams } from './storageCache'

export type Options = Partial<CreateStorageParams>

export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

function getStorageShortName(): string {
	return `my_vue_app__${pkg.version}__`.toUpperCase()
}

function isDevMode() {
	return import.meta.env.DEV
}
const createOptions = (storage: Storage, options: Options = {}): Options => {
	return {
		hasEncrypt: isDevMode(),
		storage,
		prefixKey: getStorageShortName(),
		...options
	}
}

export const WebStorage = create(createOptions(sessionStorage))

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
	return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
	return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
	return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export default WebStorage
