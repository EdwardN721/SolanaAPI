const { Connection, PublicKey } = require('@solana/web3.js');
const { solanaUtils } = require('../utils/solanaUtils');

const connection = new Connection(process.env.SOLANA_RPC_URL);

const getDevice = async (req, res) => {
    const { registryName, deviceName } = req.params;

    try{
        const deviceData = await solanaUtils.getDeviceData(registryName, deviceName);
        res.json(deviceData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del dispositivo'});
    }
};

module.exports = { getDevice };