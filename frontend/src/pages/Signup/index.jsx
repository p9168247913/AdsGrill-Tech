import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react"

function Signup() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		dob: '',
		profilePic: null,
		cv: null,
	});
	const navigate = useNavigate()
	const toast = useToast()

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleFileChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.files[0],
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const formDataToSend = new FormData();
			formDataToSend.append('name', formData.name);
			formDataToSend.append('email', formData.email);
			formDataToSend.append('password', formData.password);
			formDataToSend.append('dob', formData.dob);
			formDataToSend.append('profilePic', formData.profilePic);
			formDataToSend.append('cv', formData.cv);

			const response = await axios.post(
				"http://localhost:7000/api/user/register",
				formDataToSend,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log(response.data);
			navigate("/login");
			toast({
				title: 'User registered successfully!!',
				status: 'success',
				duration: 4000,
				isClosable: true,
				position: "top"
			});
		} catch (error) {
			console.error("Axios Error:", error);
			toast({
				title: 'Server Error!!',
				status: 'error',
				duration: 4000,
				isClosable: true,
				position: "top"
			});
		}
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Signup Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/signup.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<form onSubmit={handleSubmit} className="registration-form" encType="multipart/form-data">
						<input placeholder="Name" type="text" className={styles.input} name="name" value={formData.name} onChange={handleChange} required />

						<input placeholder="Email" type="email" className={styles.input} name="email" value={formData.email} onChange={handleChange} required />

						<input placeholder="Password" type="password" className={styles.input} name="password" value={formData.password} onChange={handleChange} required />

						<input placeholder="Date of birth" type="date" className={styles.input} name="dob" value={formData.dob} onChange={handleChange} required />

						<input className={styles.input} type="file" name="profilePic" accept="image/*" onChange={handleFileChange} required />
						<input className={styles.input} type="file" name="cv" accept=".pdf" onChange={handleFileChange} required />

						<button className={styles.google_btn} type="submit">Register</button>
						Already Have Account ? <Link to="/login" style={{ color: 'blue' }}><u>Log In</u></Link>
					</form>

				</div>
			</div>
		</div>
	);
}

export default Signup;
