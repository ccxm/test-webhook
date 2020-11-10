class Storage {
    static getInstance() {
        if (!Storage.instance) {
            Storage.instance = new Storage()
        }
        return Storage.instance
    }

    constructor() {
        this.map = new Map()
        this.set('userId', 'u_06444357027')
    }

    get(key) {
        return this.map.get(key)
    }

    set(key, value) {
        this.map.set(key, value)
    }
}

const storage = Storage.getInstance()
export default storage
