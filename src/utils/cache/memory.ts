export interface Cache<V = any> {
	value?: V;
	timeoutId?: ReturnType<typeof setTimeout>;
	time?: number;
	alive?: number;
}

const NOT_ALIVE = 0

export class Memory<T = any, V= any> {
	private cacheMap: {[key in keyof T]?: Cache<V>} = {}
	private alive: number;

	constructor(alive = NOT_ALIVE) {
		this.alive = alive * 1000
	}

	get getCache() {
		return this.cacheMap
	}

	setCache(cacheMap: any) {
		this.cacheMap = cacheMap
	}

	get<K extends keyof T>(key: K) {
		return this.cacheMap[key]
	}

	set<K extends keyof T>(key: K, value: V, expires?: number) {
		let item = this.get(key)

		if (!expires || (expires as number) <= 0) {
			expires = this.alive
		}

		if (item) {
			if (item.timeoutId) {
				clearTimeout(item.timeoutId)
				item.timeoutId = undefined
			}
			item.value = value
		} else {
			item = { value, alive: expires }
			this.cacheMap[key] = item
		}

		if (!expires) {
			return value
		}

		const now = new Date().getTime()
		item.time = now + this.alive
		item.timeoutId = setTimeout(
			() => {

			},
			expires > now ? expires - now : expires
		)

		return value
	}

	remove<K extends keyof T>(key: K) {
		const item = this.get(key)
		Reflect.deleteProperty(this.cacheMap, key)
		if (item) {
			clearTimeout(item.timeoutId)
			return item.value
		}
	}

	resetCache(cacheMap: {[K in keyof T]: Cache}) {
		Object.keys(cacheMap).forEach((key: any) => {
			const k = key as keyof T
			const item = cacheMap[k]
			if (item && item.time) {
				const now = new Date().getTime()
				const expire = item.time
				if (expire > now) {
					this.set(k, item.value, expire)
				}
			}
		})
	}

	clear() {
		Object.keys(this.cacheMap).forEach((key: any) => {
			const item = this.cacheMap[key as keyof T]
			item?.timeoutId && clearTimeout(item.timeoutId)
		})
		this.cacheMap = {}
	}

}
