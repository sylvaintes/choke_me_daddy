function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let go_button = document.getElementById('go_button');

go_button.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const target = { tabId: tab.id };

  console.info('CMD: Initiating throttle for tab ', tab);

  chrome.debugger.attach(target, '1.0', async () => {
    console.info('I am in');
    await chrome.debugger.sendCommand(target, 'Debugger.enable');

    await chrome.debugger.sendCommand(target, 'Debugger.pause');

    console.info('Starting pause');

    await timeout(5000);

    console.info('Ending pause');

    await chrome.debugger.sendCommand(target, 'Debugger.resume');

    await chrome.debugger.detach(target);
  });
});
