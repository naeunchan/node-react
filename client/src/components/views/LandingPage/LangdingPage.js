import React, { useEffect } from "react";
import axios from "axios";

function LangdingPage() {
	useEffect(() => {
		axios.get("/api/hello").then(response => console.log(response.data));
	}, []);

	return <div>LandingPage입니다</div>;
}

export default LangdingPage;
