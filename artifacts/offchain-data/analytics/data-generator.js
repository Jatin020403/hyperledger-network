const axios = require("axios");
const url = "http://localhost:4000/channels/mychannel/chaincodes/fabcar";

const { nanoid } = require('nanoid')


let colors = ['red', 'green', 'yello', 'white', 'gray', 'gold', 'silver', 'lemon', 'megenta', 'violet', 'rose', 'blue', 'purple', 'salmon', 'maroon', 'black', 'ambar']
let owners = ['owner1', 'owner2', 'owner3', 'owner4', 'owner5', 'owner6', 'owner7', 'owner8', 'owner9', 'owner10', 'owner11', 'owner12', 'owner13', 'owner14', 'owner15', 'owner16', 'owner17', 'owner18', 'owner19', 'owner20', 'owner21', 'owner22', 'owner23', 'owner24', 'owner25',]
let model = ['model1', 'model2', 'model3', 'model4', 'model5', 'model6', 'model7', 'model8', 'model9', 'model10', 'model11', 'model12']
let make = ['Audi', 'BMW', 'Tesla', 'ferrari', 'Dodge', 'Genesis', 'Hyundai', 'Kia', 'Land Rover', 'Lexus', 'Mazda', 'McLaren', 'Mercedes', 'Mini', 'Nissan', 'Porsche', 'Skoda', 'Volkswagen', 'Suzuki', 'Volvo']

const login = async () => {
	let d = {
		"username": "pavan1",
		"orgName": "Org1"
	}
	try {
		let resp = await axios.post("http://localhost:4000/users", d, { headers: { "Content-Type": "application/json" } })
		return resp.data.token
	} catch (error) {
		return error
	}
}


const test = async () => {
	let token = await login()
	console.log(token)
}

// test()



const addCars = async (pk) => {

	let token = await login()
	console.log(token)

	setInterval(() => {
		console.log("inside")
		for (let i=0; i < 10; i++) {
			args = [
				nanoid(12),
				make[Math.floor(Math.random() * make.length)],
				model[Math.floor(Math.random() * model.length)],
				colors[Math.floor(Math.random() * colors.length)],
				owners[Math.floor(Math.random() * owners.length)]
			]
			// console.log("Args are", args)

			let data = {
				"fcn": "CreateCar",
				"chaincodeName": "fabcar",
				"channelName": "mychannel",
				"args": args
			}


			return axios.post(url, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			}
			).then(resp => {
				console.log(resp.data.result)
			}
			).catch(function (error) { console.log(error); });

		}

	}, 1000)

};

addCars()
