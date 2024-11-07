let currentChannel = 'general'; // Default channel
let channels = JSON.parse(localStorage.getItem('channels')) || {
    general: { password: "1234" },
    tech: { password: "techpass" },
    gaming: { password: "gamepass" }
};

// Save channels and messages to localStorage whenever they change
function saveChannels() {
    localStorage.setItem('channels', JSON.stringify(channels));
}

// Save messages for a channel
function saveMessages(channel, messages) {
    localStorage.setItem(channel, JSON.stringify(messages));
}

// Retrieve messages for a channel
function getMessages(channel) {
    const messages = localStorage.getItem(channel);
    return messages ? JSON.parse(messages) : [];
}

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

        // Save message to the localStorage under current channel
        const messages = getMessages(currentChannel);
        messages.push(message);
        saveMessages(currentChannel, messages);

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
        currentChannel = channel; // Set current channel
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
        saveChannels();  // Save the channels to localStorage
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

// Function to display the channel messages (now retrieves saved messages)
function displayChannelMessages(channel) {
    // Clear existing messages
    document.getElementById('chat-box').innerHTML = '';

    // Retrieve saved messages for this channel
    const messages = getMessages(channel);
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = message;
        document.getElementById('chat-box').appendChild(messageDiv);
    });
}

// Load the channel list when the page is loaded
window.onload = updateChannelList;
