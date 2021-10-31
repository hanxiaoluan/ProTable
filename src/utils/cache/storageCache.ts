import type { EncryptionParams } from '../cipher'
import { AesEncryption } from '../cipher'

const cacheCipher = {
	key: '_11111000001111@',
	iv: '@11111000001111_'
}

export interface CreateStorageParams extends EncryptionParams {
	prefixKey: string;
	storage: Storage;
	hasEncrypt: boolean;
	timeout?: number | null;
}

export const createStorage = ({
	prefixKey = '',
	storage = sessionStorage,
	key = cacheCipher.key,
	iv = cacheCipher.iv,
	hasEncrypt = true,
	timeout = null
}: Partial<CreateStorageParams> = {}) => {

	if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
		throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!')
	}

	const encryption = new AesEncryption({ key, iv })

	/**
     * Cache class
     * Construction parameters can be passed into sessionStorage,localStorage
     * @class Cache
     * @example
     */
	const WebStorage = class WebStorage {
		private storage: Storage
		private prefixKey: string
		private encryption: AesEncryption
		private hasEncrypt: boolean

		/**
         * @param {*} storage
         */
		constructor() {
			this.storage = storage
			this.prefixKey = prefixKey
			this.encryption = encryption
			this.hasEncrypt = hasEncrypt
		}
		private getKey(key: string) {
			return `${this.prefixKey}${key}`.toUpperCase()
		}

		/**
         *  Set cache
         * @param {string} key
         * @param {*} value
         * @expire Expiration time in seconds
         * @memberof Cache
         */
		set(key: string, value: any, expire: number|null = timeout) {
			const stringData = JSON.stringify({
				value,
				time: Date.now(),
				expire: expire ? new Date().getTime() + expire * 1000 : null
			})
			console.log(stringData)
			const stringValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData
			this.storage.setItem(this.getKey(key), stringValue)
		}

		/**
         *
         * @param {string} key
         * @memberof Cache
         */
		get(key: string, def: any = null) {
			const val = this.storage.getItem(this.getKey(key))
			console.log(val)
			if (!val) return def

			try {
				const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val
				const data = JSON.parse(decVal)
				console.log(data)
				const { value, expire } = data
				if (!expire || expire >= new Date().getTime()) {
					return value
				} else {
					this.remove(key)
				}
			} catch (error) {
				console.error(error)
				return def
			}
		}

		/**
         * Delete cache based on key
         * @param {string } key
         * @memberof Cache
         */
		remove(key: string) {
			this.storage.removeItem(this.getKey(key))
		}

		clear(): void {
			this.storage.clear()
		}
	}

	return new WebStorage()

}
