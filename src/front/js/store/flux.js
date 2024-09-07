const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token:'',
		},
		actions: {
			// Use getActions to call a function within a fuction
			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/signup', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body:JSON.stringify(formData)
					});
					
					if(!resp.ok) throw new Error('Error creating user');
					const data = await resp.json();
					setStore({ user: data.user, token: data.token})
					localStorage.setItem('token', data.token)
					alert('User created')
					return true
				} catch (error) {
					alert('Error creating user', error)
				};
			},
			login: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + 'api/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json'
						},
						body:JSON.stringify(formData)
					});
					
					if(!resp.ok) throw new Error('Error while login');
					const data = await resp.json();
					setStore({ user: data.user, token: data.token})
					localStorage.setItem('token', data.token)
					alert('Logged')
					return true
				} catch (error) {
					alert('Error creating user', error)
				};
			},
			checkAuth: async () => {
				try {
					const token = getStore().token || localStorage.getItem('token');
					const resp = await fetch(process.env.BACKEND_URL + 'api/token', {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							accept: 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body:JSON.stringify(formData)
					});
					if(!resp.ok) throw new Error('Bad token');
					const data = await resp.json();
					return true
				} catch (error) {
					return false
				};
			},
		
		}
	};
};

export default getState;
