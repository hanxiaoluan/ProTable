<script setup lang="ts">
// import { onMounted } from 'vue'
// import WebStorage from './utils/cache/index'
// // This starter template is using Vue 3 <script setup> SFCs
// // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

// import { localMemory } from './utils/cache/persistent'
// WebStorage.set('haha', {
// 	name: 'luanhanxiao'
// })
// console.log(WebStorage.get('haha'))
// localMemory.set('haha', {
// 	name: 'luaner'
// })
// console.log(localMemory)
// import { NMessageProvider, NNotificationProvider, NDialogProvider } from 'naive-ui'
// import { defineProps, provide, inject, computed, InjectionKey, Ref } from 'vue'
// import { useMessage } from 'naive-ui'
import Demo from './components/Form/Demo.vue'
</script>

<template>
	<!-- <NDialogProvider>
		<NMessageProvider>
			<NNotificationProvider> -->
	<!-- <MyConfig>
		<img alt="Vue logo" src="./assets/logo.png">
		<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
	</MyConfig> -->
	<!-- </NNotificationProvider>
		</NMessageProvider>
	</NDialogProvider> -->
	<Demo />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
