import { useState, useEffect } from "react";
import { Spinner, Input, Row, Button, Badge } from "reactstrap";
import BlogComponent from "../components/BlogComponent";
import "./Blogs.style.css";

function Blogs() {
	const [bloglist, setBloglist] = useState(null);
	const [userList, setUserList] = useState(null);

	// VARIABILE de stare pentru filtrare
	const [textInput, setTextInput] = useState("");
	const [selectedUser, setSelectedUser] = useState(null);

	// Pasul de adaugare date din API
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((bloglistAPI) => setBloglist(bloglistAPI));

		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((userListAPI) => setUserList(userListAPI));
	}, []);

	return (
		<>
			{bloglist && userList ? (
				<div className='d-flex'>
					<div className='user_list m-4 d-flex flex-column'>
						<h2>User List</h2>
						{userList.map((user, index) => {
							return (
								<Badge
									pill
									className='mt-2'
									key={"user_" + index}
									color={user.id === selectedUser ? "info" : "secondary"}
									onClick={() => {
										setSelectedUser(user.id);
									}}>
									{user.id} - {user.name}
								</Badge>
							);
						})}
						<Button
							color='danger'
							size='sm'
							onClick={() => {
								setSelectedUser(null);
							}}>
							Clear Here
						</Button>
					</div>
					<div className='blog_list'>
						<h2>Search</h2>
						<Input
							className='w-25'
							value={textInput}
							onChange={(event) => {
								setTextInput(event.target.value);
							}}
						/>
						<Row xs='4'>
							{bloglist
								.filter((blog) => {
									return selectedUser === null || selectedUser === blog.userId;
								})
								.filter((blog) => {
									return (
										blog.body.includes(textInput) ||
										blog.title.includes(textInput)
									);
								})
								.map((blog, index) => {
									return <BlogComponent blog={blog} key={"blog_" + index} />;
								})}
						</Row>
					</div>
				</div>
			) : (
				<Spinner>Loading...</Spinner>
			)}
		</>
	);
}

export default Blogs;
