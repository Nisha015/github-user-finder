async function searchUser() {
  const username = document.getElementById("username").value;
  const userInfo = document.getElementById("user-info");

  if (!username) {
    userInfo.innerHTML = "<p>Please enter a username.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      userInfo.innerHTML = "<p>User not found!</p>";
      return;
    }

    const user = await response.json();

    userInfo.innerHTML = `
      <img src="${user.avatar_url}" width="100" />
      <h2>${user.name || user.login}</h2>
      <p>${user.bio || "No bio available."}</p>
      <p>Repos: ${user.public_repos} | Followers: ${user.followers}</p>
      <a href="${user.html_url}" target="_blank">View GitHub Profile</a>
    `;
  } catch (error) {
    userInfo.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    console.error("Error:", error);
  }
}
