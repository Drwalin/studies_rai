
import Vue from 'vue';
import MainBody from './MainBody.vue';
import ArrivalsVue from './ArrivalsVue.vue';

export default {
	name: 'Login',
	data () {
		return {
			stops:[],
			RequestStops() {
				Request("GET",
					"/api/user/favouritestops",
					undefined,
					(res) => {
						console.log(res);
						this.stops = res;
					}
				);
			}
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
		DeleteStop(stop) {
			Request("DELETE",
				"/api/user/stops/"+stop.stopId,
				undefined, 
				(res)=>{
					this.RequestStops();
				}
			);
		},
		MainMenu() {
			new Vue({
				el: "#app",
				render: h => h(MainBody)
			});
		},
	},
	created() {
		this.RequestStops();
	},
}
