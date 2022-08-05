// from string to Uint8 example
// Uint8Array.from(s, x => x.charCodeAt(0))

const randomStringFromServer = [
  220, 39, 125, 203, 142, 208, 157, 184, 138, 8, 138, 16, 96, 33, 162, 245, 83,
  135, 27, 147, 52, 21, 222, 160, 254, 112, 91, 86, 225, 68, 94, 182,
];

function getAttestationOptions(options: { id: string; email: string }) {
  return {
    publicKey: {
      challenge: new Uint8Array(randomStringFromServer),
      rp: {
        name: 'liber',
        id:
          process.env.NODE_ENV === 'production'
            ? 'dev.liber.casa'
            : 'localhost',
      },
      user: {
        name: options.email,
        displayName: options.email,
        id: Uint8Array.from(options.id, (x) => x.charCodeAt(0)),
      },
      pubKeyCredParams: [
        {
          type: 'public-key',
          alg: -7,
        },
        {
          type: 'public-key',
          alg: -35,
        },
        {
          type: 'public-key',
          alg: -36,
        },
        {
          type: 'public-key',
          alg: -257,
        },
        {
          type: 'public-key',
          alg: -258,
        },
        {
          type: 'public-key',
          alg: -259,
        },
        {
          type: 'public-key',
          alg: -37,
        },
        {
          type: 'public-key',
          alg: -38,
        },
        {
          type: 'public-key',
          alg: -39,
        },
        {
          type: 'public-key',
          alg: -8,
        },
      ],
      authenticatorSelection: {
        requireResidentKey: false,
        userVerification: 'discouraged',
      },
      timeout: 60000,
      extensions: {
        txAuthSimple: '',
      },
      attestation: 'none',
    },
  };
}

export { getAttestationOptions, randomStringFromServer };
