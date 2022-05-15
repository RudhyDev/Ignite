const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const customers = [];

//Middleware
function verifyIfExistsAccountCpf(req, res, next) {
	const { cpf } = req.headers;

	const customer = customers.find((customer) => customer.cpf === cpf);

	if (!customer) {
		return res.status(404).json({ error: "Customer not found" });
	}

	req.customer = customer;

	return next();
}

function getBalance(statement) {
	const balance = statement.reduce((acc, operation) => {
		if (operation.type === "credit") {
			return acc + operation.value;
		} else {
			return acc - operation.value;
		}
	}, 0);

	return balance;
}

//Create a new customer
app.post("/account", (req, res) => {
	const { cpf, name } = req.body;

	const customerAlreadyExisits = customers.some(
		(customer) => customer.cpf === cpf
	);
	if (customerAlreadyExisits) {
		return res.status(400).json({ error: "Customer already exists" });
	}

	customers.push({
		cpf,
		name,
		id: uuidv4(),
		statement: [],
	});
	console.log({ customers });
	return res.status(201).send();
});

//Get all customers
app.get("/statement", verifyIfExistsAccountCpf, (req, res) => {
	const { customer } = req;
	return res.json(customer.statement);
});

//Create deposit
app.post("/deposit", verifyIfExistsAccountCpf, (req, res) => {
	const { description, amount } = req.body;
	const { customer } = req;

	const statementOperation = {
		description,
		amount,
		created_at: new Date(),
		type: "credit",
	};

	customer.statement.push(statementOperation);

	return res.status(201).json(statementOperation);
});

//Withdraw
app.post("/withdraw", verifyIfExistsAccountCpf, (req, res) => {
	const { amount } = req.body;
	const { customer } = req;

	const balance = getBalance(customer.statement);

	if (balance < amount) {
		return res.status(400).json({ error: "Insufficient funds" });
	}

	const statementOperation = {
		amount,
		created_at: new Date(),
		type: "debit",
	};

	customer.statement.push(statementOperation);

	return res.status(201).json(statementOperation);
});

app.get("/statement/date", verifyIfExistsAccountCpf, (req, res) => {
	const { customer } = req;
	const { date } = req.query;

	const dateFormat = new Date(date + "T00:00:00");

	const statement = customer.statement.filter(
		(statement) =>
			statement.created_at.toDateString() ===
			new Date(dateFormat).toDateString()
	); 

	return res.json(customer.statement);
});


app.put("/account", verifyIfExistsAccountCpf, (req, res) => {
	const { name } = req.body;
	const { customer } = req;
	customer.name = name;
	return res.status(201).send();
});

app.get('/account', verifyIfExistsAccountCpf, (req, res) => {
	const { customer } = req;
	return res.json(customer);
})

app.delete('/account', verifyIfExistsAccountCpf, (req, res) => {
	const { customer } = req;
	customers.splice(customers.indexOf(customer), 1);
	return res.status(204).send();


	//comment
})

app.listen(5555);
