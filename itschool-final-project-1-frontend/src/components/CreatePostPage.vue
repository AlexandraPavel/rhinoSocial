<template>
  <main class="page blog-post-list">
    <div class="container">
      <div id="createpostpage">
        <div class="chenar">
          <h1 class="titlu">Create a post</h1>
          <hr class="line" />
          <div class="interiorChenar">
            <br />
            <h3 class="spatiere">Title</h3>
            <div>
              <input
                v-model="title"
                @keyup.enter="createPost()"
                class="chenar2"
                id="title"
                placeholder="  Title*"
                type="text"
                name="title"
                maxlength="40"
              />
            </div>
            <h4 class="spatiere">Description</h4>
            <div>
              <textarea
                v-model="description"
                name="descriere"
                class="scrisChenar2"
                placeholder="Descripiton(optional)"
                id="des"
                rows="3"
                cols="65"
                maxlength="254"
              ></textarea>
            </div>
            <hr class="line2" />
            <h4 class="spatiere">Category</h4>
            <select name="categories" v-model="categoryId">
              <option
                v-for="category in $store.state.categories"
                :key="category._id"
                v-bind:value="{ id: category._id }"
              >
                {{ category.title }}
              </option>
            </select>
            <h4 class="spatiere">Text</h4>
            <div>
              <textarea
                v-model="text"
                name="text"
                class="scrisChenar3"
                placeholder="Text*(254 max length)"
                id="txt"
                rows="3"
                cols="65"
                maxlength="254"
              ></textarea>
            </div>
            <hr v-if="imageClicked == 1 || linkClicked == 1" class="line2" />
            <h4 v-if="imageClicked == 1" class="spatiere">Image</h4>
            <div v-if="imageClicked == 1">
              <input
                v-model="image"
                @keyup.enter="createPost()"
                class="chenar2"
                id="imagine"
                placeholder="  Image(optional)"
                type="text"
                name="image"
                maxlength="200"
              />
            </div>
            <h4 v-if="linkClicked == 1" class="spatiere">Link</h4>
            <div v-if="linkClicked == 1">
              <input
                v-model="link"
                @keyup.enter="createPost()"
                class="chenar2"
                id="link"
                placeholder="  Link(optional)"
                type="text"
                name="link"
                maxlength="200"
              />
            </div>

            <div class="flex-container">
              <div>
                <input
                  v-if="imageClicked == -1"
                  @click="imageClick()"
                  class="chenar4"
                  id="image"
                  type="submit"
                  value="Insert image"
                />
              </div>
              <div>
                <input
                  v-if="linkClicked == -1"
                  @click="linkClick()"
                  class="chenar4"
                  id="link"
                  type="submit"
                  value="Insert link"
                />
              </div>
            </div>
            <div id="submitDiv">
              <input
                @click="createPost()"
                class="chenar4"
                id="submit"
                type="submit"
                value="POST"
              />
            </div>
            <h1 v-if="clicked == 1">Posted!:)</h1>
            <h2 v-if="clicked == -1">
              Title or text are missing or description and link are both
              inserted!:(
            </h2>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import store from '../store'

export default {
  name: "createpost",
  props: {
    createPostPage: "",
  },
  data() {
    return {
      postId: "",
      clicked: 0,
      imageClicked: -1,
      linkClicked: -1,
      image: "",
      description: "",
      title: "",
      link: "",
      category: "",
      postId: "",
      categoryId: {},
      text: "",
      date: new Date(),
      post: {},
    };
  },
  created() {
    document.title = "Rinocerii Portocalii - Create Post"
    this.$store.dispatch("fetchCategories");
  },
  methods: {
    createPost() {
      this.Input();
    },
    Input() {
      if (this.emptyOrNot() == 1) {
        this.clicked = 1;
        this.post = {
          image: this.image,
          description: this.description,
          title: this.title,
          link: this.link,
          text: this.text,
          date: this.date,
        };

        fetch("http://localhost:2234/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.post),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            this.postId = data._id;
            const posted = {"post" : data._id};
            return  fetch(`http://localhost:2234/categoryPost/${this.categoryId.id}`, {
                method: "PATCH", 
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(posted),
              })
              .then((res) => {
                const cate = store.state.categoriesShown.filter(x => x.id === this.categoryId.id)
                cate[0]["posts"].push(this.postId)
                return res.json();
              })
            })
          .catch((err) => console.error(err));
        this.manInBlackStyle();
      } else {
        console.log("Nu stiu frate");
        this.clicked = -1;
      }
    },
    manInBlackStyle() {
      console.log("You won't remember anything");

      this.title = "";
      this.link = "";
      this.text = "";
      this.image = "";
      this.description = "";
    },
    emptyOrNot() {
      let verify = 0;
      let verifytxt = 0;
      let verifyLinkAndDescription = 0;
      let theTitle = document.getElementById("title");
      let theText = document.getElementById("txt");
      let theLink = document.getElementById("link");
      let theDes = document.getElementById("des");
      if (this.title == "") {
        theTitle.classList.add("emptyField");
      } else {
        theTitle.classList.remove("emptyField");
        verify = 1;
      }
      if (this.text == "") {
        theText.classList.add("emptyField");
      } else {
        theText.classList.remove("emptyField");
        verifytxt = 1;
      }
      if (this.link != "" && this.description != "") {
        theDes.classList.add("emptyField");
        theLink.classList.add("emptyField");
        verifyLinkAndDescription = 1;
      } else {
        theDes.classList.remove("emptyField");
        theLink.classList.remove("emptyField");
      }
      if (verifyLinkAndDescription == 0 && verify == 1 && verifytxt == 1)
        return 1;
      else return 0;
    },
    imageClick() {
      this.imageClicked = 1;
    },
    linkClick() {
      this.linkClicked = 1;
    },
  },
};
</script>

<style>
#createpostpage {
  margin-top: 83px;
  margin-bottom: 83px;
}

.titlu {
  text-align: left;
}

.chenar {
  width: 950px;
  height: 700px;
  margin-right: auto;
  margin-left: auto;

  background-color: rgba(71, 147, 233, 0.514);
  border-radius: 1%;
  -webkit-box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 1);
}

.interiorChenar {
  width: 900px;
  height: 600px;
  background-color: rgb(231, 239, 240);
  border-radius: 30px;
  margin: auto;
}

.chenar2 {
  width: 700px;
  height: 30px;
  margin: auto;
  margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  background-color: rgb(255, 255, 255);
  border-radius: 129px 129px 20px 20px;
  -moz-border-radius: 129px 129px 129px 129px;
  -webkit-box-shadow: inset 0px 0px 1px 2px rgb(105, 132, 192, 0.87);
  -moz-box-shadow: inset 0px 0px 1px 2px rgb(105, 132, 192, 0.87);
  box-shadow: inset 0px 0px 1px 2px rgb(105, 132, 192, 0.87);
}

.chenar2:focus {
  border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  -webkit-border-radius: 10px 10px 10px 10px;
  border: 1px solid #000000;
}

.chenar4 {
  width: 150px;
  height: 40px;
  margin: auto;
  margin-top: 20px;
  justify-content: center;
  background-color: rgb(247, 243, 243);
  border-radius: 129px 129px 129px 129px;
  -moz-border-radius: 129px 129px 129px 129px;
  -webkit-border-radius: 20px 20px 129px 129px;
  transition: 0.2s;
}

.chenar4:hover {
  background-color: rgba(243, 185, 26, 0.993);
}

.spatiere {
  margin: auto;
  margin-top: 10px;
}

.scrisChenar {
  margin-left: 35px;
  color: rgb(121, 121, 121);
}
.scrisChenar2 {
  margin-left: 50px;
  color: rgb(121, 121, 121);
  max-width: 700px;
  min-width: 700px;
  max-height: 40px;
  min-height: 40px;
}

.scrisChenar3 {
  margin-left: 50px;
  color: rgb(121, 121, 121);
  max-width: 700px;
  min-width: 700px;
  max-height: 70px;
  min-height: 70px;
}

textarea {
  margin-right: 50px;
}

.emptyField {
  border: 2px solid red;
}
.emptyField:focus {
  border: 3px solid red;
}

.line {
  width: 900px;
  border-color: rgb(255, 255, 255);
  border-width: 1px;
}

.line2 {
  width: 800px;
  border-color: rgb(255, 255, 255);
  border-width: 1px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
