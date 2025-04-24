import { parseRepoUrl, createGitHubHeaders } from "./common.js";

export async function editState(token, repoUrl, newState, branch) {
    const { owner, repo: repoName } = parseRepoUrl(repoUrl);

    const filePath = 'state';

    const fileInfo = await getFileInfo(token, owner, repoName, filePath, branch);
    if (!fileInfo) throw new Error('Failed to retrieve file info.');

    await updateFile(token, owner, repoName, filePath, fileInfo.sha, newState, branch);
}

async function getFileInfo(token, owner, repo, path, branch) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${branch}`;

    const headers = createGitHubHeaders(token);
    const res = await fetch(url, { headers });

    if (res.status === 404) {
        throw new Error('State file not found.');
    }

    if (!res.ok) {
        throw new Error(`Failed to fetch file info: ${res.statusText}`);
    }

    const json = await res.json();
    return { sha: json.sha };
}

async function updateFile(token, owner, repo, path, sha, content, branch) {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const body = {
        message: 'Update state file',
        content: Buffer.from(content).toString('base64'),
        sha,
        branch,
    };

    const headers = createGitHubHeaders(token);
    const res = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update file: ${res.statusText}. Details: ${errorText}`);
    }

    await res.json();
}