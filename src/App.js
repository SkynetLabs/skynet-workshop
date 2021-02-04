// Import react components
import { useState } from 'react';

// Import custom css
import './App.css';

// Import bootstrap
import { Button, Form } from 'react-bootstrap';

function App() {
	// Define app state
	// const [name, setName] = useState('');
	const [file, setFile] = useState();
	const [fileSkylink, setFileSkylink] = useState('');

	// Handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log('form submitted');

		// Add Code Here
	};

	return (
		<div className="App">
			<h1>Welcome to Skynet!</h1>
			<br />

			{/* Basic input form */}
			<Form onSubmit={handleSubmit}>
				{/* Input for name */}
				{/* <Form.Group inline>
					<Form.Control
						type="text"
						placeholder="Enter your name"
						onChange={(e) => {
							setName(e.target.value);
						}}
					/>
				</Form.Group> */}

				<br />

				{/* Input for file */}
				<Form.Group inline>
					<Form.File
						onChange={(e) => {
							setFile(e.target.files[0]);
						}}
					/>
				</Form.Group>

				<br />
				<Button variant="success" type="submit">
					Send to Skynet
				</Button>
			</Form>

			{/* Show button to view file on skynet once uploaded */}
			<br />
			{fileSkylink && <Button href={fileSkylink}>View on Skynet</Button>}
		</div>
	);
}

export default App;
