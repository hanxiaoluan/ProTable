import { Memory } from './memory'
import { DEFAULT_CACHE_TIME, createLocalStorage, createSessionStorage } from './index'

// base global local key
export const APP_LOCAL_CACHE_KEY = 'LUAN__LOCAL__KEY__'

// base global session key
export const APP_SESSION_CACHE_KEY = 'LUAN__SESSION__KEY__'

const ls = createLocalStorage()
const ss = createSessionStorage()
export const localMemory = new Memory(DEFAULT_CACHE_TIME)
const sessionMemory = new Memory(DEFAULT_CACHE_TIME)

function initPersistentMemory() {
	const localCache = ls.get(APP_LOCAL_CACHE_KEY)
	const sessionCache = ss.get(APP_SESSION_CACHE_KEY)
	localCache && localMemory.resetCache(localCache)
	sessionCache && sessionMemory.resetCache(sessionCache)
}

export class Persistent {
	// static getLocal<T>(key: LocalKeys) {
	// 	return localMemory.get(key)?.value
	// }
}

initPersistentMemory()
