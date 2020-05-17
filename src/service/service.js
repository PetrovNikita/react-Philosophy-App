class Service {

    __serviceUrl = "localhost:3000";

    getCategories = async () => {
        return await fetch(this.__serviceUrl + '/categories') ;
    }

    async postComment(commentObj) {
        let req = await fetch('/postComment', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify(commentObj),
            });

        let resp;
        if (req.ok) {
            resp = await req.text(); 
        } else resp = req.status;

        console.log(resp);   
        return resp;
    }
}
const service = new Service();
export default service;