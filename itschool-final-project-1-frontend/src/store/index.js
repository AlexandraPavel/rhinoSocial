import { createStore, storeKey } from 'vuex'

export default createStore({
	state: {
		posts: [],
		comments: [],
		categories: [],
		postID: "",
		sortingPostType: 0,
		categoriesShown: [],
		showedPosts: [],
		flag: true,
		flagCategory: true,
		homeFeedLook: "Look Default"
	},
	getters: {
		getPost(state, postId) {
			return state.posts.filter(item => item.id == postId);
		}
	},
	mutations: {
		emptyComments(state) {
			state.comments = []
		},
		addPost(state, post) {
			state.posts.push(post);
		},
		addComment(state, comment) {
			state.comments.push(comment);
		},
		addPostToShowedPosts(state, pos_id) {
			const pos = state.posts.filter(x => x._id === pos_id)
			state.showedPosts.push(pos['0'])
		},
		removePostFromShowedPosts(state, pos) {
			const newArr = state.showedPosts.filter(x => x._id != pos._id);
			state.showedPosts = newArr;
		},
		postbyId(state, postId) {
		return state.posts.filter(item => item.id == postId);
		},
		getPostComments(state, postId) {
		let pos = posts.find(pos => pos.id === postId);
		return pos.commentsList;
		}
	},
	actions: {
		fetchPostsSpecial(context, listPosts) {
			if (listPosts == undefined || listPosts.length == 0)
				return []
			else	
			return fetch("http://localhost:2234/postsByIds", {
					method: "POST",
					headers: {
					"Content-Type": "application/json",
					},
					body: JSON.stringify(listPosts),
				})
				.then((res) => res.json())
				.then((data) => {
					// context.state.posts = data;
					context.state.showedPosts = data;
					// console.log("De la fetch", data)
					return context.state.showedPosts;
				})
				.catch((err) => console.error(err));				
		},
		fetchPosts(context) {
		return fetch("http://localhost:2234/posts")
			.then((res) => res.json())
			.then((data) => {
			context.state.posts = data;
			if (context.state.flag) {
				//   console.log("Haide")
				context.state.flag = false;
				context.state.showedPosts = context.state.posts;
			}
			//   console.log("First Showed Posts", context.state.showedPosts);
			return context.state.posts;
			})
			.catch((err) => console.error(err));
		},
		fetchCategories(context) {
			return fetch("http://localhost:2234/categories")
				.then((res) => res.json())
				.then((data) => {
				context.state.categories = data;
				// console.log("Aici")
				if (context.state.flagCategory) {
					context.state.flagCategory = false;
					context.state.categoriesShown = data.map(x => {
						// console.log("id", x._id);
					 return {
						"id": x._id,
						"title": x.title,
						"posts": x.postsList,
						"visible" : "Categorie Vizibila"
					}})
						// , x.postsList})
					// console.log("Category", context.state.categoriesShown)
				}
					return context.state.categoriesShown;
				})
				.catch((err) => console.error(err));
		}
	},
	modules: {
	}
})
