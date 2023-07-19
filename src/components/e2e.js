import axios from "axios";
// const axios = require('axios');
import { box, randomBytes } from "tweetnacl";
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from "tweetnacl-util";

export const handleKeys = (userId) => {
  // generate key pair
  const { publicKey, secretKey } = generateKeyPair();
  let encodedPublicKey = null;

  // store public key (base64 encoded) in database
  (async () => {
    encodedPublicKey = encodeBase64(publicKey);
    const token = window.localStorage.getItem("token");
    // need to write express route to update user w/ key
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/user/${userId}`,
      { publicKey: encodedPublicKey },
      {
        headers: { authorization: token },
      },
    );
  })();

  // write encryption function using keys
  const encrypt = (
    // ourSecretKey, // : Uint8Array,
    messageToEncrypt, //: any,
    partnerPublicKey, //?: Uint8Array
  ) => {
    const nonce = newNonce();
    const messageUint8 = decodeUTF8(JSON.stringify(messageToEncrypt));
    const encrypted = partnerPublicKey
      ? box(messageUint8, nonce, decodeBase64(partnerPublicKey), secretKey)
      : box.after(messageUint8, nonce, secretKey); // can I just get rid of the non-key version?

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  };

  // write decryption function using keys
  const decrypt = (
    // secretKey, //: Uint8Array,
    messageWithNonce, //: string,
    partnerPublicKey, //?: Uint8Array
  ) => {
    const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
    const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
    const message = messageWithNonceAsUint8Array.slice(
      box.nonceLength,
      messageWithNonce.length,
    );

    const decrypted = partnerPublicKey
      ? box.open(message, nonce, decodeBase64(partnerPublicKey), secretKey)
      : box.open.after(message, nonce, secretKey);

    if (!decrypted) {
      throw new Error("Could not decrypt message");
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  };

  return { encrypt, decrypt, encodedPublicKey };
};

const newNonce = () => randomBytes(box.nonceLength);

const generateKeyPair = () => box.keyPair();

const encrypt = (
  secretOrSharedKey, // : Uint8Array,
  json, //: any,
  key, //?: Uint8Array
) => {
  const nonce = newNonce();
  const messageUint8 = decodeUTF8(JSON.stringify(json));
  const encrypted = key
    ? box(messageUint8, nonce, key, secretOrSharedKey)
    : box.after(messageUint8, nonce, secretOrSharedKey);

  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);

  const base64FullMessage = encodeBase64(fullMessage);
  return base64FullMessage;
};

const decrypt = (
  secretOrSharedKey, //: Uint8Array,
  messageWithNonce, //: string,
  key, //?: Uint8Array
) => {
  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    box.nonceLength,
    messageWithNonce.length,
  );

  const decrypted = key
    ? box.open(message, nonce, key, secretOrSharedKey)
    : box.open.after(message, nonce, secretOrSharedKey);

  if (!decrypted) {
    throw new Error("Could not decrypt message");
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
};

// const obj = { hello: 'world' };
// const pairA = generateKeyPair();
// console.log('pairA:', pairA);
// const pairB = generateKeyPair();
// console.log('pairB:', pairB);
// const bobPublic64 = encodeBase64(pairB.publicKey);
// console.log('bobPublic64:', bobPublic64);
// console.log('bobPublic64decode:', decodeBase64(bobPublic64));
// const sharedA = box.before(pairB.publicKey, pairA.secretKey);
// const sharedB = box.before(pairA.publicKey, pairB.secretKey);
// const encrypted = encrypt(sharedA, obj);
// const decrypted = decrypt(sharedB, encrypted);
// console.log(obj, encrypted, decrypted);
