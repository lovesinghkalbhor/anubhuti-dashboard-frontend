// Save credentials
async function setToken(accountName: string, token: string) {
  const result = await (window as any).electronAPI.storeToken(
    accountName,
    token
  );

  return result;
}

// Get credentials
async function getToken(accountName: string) {
  const result = await (window as any).electronAPI.getToken(accountName);

  return result;
}

// Delete credentials
async function deleteToken(accountName: string) {
  const result = await (window as any).electronAPI.deleteToken(accountName);
  return result;
}

export { getToken, setToken, deleteToken };
