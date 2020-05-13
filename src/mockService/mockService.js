class MockService {

    __categories = [
        {
            categoryName: 'The most main',
            textsNames: ['The most main in person', 'The most main thing in live'],
        },
        {
            categoryName: 'Imagine the situation',
            textsNames: ['Fight or not'],
        }
    ];

    getCategories = () => {
        let categories = new Promise( (res, rej) => {setTimeout(() => res(this.__categories), 500)} );
        return categories;
    }


}

const mockService = new MockService();
export default mockService;