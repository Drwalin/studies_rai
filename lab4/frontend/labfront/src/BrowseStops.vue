<template>
	<div id="app">
		<button @click="MainMenu">MainMenu</button>
		<table>
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Region</th>
				<th>Delete</th>
				<th>Arrivals</th>
			</tr>
			<tr v-for="s in stops">
				<td>{{s.stopId}}</td>
				<td>{{s.stopDesc}}</td>
				<td>{{s.zoneName}}</td>
				<td><button @click="DeleteStop(s)">Delete</button></td>
				<td><button @click="ArrivalsOpen(s)">Arrivals</button></td>
			</tr>
		</table>
			<!--
		<ul>
			<li v-for="s in stops">
				{{s.stopId}},
				{{s.stopDesc}},
				{{s.zoneName}},
				<button @click="DeleteStop(s.stopId)">Delete</button>
				<button @click="Arrivals(s.stopId)">Delete</button>
			</li>
		</ul>
		-->
		<button @click="MainMenu">MainMenu</button>
	</div>
</template>

<script>
import ddd from './BrowseStops.js';
export default ddd;
</script>
