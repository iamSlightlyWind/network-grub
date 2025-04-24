import { readFile } from "../utils/common.js";

export default async function handler(req, res) {
    try {
        let { repo, token, branch } = req.query;

        if (!repo) {
            return res.status(400).json({ error: 'Repository URL and token parameters are required.' });
        }

        if (!branch) {
            branch = "grub";
        }

        const state = await readFile(token, repo, branch, "state");

        res.setHeader('Content-Type', 'text/plain');
        res.status(200).send(state);
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}