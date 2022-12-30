
import Samochod from './Samochod';
import * as fs from 'fs';

let DEBUG = (x:any) => {
	console.log("Debug   ", x);
};

export default class Cache {

	ids: Set<number> = new Set();
	elems: Map<number, Samochod> = new Map();

	directory: string;

	constructor(config_path?:string) {
		var c:string = fs.readFileSync(config_path===undefined?'config.cfg':config_path, 'utf8');
		this.directory = c.trim();
		try {
			fs.readdirSync(this.directory);
		} catch {
			fs.mkdirSync(this.directory);
		}
		var dirs:string[] = fs.readdirSync(this.directory);
		for(var i=0; i<dirs.length; ++i) {
			this.ids.add(+(dirs[i]));
		}
	}

	async write(samochod:Samochod) {
		if(this.ids.has(samochod.numer) == false) {
			this.ids.add(samochod.numer);
		}
		this.elems.set(samochod.numer, samochod);
		return fs.promises.writeFile(this.get_path(samochod.numer), JSON.stringify(samochod));
	}

	async read(id:number):Promise<Samochod|undefined> {
		if(this.ids.has(id)) {
			if(this.elems.has(id)) {
				return Promise.resolve(this.elems.get(id));
			} else {
				return fs.promises.readFile(this.get_path(id), 'utf-8').then(
					(data:string)=>{
						var s = JSON.parse(data) as Samochod;
						if(this.elems.has(id) == false) {
							this.elems.set(id, s);
						}
						return this.elems.get(id);
					}
				);
			}
		}
		return Promise.resolve(undefined);
	}
	
	get_available_ids():number[] {
		var ret:number[] = [];
		this.ids.forEach((v)=>{
			ret.push(v);
		});
		return ret;
	}

	async remove(id: number) {
		if(this.ids.has(id)) {
			if(this.elems.has(id)) {
				this.elems.delete(id);
			}
			this.ids.delete(id);
			return fs.promises.rm(this.get_path(id));
		}
		return Promise.resolve(undefined);
	}

	get_path(id: number):string {
		return this.directory + '\\' + id;
	}

	has(id:number):boolean {
		return this.ids.has(id);
	}

	async get_all():Promise<Samochod[]> {
		var copy:Samochod[] = [];
		var ar = this.get_available_ids();
		for(var i=0; i<ar.length; ++i) {
			var s:Samochod|undefined = await this.read(ar[i]);
			if(s === undefined) {
			} else {
				copy.push(s);
			}
		}
		return copy;
	}

	async remove_all() {
		while(this.ids.size != 0) {
			var v:number = 0;
			for(let e of this.ids) {
				v = e;
			}
			await this.remove(v);
		}
	}

	clear_cached_data() {
		this.elems.clear();
	}
}
