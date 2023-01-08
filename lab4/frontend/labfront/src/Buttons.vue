
<template>
	<div id="buttons">
		<button @click="AddStop">Add favourite stop</button>
		<button @click="BrowseStops">Browse favourite stop</button>
		<button @click="DeleteUser">Delete user</button>
		<button @click="LogOut">Log out</button>
	</div>
</template>

<script>
import Vue from 'vue';
import Login from './Login.vue';
import BrowseStops from './BrowseStops.vue';
import AddStop from './AddStop.vue';

export default {
	name: 'MainBody',
	data () {
		return {
		}
	},
	methods:{
		LogOut() {
			new Vue({
				el: "#app",
				render: h => h(Login)
			});
		},
		AddStop() {
			new Vue({
				el: "#app",
				render: h => h(AddStop)
			});
		},
		BrowseStops() {
			new Vue({
				el: "#app",
				render: h => h(BrowseStops)
			});
		},
		DeleteUser() {
			Request("DELETE",
				"/api/users/" + window.userid,
				undefined,
				(res)=>{
					new Vue({
						el: "#app",
						render: h=>h(Login)
					});
				}
			);
		}
	}
}
</script>


