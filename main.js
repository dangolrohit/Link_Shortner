// main.js

document.getElementById("shortnerBtn").addEventListener("click", shortenURL);
document.getElementById("copyBtn").addEventListener("click", copyShortUrlToClipboard);

function shortenURL() {
  const longUrlInput = document.getElementById("longUrl");
  const longURL = longUrlInput.value.trim();

  const hideShow = document.getElementById('lowerDiv');
  hideShow.style.visibility = "visible";

  const inFos = document.getElementById('infos');
  inFos.style.margin = "0px";



  if (longURL === "") {
    alert("Please enter a valid URL");
    return;
  }

  const accessToken = "25f0bf644f99586d0ca02a7aaa864bb05ab431b1"; // Replace with your actual Bitly access token

  // Create the shortened URL using the Bitly API
  fetch(`https://api-ssl.bitly.com/v4/shorten`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ long_url: longURL }),
  })
    .then((response) => response.json())
    .then((data) => {
      const shortURL = data.link;
      document.getElementById("shortUrl").value = shortURL;
    })
    .catch((error) => {
      console.error("Error shortening URL:", error);
      alert("An error occurred while shortening the URL. Please try again later.");
    });
}

function copyShortUrlToClipboard() {
  const shortUrlInput = document.getElementById("shortUrl");
  const shortURL = shortUrlInput.value;


  if (shortURL === "") {
    alert("There is no shortened URL to copy.");
    return;
  }

  // Copy the shortened URL to the clipboard
  navigator.clipboard.writeText(shortURL)
    .then(() => {
      alert("Shortened URL copied to clipboard!");
    })
    .catch((error) => {
      console.error("Error copying URL to clipboard:", error);
      alert("An error occurred while copying the URL to the clipboard.");
    });
}



