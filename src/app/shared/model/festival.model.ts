export class Festival {
    constructor(
        public id: number,
        public name: string,
        public country: string,
        public city: string,
        public date: string,
        public from: string,
        public til: string,
        public music: string,
        public dayticket: string,
        public weekendticket: string
    ) { }
}