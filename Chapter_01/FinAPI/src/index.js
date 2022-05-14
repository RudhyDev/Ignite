const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
app.use(express.json());

const customers = [];

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

app.get('/statement', (req, res) => {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  return res.json(customer.statement);
})

app.listen(5555);
