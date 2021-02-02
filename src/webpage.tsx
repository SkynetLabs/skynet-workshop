// Import CSS styling
import './webpage.css';

// Create the HTML file for the Skynet content.
const WebPage = (name: string, skylink: string) => {
	const today = new Date();
	const day = today.getDate();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();

	return (
		<body>
			<table className="cert">
				<tr>
					<td align="center" className="crt_logo">
						{/* Skynet logo */}
						<img src="https://siasky.net/AAAW-h21PPBfkDsDaL1HwKasKBKc08i6Euz8I_9CLM3eww" alt="logo" />
					</td>
				</tr>
				<tr>
					<td align="center">
						<h1 className="crt_title">Certificate Of Completion</h1>
						<h2>This Certificate is Awarded to</h2>
						<h1 className="colorGreen crt_user">{name}</h1>
						<h3 className="afterName">For their completion of the 'Intro to Skynet workshop'.</h3>
						<h3>
							Awarded on {month}/{day}/{year}
						</h3>
					</td>
				</tr>
				<tr>
					<td align="center" className="crt_logo">
						<img src={skylink} alt="logo" />
					</td>
				</tr>
			</table>
		</body>
	);
};

export { WebPage };
