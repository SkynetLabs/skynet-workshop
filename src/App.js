import './App.css';

function App() {
	return (
		<div className="App">
			<div>
				<h2>Welcome to Skynet!</h2>
			</div>
			{/* Basic input form */}
			<div className="basic-form">
				{/* Input for name */}
				<label className="form-label">Name</label>
				<input type="text" />

				<br />
				<br />

				{/* Input for file */}
				<label className="form-label">File</label>
				<input type="file" />

				<br />
				<br />
				<button className="form-button">Send to Skynet</button>
			</div>
		</div>
	);
}

export default App;
