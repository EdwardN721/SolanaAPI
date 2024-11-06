const { Connection, PublicKey } = require('@solana/web3.js');
const { solanaUtils } = require('../utils/solanaUtils');

const connection = new Connection(process.env.SOLANA_RPC_URL);

const getDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const deviceAccount = new PublicKey(deviceId);

    try{
        const accountInfo = await connection.getAccountInfo(deviceAccount);
        const deviceData = solanaUtils.extractDeviceData(accountInfo);
        res.json(deviceData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la información del dispositivo'});
    }
};

module.exports = { getDevice };