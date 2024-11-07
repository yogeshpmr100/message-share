let currentChannel = 'general'; // Default channel
let channels = {
    general: { password: "1234" },
    tech: { password: "techpass" },
    gaming: { password: "gamepass" }
};

// Add event listeners for buttons
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('create-channel-btn').addEventListener('click', openCreateChannelModal);
document.getElementById('submit-password').addEventListener('click', checkPassword);
document.getElementById('submit-create-channel').addEventListener('click', createNewChannel);
document.getElementById('cancel-create-channel').addEventListener('click', closeCreateChannelModal);

// Function to send message to the chat
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message !== "") {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = message;
        document.getElementById('chat-box').appendChild(messageDiv);
        messageInput.value = "";
        document.getElementById('chat-box').scrollTop = document.getElementById('chat-box').scrollHeight;
    }
}

// Function to join a channel
function joinChannel(channel) {
    if (channels[channel]) {
        const password = channels[channel].password;
        promptPassword(channel, password);
    } else {
        alert('This channel does not exist.');
    }
}

// Function to prompt for password
function promptPassword(channel, password) {
    const modal = document.getElementById('password-modal');
    modal.style.display = 'block';
    document.getElementById('submit-password').onclick = () => checkPassword(channel, password);
}

// Function to check password
function checkPassword(channel, correctPassword) {
    const passwordInput = document.getElementById('channel-password').value;
    if (passwordInput === correctPassword) {
        alert(`You have successfully joined the ${channel} channel!`);
        document.getElementById('password-modal').style.display = 'none';
        displayChannelMessages(channel); // Load the messages of the channel
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Function to open create channel modal
function openCreateChannelModal() {
    const modal = document.getElementById('create-channel-modal');
    modal.style.display = 'block';
}

// Function to close create channel modal
function closeCreateChannelModal() {
    const modal = document.getElementById('create-channel-modal');
    modal.style.display = 'none';
}

// Function to create a new channel
function createNewChannel() {
    const channelName = document.getElementById('new-channel-name').value.trim();
    const channelPassword = document.getElementById('new-channel-password').value.trim();

    if (channelName && !channels[channelName]) {
        channels[channelName] = { password: channelPassword || "" };
        alert(`New channel ${channelName} created!`);
        updateChannelList();
        closeCreateChannelModal();
    } else {
        alert('Channel name is either empty or already exists!');
    }
}

// Function to update the channel list UI
function updateChannelList() {
    const channelListContainer = document.querySelector('.channel-selection');
    const existingButtons = document.querySelectorAll('.channel-btn');
    existingButtons.forEach(button => button.remove()); // Remove existing buttons

    // Add buttons for each channel dynamically
    Object.keys(channels).forEach(channelName => {
        const channelButton = document.createElement('button');
        channelButton.classList.add('channel-btn');
        channelButton.textContent = channelName.charAt(0).toUpperCase() + channelName.slice(1); // Capitalize first letter
        channelButton.onclick = () => joinChannel(channelName);
        channelListContainer.appendChild(channelButton);
    });
}

// Function to display the channel messages (simulated for now)
function displayChannelMessages(channel) {
    // Clear existing messages
    document.getElementById('chat-box').innerHTML = '';

    // Simulating messages for now, you can extend this to store messages per channel
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.textContent = `Welcome to ${channel} channel! Start chatting here.`;
    document.getElementById('chat-box').appendChild(messageDiv);
}
