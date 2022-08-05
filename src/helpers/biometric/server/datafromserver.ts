const randomStringFromServer = [
  220, 39, 125, 203, 142, 208, 157, 184, 138, 8, 138, 16, 96, 33, 162, 245, 83,
  135, 27, 147, 52, 21, 222, 160, 254, 112, 91, 86, 225, 68, 94, 182,
];

const getAttestationOptions = {
  publicKey: {
    challenge: new Uint8Array(randomStringFromServer),
    rp: {
      name: 'liber',
      id:
        process.env.NODE_ENV === 'production' ? 'dev.liber.casa' : 'localhost',
    },
    user: {
      name: 'vxcvxc',
      displayName: 'vxcvxc',
      id: new Uint8Array([226, 172, 76, 0, 0, 0, 0, 0, 0, 0]),
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

export { getAttestationOptions, randomStringFromServer };
