import web3 from "./web3";

const address = "0x2C1ed23A88724fEF44ebF66fec4Bd3a28a6a3BA6";
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "taxNumber",
				"type": "uint256"
			}
		],
		"name": "getCorporationInfoByTaxNumber",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "taxNumber",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "corporationName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "productLimit",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "collateralName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "collateralLimit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "risk",
				"type": "uint256"
			}
		],
		"name": "register",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
export default new web3.eth.Contract(abi, address);
