import { useMessage as Message, useNotification as Notification, useDialog as Dialog } from 'naive-ui'
import type { MessageApi } from 'naive-ui'

// export interface BasicOptions {
//     in
// }
/**
 * @description:message
 */
let message: MessageApi|null = null

export function useMessage() {
	if (!message) {
		message = Message()
	}

	const notification = Notification()
	const dialog = Dialog()
	return {
		message,
		notification,
		dialog
	}
}

