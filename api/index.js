import "isomorphic-fetch";

const githubApi = "https://api.github.com";
const accessToken = "?access_token=3977632c8e0440113922be1207cc4b0457049059";

export const getUserByUsername = async (username = "marcelmokos") => {
  const res = await fetch(`${githubApi}/users/${username}${accessToken}`);
  console.log("getUserByUsername");

  return res.json();
};

export const getUserReposByUsername = async (username = "marcelmokos") => {
  const res = await fetch(`${githubApi}/users/${username}/repos${accessToken}`);
  console.log("getUserReposByUsername");

  return res.json();
};

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export const getCommitsForRepository = async (username = "marcelmokos", repository = "nextjs-github") => {
  console.log("getCommitsForRepository");
  const res = await fetch(`${githubApi}/repos/${username}/${repository}/commits${accessToken}`);
  await sleep(2000);

  return res.json();
};
