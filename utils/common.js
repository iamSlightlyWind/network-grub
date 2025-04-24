export function reconstructUrl(req) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const baseUrl = `${protocol}://${req.headers.host}`;
    return baseUrl;
}

export function checkValidRepo(repoUrl) {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) {
        throw new Error('Invalid repository URL format.');
    }
}

export function parseRepoUrl(repoUrl) {
    checkValidRepo(repoUrl);
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    return { owner: match[1], repo: match[2] };
}

export function createGitHubHeaders(token) {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };

    const githubToken = token || process.env.GITHUB_TOKEN;
    if (githubToken) {
        headers['Authorization'] = `Bearer ${githubToken}`;
    }

    return headers;
}

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