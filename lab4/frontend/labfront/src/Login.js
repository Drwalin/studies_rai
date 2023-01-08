
import Vue from 'vue';
import MainBody from './MainBody.vue';

export default {
	name: 'Login',
	data () {
		return {
			username: "string",
			password: "string"
		}
	},
	methods:{
		ExecuteLogin() {
			Request("POST",
				"/api/login",
				{"username":this.username, "password":this.password}, 
				(res)=>{
					if('token' in res) {
						console.log('login success');
						console.log(res);
						window.token = res.token;
						window.username = res.username;
						window.userid = res.id;
						new Vue({
							el: "#app",
							render: h => h(MainBody)
						});
					}
				}
			);
		},
		CreateUser() {
			Request("POST",
				"/api/users",
				{"username":this.username, "password":this.password}, 
				(res)=>{
				}
			);
		}
	}
}