
const config = {
    to: process.env.twilio_to || "+13522019038",
    from: process.env.twilio_from || "+13524368812"
};


export class Message {
    to = config.to;
    from = config.from;

    constructor(body: string, _to?: string, _from?: string) {

        if (_to) {
            this.to = _to;
        }
        if (_from) {

            this.from = _from;
        }
    }

}
