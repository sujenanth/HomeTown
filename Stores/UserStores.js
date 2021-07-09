import { extendObservable } from "mobx";
class UserStores{
    constructor() {
        extendObservable(this, {
            settings: {
                darkmode: true
            }
        })
    }
}

export default new UserStores();