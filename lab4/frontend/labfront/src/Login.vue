<template>
	<div id="app">
		Username:
		<input v-model="username">
		<br/>
		Password:
		<input v-model="password">
		<br/>
		<button @click="ExecuteLogin">Login</button>
		<button @click="CreateUser">Register</button>
	</div>
</template>

<script>
import ddd from './Login.js';
export default ddd;
</script>
