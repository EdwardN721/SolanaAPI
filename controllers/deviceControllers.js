import { getDeviceData} from '../utils/solanaUtils.js';
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection(process.env.SOLANA_RPC_URL);

export const getDevice = async (req, res) => {
    const { registryName, deviceName } = req.params;

    try{
        const deviceData = await getDeviceData(registryName, deviceName);
        res.json(deviceData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del dispositivo'});
    }
};

module.exports = { getDevice };