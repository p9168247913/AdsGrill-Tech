import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
	const token = localStorage.getItem("LoginToken")

	return (
		<div className="container">
			<Routes>
				<Route path="/register" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/" element={token ?<Home /> : <Navigate to="/login" />} />
				<Route path="*" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
