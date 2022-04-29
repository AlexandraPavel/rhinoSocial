<template>
  <div class="row justify-content-center" v-if="this.postare != undefined">
    <div v-if="this.postare.image != undefined">
      <div
        v-if="this.postare.image != undefined"
        class="image"
        @click="goToPost(this.postare)"
      >
        <div class="col">
          <img class="rounded img-fluid" v-bind:src="this.postare.image" />
        </div>
      </div>
    </div>
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

      <button
        v-if="postare.favourite"
        class="btn btn-outline-warning btn-sm"
        type="button"
        @click="this.favouritePost(this.postare)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
            fill="currentColor"
          ></path>
        </svg>
        Unsave post
      </button>

      <button
        v-else
        class="btn btn-outline-danger btn-sm"
        type="button"
        @click="this.favouritePost(this.postare)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
            fill="currentColor"
          ></path>
        </svg>
        Save post
      </button>

      <button
        class="btn btn-outline-dark btn-sm"
        type="button"
        @click="this.deletePost(this.postare)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
            fill="currentColor"
          ></path></svg
        >Delete post
      </button>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">Upvote {{ postare.upvote }}</th>
              <th class="text-center">Downvote {{ postare.downvote }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <button
                  class="btn btn-outline-success btn-sm"
                  type="button"
                  @click="this.upvotePost(this.postare)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M2 10.5C2 9.67157 2.67157 9 3.5 9C4.32843 9 5 9.67157 5 10.5V16.5C5 17.3284 4.32843 18 3.5 18C2.67157 18 2 17.3284 2 16.5V10.5Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M6 10.3333V15.7639C6 16.5215 6.428 17.214 7.10557 17.5528L7.15542 17.5777C7.71084 17.8554 8.32329 18 8.94427 18H14.3604C15.3138 18 16.1346 17.3271 16.3216 16.3922L17.5216 10.3922C17.7691 9.15465 16.8225 8 15.5604 8H12V4C12 2.89543 11.1046 2 10 2C9.44772 2 9 2.44772 9 3V3.66667C9 4.53215 8.71929 5.37428 8.2 6.06667L6.8 7.93333C6.28071 8.62572 6 9.46785 6 10.3333Z"
                      fill="currentColor"
                    ></path></svg
                  >+1
                </button>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-outline-success btn-sm"
                  type="button"
                  @click="this.downvotePost(this.postare)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M2 10.5C2 9.67157 2.67157 9 3.5 9C4.32843 9 5 9.67157 5 10.5V16.5C5 17.3284 4.32843 18 3.5 18C2.67157 18 2 17.3284 2 16.5V10.5Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M6 10.3333V15.7639C6 16.5215 6.428 17.214 7.10557 17.5528L7.15542 17.5777C7.71084 17.8554 8.32329 18 8.94427 18H14.3604C15.3138 18 16.1346 17.3271 16.3216 16.3922L17.5216 10.3922C17.7691 9.15465 16.8225 8 15.5604 8H12V4C12 2.89543 11.1046 2 10 2C9.44772 2 9 2.44772 9 3V3.66667C9 4.53215 8.71929 5.37428 8.2 6.06667L6.8 7.93333C6.28071 8.62572 6 9.46785 6 10.3333Z"
                      fill="currentColor"
                    ></path></svg
                  >+1
                </button>
              </td>
            </tr>
            <tr>
              <td class="text-center">
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="this.upvoteDownPost(this.postare)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18 9.5C18 10.3284 17.3285 11 16.5 11C15.6716 11 15 10.3284 15 9.5V3.5C15 2.67157 15.6716 2 16.5 2C17.3285 2 18 2.67157 18 3.5V9.5Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M14 9.66667V4.23607C14 3.47852 13.572 2.786 12.8945 2.44721L12.8446 2.42229C12.2892 2.14458 11.6767 2 11.0558 2L5.63964 2C4.68628 2 3.86545 2.67292 3.67848 3.60777L2.47848 9.60777C2.23097 10.8453 3.17755 12 4.43964 12H8.00004V16C8.00004 17.1046 8.89547 18 10 18C10.5523 18 11 17.5523 11 17V16.3333C11 15.4679 11.2807 14.6257 11.8 13.9333L13.2 12.0667C13.7193 11.3743 14 10.5321 14 9.66667Z"
                      fill="currentColor"
                    ></path></svg
                  >-1
                </button>
              </td>
              <td class="text-center">
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="this.downvoteDownPost(this.postare)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18 9.5C18 10.3284 17.3285 11 16.5 11C15.6716 11 15 10.3284 15 9.5V3.5C15 2.67157 15.6716 2 16.5 2C17.3285 2 18 2.67157 18 3.5V9.5Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M14 9.66667V4.23607C14 3.47852 13.572 2.786 12.8945 2.44721L12.8446 2.42229C12.2892 2.14458 11.6767 2 11.0558 2L5.63964 2C4.68628 2 3.86545 2.67292 3.67848 3.60777L2.47848 9.60777C2.23097 10.8453 3.17755 12 4.43964 12H8.00004V16C8.00004 17.1046 8.89547 18 10 18C10.5523 18 11 17.5523 11 17V16.3333C11 15.4679 11.2807 14.6257 11.8 13.9333L13.2 12.0667C13.7193 11.3743 14 10.5321 14 9.66667Z"
                      fill="currentColor"
                    ></path></svg
                  >-1
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

import { mapMutations, mapActions } from "vuex";

export default {
  name: "HomePage",
  components: {
    
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
      upvoteDownPos: "",
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
      console.log("pos", pos);
      const newPost = {
        title: pos.title,
        description: pos.description,
        date: pos.date,
        image: pos.image,
        text: pos.text,
        upvote: pos.upvote,
        downvote: pos.downvote,
        favourite: pos.favourite,
      };

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

