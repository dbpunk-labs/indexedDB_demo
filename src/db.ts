const request = window.indexedDB.open("my_data");
// const databases = indexedDB
// 	.databases()
// 	.then((databases) => console.log(databases));
let db: IDBDatabase;
request.onsuccess = function (e) {
	db = request.result;
};

request.onerror = function (e) {
	console.log("error", e);
};

request.onblocked = function (e) {};

request.onupgradeneeded = function (e) {
	db = e.target?.result;
	console.log(db);
	const customerObjectStore = db.createObjectStore("customers", {
		keyPath: "ssn",
	});
	customerObjectStore.createIndex("name", "name", {
		unique: false,
	});
	customerObjectStore.createIndex("age", "age", { unique: false });
	customerObjectStore.transaction.oncomplete = function (event) {
		console.log("oncomplete");
	};
};

export const addData = function (values: any) {
	const data = {
		...values,
		ssn: Date.now(),
	};

	const store = db
		.transaction("customers", "readwrite")
		.objectStore("customers");
	return new Promise((resolve) => {
		store.add(data).onsuccess = function () {
			resolve("");
		};
	});
};

export const getDataByKeyPath = function (value: any) {
	const store = db
		.transaction("customers", "readwrite")
		.objectStore("customers");

	const request1 = store.get(value);
	return new Promise((resolve) => {
		request1.onsuccess = function (e) {
			resolve([e.target.result]);
		};
	});
};

export const getAllData = function (): Promise<any[]> {
	const store = db
		.transaction("customers", "readwrite")
		.objectStore("customers");
	return new Promise((resolve, reject) => {
		store.getAll().onsuccess = function (e) {
			resolve(e.target.result);
		};
	});
};

export const getAllKeys = function () {
	const store = db
		.transaction("customers", "readwrite")
		.objectStore("customers");
	store.getAllKeys().onsuccess = function (e) {
		console.log(e.target.result);
	};
};

export const getDataByKeyRange = function (lower: number, upper: number) {
	const ageIndex = db
		.transaction("customers", "readwrite")
		.objectStore("customers")
		.index("age");
	const range = IDBKeyRange.bound(lower, upper);
	return new Promise((resolve, reject) => {
		ageIndex.getAll(range).onsuccess = function (e) {
			console.log(e.target.result);
			resolve(e.target.result);
		};
	});
};

export const getCount = function () {
	const store = db
		.transaction("customers", "readwrite")
		.objectStore("customers");
	const range = IDBKeyRange.bound(1672824947401, 1672827638827);
	store.count(range).onsuccess = function (e) {
		console.log(e.target.result);
	};
};

export const putData = function (keyPath: number, putData: any) {};
