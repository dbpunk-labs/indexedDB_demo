export class DB3 extends IDBFactory {
	open(name: string, version: number): IDBOpenDBRequest {
		return new IDBOpenDBRequest();
	}
	deleteDatabase(name: string): IDBOpenDBRequest {
		return new IDBOpenDBRequest();
	}
	databases(): Promise<IDBDatabaseInfo[]> {
		return new Promise(() => {});
	}
	cmp(first: any, second: any): number {
		return 2;
	}
}
