<template>
  <main class="page blog-post">
    <div
      v-if="this.post != undefined && this.post.length != 0 && this.post != {}"
    >
      <section class="clean-block clean-post dark">
        <div class="container">
          <div class="block-content">
            <div v-if="this.post.image == undefined"></div>
            <div
              class="post-image"
              v-else
              :style="imaginePostare(this.post.image)"
            ></div>

            <div class="post-body">
              <h3>{{ this.post.title }}</h3>
              <div class="post-info">
                <span>de Rares Micu </span><span>Posted at {{ transformaData(this.post.date) }}</span>
              </div>
              <p>
                {{ this.post.text }}
              </p>
            </div>
            <div>
              <div class="text-center block-content">
                <button class="btn btn-outline-warning btn-sm" type="button">
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
                    ></path></svg
                  >Save post
                </button>
                <button
                  class="btn btn-outline-dark btn-sm"
                  type="button"
                  @click="this.deletePost()"
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
                        <th class="text-center">
                          Upvote {{ this.post.upvote }}
                        </th>
                        <th class="text-center">
                          Downvote {{ this.post.downvote }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="text-center">
                          <button
                            class="btn btn-outline-success btn-sm"
                            type="button"
                            @click="this.upvotePost(this.post)"
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
                            @click="this.downvotePost(this.post)"
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
                            @click="this.upvoteDownPost(this.post)"
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
                            @click="this.downvoteDownPost(this.post)"
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
          </div>
        </div>
      </section>
      <section class="clean-block clean-post dark">
        <div v-if="this.post != []" class="comment">
          <div class="container">
            <div class="block-content">
              <div class="card text-white bg-secondary mb-1">
                <div class="card-body">
                  <div class="card-text form-group">
                    <textarea
                      v-model="commentText"
                      name="comment"
                      class="form-control form-control-lg"
                      placeholder="Write Comment"
                      id="comment"
                      rows="1"
                      cols="40"
                      maxlength="254"
                    >
                    </textarea>
                    <div id="submitDiv">
                      <input
                        @click="this.comment()"
                        @keydown.enter="this.comment()"
                        class="chenar4"
                        id="submit"
                        type="submit"
                        value="Comment"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
		  <div class="container">
          <label for="Sort">Sort comments: </label>
          <br />
          <select
			class="form-select form-select-lg"
            v-model="sortedModel"
            name="Sort"
            @change="this.sortBy(sortedModel)"
          >
            <option>Date - Old to New</option>
            <option>Date - New to Old</option>
            <option>No. of UpVotes (asc)</option>
            <option>No. of UpVotes (desc)</option>
            <option>No. of DownVotes (asc)</option>
            <option>No. of DownVotes (desc)</option>
          </select>
		  </div>
          <br />
          <br />
          <div v-for="(item, index) in this.comments" :key="index">
            <div class="container">
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-15">
                      <div class="clearfix"></div>
                      <p>{{ item.text }}</p>
                      <p>Posted on {{ item.date }}</p>
                      <br />
                      <div>
                        <div>
                          Upvotes: {{ item.upvote }}
                          <button
                            class="float-right btn btn-outline-success ml-2"
                            type="button"
                            @click="this.upvoteComment(item)"
                          >
                            +1
                          </button>
                          <button
                            class="float-right btn btn-outline-danger ml-2"
                            type="button"
                            @click="this.upvoteDownComment(item)"
                          >
                            -1
                          </button>
                        </div>
                        <br />
                        <div>
                          Downvotes: {{ item.downvote }}

                          <button
                            class="float-right btn btn-outline-danger ml-2"
                            type="button"
                            @click="this.downvoteComment(item)"
                          >
                            +1
                          </button>
                          <button
                            class="float-right btn btn-outline-success ml-2"
                            type="button"
                            @click="this.downvoteDownComment(item)"
                          >
                            -1
                          </button>
                        </div>
                        <br />
                        <button
                          class="float-right btn btn-outline-primary ml-2"
                          type="button"
                          @click="this.deleteComment(item)"
                        >
                          Delete comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  name: "PageView",
  data() {
    return {
      postId: "",
      post: [],
      commentsId: [],
      comments: [],
      commentText: "",
      downVoteDownComm: "",
      upvoteDownComm: "",
      downvoteDownPos: "",
      upvoteDownPos: "",
      sortedModel: "",
      sortingType: 1,
	  defaultImage: { backgroundImage: "url(https://theorangerhino.com/wp-content/uploads/2014/10/logo-transparent.png)" }
    };
  },
  methods: {

    transformaData(dataF) { 
      dataF = dataF.replace("T", " - ")
      dataF = dataF.slice(0, dataF.length - 5)
      return dataF;
    },

    imaginePostare(image) {
      return 'background-image: url("' + image + '")';
    },

    updatePage(param) {
      this.postId = param.id;
      return this.postId;
    },
    sortComments(type) {
      if (type === 1) {
        // Date - Old to New
        this.comments = this.comments.sort((a, b) =>
          a.date > b.date ? 1 : -1
        );
      } else if (type === 2) {
        // Date - New to Old
        this.comments = this.comments.sort((a, b) =>
          a.date < b.date ? 1 : -1
        );
      } else if (type === 3) {
        // No. of UpVotes (asc)
        this.comments = this.comments.sort((a, b) =>
          a.upvote > b.upvote ? 1 : -1
        );
      } else if (type === 4) {
        // No. of UpVotes (desc)
        this.comments = this.comments.sort((a, b) =>
          a.upvote < b.upvote ? 1 : -1
        );
      } else if (type === 5) {
        // No. of DownVotes (asc)
        this.comments = this.comments.sort((a, b) =>
          a.downvote > b.downvote ? 1 : -1
        );
      } else if (type === 6) {
        // No. of DownVotes (desc)
        this.comments = this.comments.sort((a, b) =>
          a.downvote < b.downvote ? 1 : -1
        );
      }
    },
    sortBy(type) {
      console.log(type);
      if (type === "Date - Old to New") {
        this.sortingType = 1;
      } else if (type === "Date - New to Old") {
        this.sortingType = 2;
      } else if (type === "No. of UpVotes (asc)") {
        this.sortingType = 3;
      } else if (type === "No. of UpVotes (desc)") {
        this.sortingType = 4;
      } else if (type === "No. of DownVotes (asc)") {
        this.sortingType = 5;
      } else if (type === "No. of DownVotes (desc)") {
        this.sortingType = 6;
      }
      this.sortComments(this.sortingType);
    },
    fetchComments() {
      Promise.all([this.postId]).then((res) => {
        fetch(`http://localhost:2234/posts/${this.postId}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.post = data;
            return fetch("http://localhost:2234/commentsByIds", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data.commentsList),
            })
              .then((res) => res.json())
              .then((data) => {
                this.comments = data;
                this.sortComments(this.sortingType);
                return this.comments;
              })
              .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
      });
      this.sortComments(this.sortingType);
    },
    resetCommentBox() {
      this.commentText = "";
    },
    comment() {
      const comm = {
        text: this.commentText,
        date: new Date(),
      };

      console.log("post", JSON.stringify(comm));
      fetch("http://localhost:2234/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comm),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const commented = { comment: data._id };
          return fetch(`http://localhost:2234/postComment/${this.postId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(commented),
          }).then((res) => {
            return res.json();
          });
        })
        .then((data) => {
          this.fetchComments();
          this.resetCommentBox();
        })
        .catch((err) => console.error(err));
    },
    upvoteComment(comm) {
      comm.upvote += 1;
      this.updateComment(comm);
    },
    upvoteDownComment(comm) {
      if (comm.upvote > 0) {
        comm.upvote -= 1;
        this.updateComment(comm);
      }
    },
    downvoteComment(comm) {
      comm.downvote += 1;
      this.updateComment(comm);
    },
    downvoteDownComment(comm) {
      if (comm.downvote > 0) {
        comm.downvote -= 1;
        this.updateComment(comm);
      }
    },
    deleteComment(comm) {
      fetch(`http://localhost:2234/comments/${comm._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          this.fetchComments();
          return res.json();
        })
        .catch((err) => console.error(err));
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
    updateComment(comm) {
      const newComm = {
        upvote: comm.upvote,
        downvote: comm.downvote,
        text: comm.text,
        date: comm.date,
      };

      fetch(`http://localhost:2234/comments/${comm._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComm),
      })
        .then((res) => {
          this.fetchComments();
          return res.json();
        })
        .catch((err) => console.error(err));
    },
    updatePost(pos) {
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
    deletePost() {
      fetch(`http://localhost:2234/comments`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.post.commentsList),
      }) 
        .then((res) => {
          this.fetchComments();
          return res.json();
        })
        .then((res) => {
          return fetch(`http://localhost:2234/posts/${this.post._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            this.post = {};
            return res.json();
          });
        })
        .catch((err) => console.error(err));
    },
  },
  watch: {
    $route() {
      this.updatePage(this.$route.params);
    },
  },
  created() {
    this.postId = this.$store.state.postID;
    this.fetchComments();
    document.title = "Rinocerii Portocalii - Post"
  },
};
</script>
