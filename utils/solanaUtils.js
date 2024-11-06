const { Connection, PublicKey } = require('@solana/web3.js');
const { Program, AnchorProvider } = require('@project-serum/anchor');
import fs from 'fs';

// Red de Solana (devnet)
const nodeUrl = "http://api.devnet.solana.com"

// Cargar el ABI de tu contrato
const idl = JSON.parse(fs.readFileSync('/home/eduardo/Desktop/GithubSolana/solana-scm/target/idl'));
//const abi = require('./registry_project.json');
const { registry } = require('@project-serum/anchor/dist/cjs/utils');

// Cargar la clave privada al usuario
const userPrivateKey = new Uint8Array('SolanaSCM');

// Conexión a la red de Solana
const connection = new Connection(nodeUrl);
const provider  = new AnchorProvider(Connection, { wallet: {privateKey: userPrivateKey}});

// Crear instancia del programa
const program = new Program(idl, new PublicKey('A5i8uPKdCycDG3nbGCCAUiLzHEc4ddpfeYGQhPEWuaTJ'), provider);

// Funciones de la API
async function getRegistryData(registryName) {
    const registryPublicKey = await program.rpc.registryPublicKey(registryName);
    const registryAccount = await program.account.registry.fetch(registryPublicKey);
    return{
        name: registryAccount.name,
        deviceCount: registryAccount.deviceCount,
    };
}

async function getDeviceData(registryName, deviceName){
    const registryPublicKey = await program.rpc.registryPublicKey(registryName);
    const registryAccount = await program.account.registry.fetch(registryPublicKey);
    const device = registryAccount.devices.find(device => device[0] === deviceName);
    if(!device){
        throw new Error('Dispositivo no encontrado!');
    }
    return{
        name: device[0],
        description: device[1].description,
        metadata: device[1].metadata,
        data: device[1].data,
    };
}

// Ejemplo
(async () => {
    const registryName = 'Registro 1';
    const deviceName  = 'Sensor';

    try{
        const registryData = await getRegistryData(registryName);
        const deviceData = await getDeviceData(registryData, deviceName);
        console.log('Datos del Registro: ', registryData);
        console.log('Datos del dispositivo: ', deviceData);
    } catch(error){
        console.Error('Error: ', error.message);
    }
})

