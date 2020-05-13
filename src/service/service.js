class Service {

    __serviceUrl = "localhost:3000";

    getCategories = async () => {
        return await fetch(this.__serviceUrl + '/categories') ;
    }
}

export default service = new Service();