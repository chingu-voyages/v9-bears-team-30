const { DataSource } = require('apollo-datasource');

class UserAPI extends DataSource {
    constructor({ store }) {
        super();
        this.store = store;
    }
}

module.exports = UserAPI;