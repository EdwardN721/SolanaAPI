import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider } from '@project-serum/anchor';
import fs from 'fs';
import pkg from '@solana/web3.js';
const { Solana } = pkg;
// Configuración de la red
const nodeUrl = "http://api.devnet.solana.com"; // Cambia a la red que estés utilizando

// Carga el IDL
const idl = JSON.parse(fs.readFileSync('/home/eduardo/Desktop/GithubSolana/solana-scm/target/idl/registry_project.json'));

// Cargar la clave privada (asegúrate de manejar esto de forma segura)
const secretPhrase = fs.readFileSync('/home/eduardo/Desktop/GithubSolana/SolanaAPI/secret.txt', 'utf8');

// Conexión a la red de Solana
const connection = new Connection(nodeUrl);
const provider = new AnchorProvider(connection, { wallet: { privateKey: secretPhrase }});

// Crear instancia del programa
const program = new Program(idl, new PublicKey('A5i8uPKdCycDG3nbGCCAUiLzHEc4ddpfeYGQhPEWuaTJ'), provider);

// Función para obtener la clave pública del registro
export async function getRegistryPublicKey(registryName) {
  try {
    // Verificar si la función existe y es de tipo función
    if (typeof program.methods.registryPublicKey !== 'function') {
      throw new Error('La función registryPublicKey no está definida en el IDL');
    }

    // Llamar a la función para obtener la clave pública
    const registryPublicKey = await program.methods.registryPublicKey(registryName).rpc();
    return registryPublicKey;
  } catch (error) {
    console.error('Error al obtener la clave pública del registro:', error);
    throw error;
  }
}

// Función para obtener los datos de un registro
export async function getRegistryData(registryName) {
  try {
    // Obtener la clave pública del registro
    const registryPublicKey = await getRegistryPublicKey(registryName);

    // Obtener los datos del registro
    const registryAccount = await program.account.registry.fetch(registryPublicKey);
    return {
      name: registryAccount.name,
      deviceCount: registryAccount.deviceCount,
    };
  } catch (error) {
    console.error('Error al obtener los datos del registro:', error);
    throw error;
  }
}

// Función para obtener los datos de un dispositivo
export async function getDeviceData(registryName, deviceName) {
  try {
    // Obtener la clave pública del registro
    const registryPublicKey = await getRegistryPublicKey(registryName);

    // Obtener los datos del registro
    const registryAccount = await program.account.registry.fetch(registryPublicKey);

    // Encontrar el dispositivo
    const device = registryAccount.devices.find(device => device[0] === deviceName);
    if (!device) {
      throw new Error('Dispositivo no encontrado');
    }

    return {
      name: device[0],
      description: device[1].description,
      metadata: device[1].metadata,
      data: device[1].data,
    };
  } catch (error) {
    console.error('Error al obtener los datos del dispositivo:', error);
    if (error.message === 'Dispositivo no encontrado') {
      return res.status(404).json({ error: 'Dispositivo no encontrado en el registro' });
    } else {
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

// Ejemplo de uso
async function main() {
  try {
    const registryName = 'myRegistry';
    const deviceName = 'device1';

    // Obtener los datos del registro
    const registryData = await getRegistryData(registryName);
    console.log('Datos del registro:', registryData);

    // Obtener los datos del dispositivo
    const deviceData = await getDeviceData(registryName, deviceName);
    console.log('Datos del dispositivo:', deviceData);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();