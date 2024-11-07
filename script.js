document.getElementById('fetchInfo').addEventListener('click', fetchIpInfo);

async function fetchIpInfo() {
  try {
    const response = await fetch('https://ipinfo.io/json?token=bb92396fbab16b');
    const data = await response.json();
    
    displayIpInfo(data);
    
    document.getElementById('downloadJson').style.display = 'inline-block';
    
    document.getElementById('downloadJson').addEventListener('click', () => downloadJson(data));
  } catch (error) {
    console.error("Error fetching IP information:", error);
  }
}

function displayIpInfo(data) {
  const ipInfoDiv = document.getElementById('ipInfo');
  ipInfoDiv.innerHTML = '<h2>IP Information:</h2>';
  Object.keys(data).forEach(key => {
    const info = document.createElement('p');
    info.textContent = `${key}: ${data[key]}`;
    ipInfoDiv.appendChild(info);
  });
}

function downloadJson(data) {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'ipInfo.json';
  link.click();
  URL.revokeObjectURL(url);
}
