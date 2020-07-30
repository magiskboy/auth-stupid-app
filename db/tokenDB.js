let pgPool;

module.exports = (injectedPgPool) => {
  pgPool = injectedPgPool;

  return {
    saveAccessToken: saveAccessToken,
    getUserIDFromBearerToken: getUserIDFromBearerToken,
  };
};

function saveAccessToken(accessToken, userID, cbFunc) {
  const query = `INSERT INTO access_tokens (access_token, user_id) VALUES ('${userID}', '${accessToken}')`;
  pgPool.query(query, (response) => {
    cbFunc(response.error);
  });
}

function getUserIDFromBearerToken(bearerToken, cbFunc) {
  const query = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}'`;
  pgPool.query(query, (response) => {
    const userID = response.results && response.results.rowCount === 1
      ? response.results.row[0].user_id
      : null;
    cbFunc(userID);
  });
}
