export class Item {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public status: 'Available' | 'Unavailable',
        public created_at: Date,
        public updated_at: Date
    ) {}
}