const secret = {
	url : 'mongodb://127.0.0.1:27017/chatbox',
	secretKey : 'ChatBoxApp',
}

const getSecret = key => secret[key];

module.exports = getSecret;