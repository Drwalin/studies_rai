
import Vue from 'vue';
import MainBody from './MainBody.vue';
import ArrivalsVue from './ArrivalsVue.vue';

export default {
	name: 'Login',
	data () {
		return {
			stops:[]
		}
	},
	methods:{
		ArrivalsOpen(stop) {
			window.stopData = stop;
			new Vue({
				el: "#app",
				render: h => h(ArrivalsVue)
			});
		},
		AddStopf(stop) {
			Request("POST",
				"/api/user/stops/"+stop.stopId,
				undefined, 
				(res)=>{
				}
			);
		},
		ExecuteLogin() {
			Request("POST",
				"/api/stops",
				undefined, 
				(res)=>{
					console.log(stops);
					this.allstops = res.stops;
				}
			);
		},
		MainMenu() {
			new Vue({
				el: "#app",
				render: h => h(MainBody)
			});
		}
	},
	created() {
		Request("GET",
			"/api/stops",
			undefined,
			(res) => {
				this.stops = res.stops;
			}
		);
	}
}