This project is like a forum, where people discuss some philosophy questions.
See it on https://petrovnikita.github.io/react-Philosophy-App/ .

Client side of this project is written on React.
It has three main pages: register, login and pages with text. (Each text having it's own URL.) Routing is made using react-dom-router.
State Data , which is used in different components stands in redux.

To made the way of using functions , which are getting data from server there are some hoc-components: withData and withService.

Plans: 
1. Add a component: FormConstructor (input: fields and there methods, submit-function, output: form)
2. Add to mockServer collection of users and use it in UsersPage, UserPage.