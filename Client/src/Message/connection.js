import axios from 'axios';

const submitStatus = (props) => new Promise((resolve,reject)=>{
	axios.post('http://192.168.1.107:3001/api/sendMessage',props)
	.then(response=>{
		let message = response.data;
		resolve(message);
	})
});

const getMessage = (props) => new Promise((resolve,reject)=> {
	axios.post('http://192.168.1.107:3001/api/getMessages')
	.then(response=>{
		if (response.data.success) {
			let message = response.data.message;
			resolve(message);
		}
	})
});

const getAccount = (prosp) => new Promise((resolve,reject)=>{
	axios.get('http://localhost/mt-crime/lib/account.php')
	.then(response=>{
		if (response.status) {
			console.log(response.data);
			console.log(response);
		}
	})
})



export {submitStatus , getMessage , getAccount};
