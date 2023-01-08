<template>
	<div id="app">
		<button @click="MainMenu">MainMenu</button>
		<!--
		<ul>
			<li v-for="s in stops">
				{{s.stopId}},
				{{s.stopDesc}},
				{{s.zoneName}},
				<button @click="AddStopf(s.stopId)">Add</button>
				<button @click="Arrivals(s.stopId)">Add</button>
			</li>
		</ul>
		-->
		<table>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Region</th>
				<th>Add</th>
				<th>Arrivals</th>
			</tr>
			<tr v-for="s in stops">
				<td>{{s.stopId}}</td>
				<td>{{s.stopDesc}}</td>
				<td>{{s.zoneName}}</td>
				<td><button @click="AddStopf(s)">Add</button></td>
				<td><button @click="ArrivalsOpen(s)">Arrivals</button></td>
			</tr>
		</table>
		<button @click="MainMenu">MainMenu</button>
	</div>
</template>

<script>
import ddd from './AddStop.js';
export default ddd;
</script>
