<template>
	<div id="app">
		<button @click="MainMenu">MainMenu</button>
		<div>
			Arrivals for stop:
			<br/>
			Id: {{stop.stopId}} 
			<br/>
			{{stop.stopDesc}} 
			<br/>
			{{stop.zoneName}} 
		</div>
		<button @click="Refresh">Refresh</button>
		<table>
			<tr>
				<th>Route id</th>
				<th>Direction</th>
				<th>Estimated departure</th>
				<th>Id</th>
				<th>Vehicle id</th>
				<th>Delay [s]</th>
			</tr>
			<tr v-for="d in delays" v-bind:class="[d.delayInSeconds > 180 ? 'czerwony' : 'szary']">
				<td>{{d.routeId}}</td>
				<td>{{d.headsign}}</td>
				<td>{{d.estimatedTime}}</td>
				<td>{{d.id}}</td>
				<td>{{d.vehicleId}}</td>
				<td>{{d.delayInSeconds}}</td>
			</tr>
		</table>
		<button @click="MainMenu">MainMenu</button>
	</div>
</template>

<script>
import MainBody from './MainBody.vue';
import Vue from 'vue';

export default {
	name: 'ArrivalsVue',
	data () {
		return {
			delays: [],
			stop: window.stopData
		}
	},
	methods:{
		MainMenu() {
			new Vue({
				el: "#app",
				render: h => h(MainBody)
			});
		},
		Refresh() {
			Request("GET",
				"/api/arrivals/" + this.stop.stopId,
				undefined,
				(res) => {
					this.delays = res.delay;
				}
			);
		}
	},
	created() {
		this.stop = window.stopData;
		Request("GET",
			"/api/arrivals/"+this.stop.stopId,
			undefined,
			(res) => {
				this.delays = res.delay;
			}
		);
	}
}
</script>

<style>
.czerwony {
	background-color: #d33;
	color: #000;
}
</style>

