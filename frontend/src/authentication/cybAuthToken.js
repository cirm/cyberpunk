const urlBase64Becode = (str) => {
  let output = str.replace('-', '+').replace('_', '/');

  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += '==';
      break;
    case 3:
      output += '=';
      break;
    default:
      throw new Error('Illegal base64url string!');
  }

  let profile = JSON.parse(window.atob(output));
  return profile; // polifyll https://github.com/davidchambers/Base64.js
};

const splitToken = str => str.split('.')[1];

const decodeProfile = (str) => {
  const encodedProfile = splitToken(str);
  return urlBase64Becode(encodedProfile);
};

export default decodeProfile;
