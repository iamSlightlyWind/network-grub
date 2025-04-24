import { getEntryList } from '../utils/list.utils.js';

export default async function handler(req, res) {
    const result = await getEntryList(req, res);
    res.status(result.status).json(result.message);
}