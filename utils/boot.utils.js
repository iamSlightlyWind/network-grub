import { parseRepoUrl, createGitHubHeaders } from "./common.js";

export async function readFile(token, repoUrl, branch = "grub", fileName) {
    try {
        const { owner, repo } = parseRepoUrl(repoUrl);
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${fileName}?ref=${branch}`;

        const headers = createGitHubHeaders(token);
        const response = await fetch(url, { headers });

        if (response.status === 404) {
            throw new Error(`File "${fileName}" not found in branch "${branch}".`);
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const fileData = await response.json();
        const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
        return content.trim();
    } catch (error) {
        throw new Error(`Error reading file "${fileName}": ${error.message}`);
    }
}