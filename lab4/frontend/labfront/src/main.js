







import Vue from 'vue'
import App from './App.vue';
import Login from './Login.vue';
// import VueGoodTablePlugin from 'vue-good-table';
// import 'vue-good-table/dist/vue-good-table.css';
// import VueResource from 'vue-resource';



window.token = undefined;


var a = new Vue({
	el: '#app',
	render: h => h(Login)
})

// a.use(VueGoodTablePlugin);
// 
// a.use(VueResource);
//a.config.productionTip = false;

