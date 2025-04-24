import { readFile } from "../utils/boot.utils.js";

export default async function handler(req, res) {
    try {
        let { repo, token, branch } = req.query;

        if (!repo) {
            return res.status(400).json({ error: 'Repository URL is required.' });
        }

        const state = await readFile(token, repo, branch, "state");
        const config = await readFile(token, repo, branch, `${state}.cfg`);

        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(config);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}