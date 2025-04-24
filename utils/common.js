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