const user = require('../src/routes/users');

describe('Users', function () {
    test('list', async () => {
        const req = { };
        const res = {
            code: 0,
            answer: {
                data: []
            },
            status: function(number: any) {
                this.code = number;
                return this;
            },
            json: function(data: any) {
                this.answer = data;
            }
        };
        await user.list(req, res);
        expect(res.answer.data.length).toEqual(2);
    });

    test('login', async () => {
        const req = {
            body: {
                email: "desantiagofer.02@gmail.com",
                password: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3"
            }
        };
        const res = {
            code: 0,
            answer: {
                status: "",
            },
            status: function(number: any) {
                this.code = number;
                return this;
            },
            json: function(data: any) {
                this.answer = data;
            }
        };
        await user.login(req, res);
        expect(res.answer.status).toEqual("success");
    });
});