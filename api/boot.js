import { NodeSSH } from 'node-ssh';

export default async function handler(req, res) {
    let { address, port, mac } = req.query;

    if (!address || !mac) {
        return res.status(400).json({ error: 'Address and MAC parameters are required.' });
    }

    if (!port) {
        port = 22;
    }

    const ssh = new NodeSSH();

    try {
        const sshConfig = {
            host: address,
            username: process.env.SSH_USERNAME,
            port: parseInt(port, 10),
        };

        if (process.env.SSH_PRIVATE_KEY) {
            sshConfig.privateKey = process.env.SSH_PRIVATE_KEY;
        } else if (process.env.SSH_PASSWORD) {
            sshConfig.password = SSH_PASSWORD;
        } else {
            return res.status(500).json({ error: 'No SSH authentication method provided.' });
        }

        await ssh.connect(sshConfig);

        const result = await ssh.execCommand(`ether-wake ${mac}`);
        ssh.dispose();

        if (result.stderr) {
            return res.status(500).json({ error: result.stderr });
        }

        return res.status(200).json({ message: result.stdout || 'Command executed successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}