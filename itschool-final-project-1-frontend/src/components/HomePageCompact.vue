<template>

      <div class="row justify-content-center">

        <div class="col">
          <h3>{{ postare.title }}</h3>
          <div class="info">
            <span class="info category">category </span>
            <br />
            <span class="text-info-span">
             Posted at {{ transformaData(postare.date) }} by Rares Micu</span
            >
          </div> 
          <p>Text: {{ postare.text }}</p>
          <div v-if="postare.description">
            <p>Desc: {{ postare.description }}</p>
          </div>
          <div v-else!="postare.description"></div>
          <button
            class="btn btn-outline-primary btn-sm"
            type="button"
            @click="goToPost(this.postare)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 8V4M4 4H8M4 4L9 9M20 8V4M20 4H16M20 4L15 9M4 16V20M4 20H8M4 20L9 15M20 20L15 15M20 20V16M20 20H16"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path></svg
            >Read More
          </button>
		  <!-- style="color: postare.favourite ? 'gold': 'unset'}" -->

        </div>
      </div>
      <br />

</template>

<script>

import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/vue/outline";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "HomePage",
  components: {
    ThumbUpIcon,
    ThumbDownIcon
  },
  props: {
    msg: String,
    postare: {
      _id: String,
      upvote: Number,
      downvote: Number,
      title: String,
      date: Date,
      description: String,
      text: String,
      commentsList: Array,
    },
  },
  data() {
    return {
      downvoteDownPos: "",
      upvoteDownPos: ""
    };
  },
  methods: {

    transformaData(dataF) { 
      dataF = dataF.replace("T", " - ")
      dataF = dataF.slice(0, dataF.length - 5)
      return dataF;
    },

    goToPost(item) {
      this.$store.state.postID = item._id;
      this.$router.push({ name: "postpage", params: { id: item._id } });
    },
    showList() {
      console.log(postare, msg);
    },
    upvotePost(pos) {
      pos.upvote += 1;
      this.updatePost(pos);
    },
    upvoteDownPost(pos) {
      if (pos.upvote > 0) {
        pos.upvote -= 1;
        this.updatePost(pos);
      }
    },
	upvotePost(pos) {
		pos.upvote += 1;
		this.updatePost(pos);
	},
	upvoteDownPost(pos) {
		if (pos.upvote > 0) {
			pos.upvote -= 1;
			this.updatePost(pos);
		}
	},
	downvotePost(pos) {
		pos.downvote += 1;
		this.updatePost(pos);
	},
	downvoteDownPost(pos) {
		if (pos.downvote > 0) {
			pos.downvote -= 1;
			this.updatePost(pos);
		}
	},
	favouritePost(pos) {
		pos.favourite = !pos.favourite;
		this.updatePost(pos);
	},
	updatePost(pos) {
		console.log("pos", pos)
		const newPost = {
			title: pos.title,
			description: pos.description,
			date: pos.date,
			image: pos.image,
			text: pos.text,
			upvote: pos.upvote,
			downvote: pos.downvote,
			favourite: pos.favourite
        }

      console.log("newPost", newPost);
      console.log("pos UpdatePost", pos._id);
      fetch(`http://localhost:2234/posts/${pos._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.error(err));
    },
    deletePost(pos) {
      fetch(`http://localhost:2234/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pos.commentsList),
      })
        .then((res) => {
          console.log("response:", res);
          return res.json();
        })
        .then((res) => {
          return fetch(`http://localhost:2234/posts/${pos._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log("response:", res);
            pos = {};
            this.fetchPosts();
            return res.json();
          });
        })
        .catch((err) => console.error(err));
    },
    ...mapActions(["fetchPosts"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
