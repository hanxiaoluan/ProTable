const warnedMessages = new Set()

export function warnOnce(location: string, message: string): void {
	const mergedMessage = `[ProTable/${location}]:${message}`
	if (warnedMessages.has(mergedMessage)) return

	warnedMessages.add(mergedMessage)
	console.error(mergedMessage)
}

export function error(location: string, message: string): void {
	throw new Error(`[ProTable/${location}]:${message}`)
}
