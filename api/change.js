import { editState } from "../utils/change.utils.js";
import { reconstructUrl } from "../utils/common.js";

export default async function handler(req, res) {
    try {
        let { repo, state, token, branch } = req.query;

        if (!repo || !state || !token) {
            return res.status(400).json({ error: 'Repository URL, entry name, and token parameters are required.' });
        }

        if (!branch) {
            branch = "grub";
        }

        const listResponse = await fetch(`${reconstructUrl(req)}/api/list?repo=${encodeURIComponent(repo)}`, {
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!listResponse.ok) {
            return res.status(listResponse.status).json({ error: `Failed to fetch boot entries: ${listResponse.statusText}` });
        }

        const entries = await listResponse.json();
        const entryExists = entries.includes(state);

        if (entryExists) {
            await editState(token, repo, state, branch);
        }

        res.status(200).json({ message: `State file updated successfully` });
    } catch (error) {
        res.status(500).send(`Error: ${error.message}`);
    }
}