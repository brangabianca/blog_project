import { Card, CardBody, CardTitle, CardText, Button, Col } from "reactstrap";

function BlogComponent({ blog }) {
	const addToWishlist = () => {
		const blogsString = localStorage.getItem("bloguri");

		if (blogsString !== null) {
			const blogs = JSON.parse(blogsString);

			const existNr = blogs.find((blogElement) => {
				return blogElement.id === blog.id;
			});

			if (existNr === undefined) {
				blogs.push(blog);
			}

			localStorage.setItem("bloguri", JSON.stringify(blogs));
		} else {
			const newBlogs = [];
			newBlogs.push(blog);
			localStorage.setItem("bloguri", JSON.stringify(newBlogs));
		}
	};

	return (
		<Col className='mt-4'>
			<Card>
				<img
					alt='Sample'
					src={"https://picsum.photos/300/200?random=" + blog.id}
				/>
				<CardBody>
					<CardTitle tag='h5'>{blog.title}</CardTitle>
					<CardText>{blog.body}</CardText>
					<h4>{blog.userId}</h4>
					<Button
						onClick={() => {
							addToWishlist();
						}}>
						Add to favourite!
					</Button>
				</CardBody>
			</Card>
		</Col>
	);
}

export default BlogComponent;
