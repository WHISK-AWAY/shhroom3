import { box, randomBytes } from 'tweetnacl';
import {
  decodeUTF8,
  encodeUTF8,
  encodeBase64,
  decodeBase64,
} from 'tweetnacl-util';

export function handleKeys() {
  // generate key pair
  const { publicKey, secretKey } = box.keyPair();
  let encodedPublicKey = encodeBase64(publicKey);

  // write encryption function using keys
  function encrypt(
    messageToEncrypt, //: any,
    partnerPublicKey, //?: Uint8Array
  ) {
    const nonce = randomBytes(box.nonceLength);
    const messageUint8 = decodeUTF8(JSON.stringify(messageToEncrypt));
    const encrypted = partnerPublicKey
      ? box(messageUint8, nonce, decodeBase64(partnerPublicKey), secretKey)
      : box.after(messageUint8, nonce, secretKey); // can I just get rid of the non-key version?

    const fullMessage = new Uint8Array(nonce.length + encrypted.length);
    fullMessage.set(nonce);
    fullMessage.set(encrypted, nonce.length);

    const base64FullMessage = encodeBase64(fullMessage);
    return base64FullMessage;
  }

  // write decryption function using keys
  function decrypt(
    messageWithNonce, //: string,
    partnerPublicKey, //?: Uint8Array
  ) {
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
      throw new Error('Could not decrypt message');
    }

    const base64DecryptedMessage = encodeUTF8(decrypted);
    return JSON.parse(base64DecryptedMessage);
  }

  return { encrypt, decrypt, encodedPublicKey };
}
