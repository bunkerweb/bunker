import { openDB } from 'idb';
export class IDB {
    public static createKeyval(name: string) {
        return openDB(name, 1, {
            upgrade(db) {
              db.createObjectStore('keyval');
            },
          });
    }

    public static createDB(name: string) {
        return openDB(name, 1, {});
    }

    public static addObjectStore(db: any, storeName: string) {
        const version = db.version + 1;
        return openDB(db.name, version, {
            upgrade(upgradedDb) {
                upgradedDb.createObjectStore(storeName);
            },
        });
    }

    public static store = (store: any) => ({
        get: async (key: string) => {
            return (await store).get('keyval', key);
        },

        set: async (key: string, value: any) => {
            return (await store).put('keyval', value, key);
        },

        del: async (key: string) => {
            return (await store).delete('keyval', key);
        },

        clear: async () => {
            return (await store).clear('keyval');
        },

        keys: async () => {
            return (await store).getAllKeys('keyval');
        },
    });

}