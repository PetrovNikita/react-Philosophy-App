class mockServer {
    categories = [
        {
            categoryName: 'The most main',
            textsNames: ['The most main in person', 'The most main thing in live'],
        },
        {
            categoryName: 'Imagine the situation',
            textsNames: ['Fight or not'],
        }
    ];

    texts = [
        {
            textName: 'The most main in person',
            textBody: 'What for you is the most important thing in other person?',
        },
        {
            textName: 'Fight or not',
            textBody: 'What would you choose?',
        },
        {
            textName: 'The most main thing in live',
            textBody: 'Happiness - the most important think in your live. What makes you happy?',
        }
    ];

    comments = [
        {
            userLogin: 'Nik',
            textName: 'The most main in person',
            commentText: 'Kindness',
            commentDate: new Date()
        },
        {
            userLogin: 'Fedya',
            textName: 'The most main in person',
            commentText: 'Brave',
            commentDate: new Date()
        },
    ];
}

export default new mockServer();