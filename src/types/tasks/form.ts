export interface Form {
    id: String | Number,
    name: String,
    description: String,
    price: Number | String,
    category?: Object,
    completeAt?: Object,
    files: Array<Object>,
    requests: Array<Object>,
}