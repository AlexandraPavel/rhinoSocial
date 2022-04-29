<template>
  <main class="page blog-post-list">
    <div class="container">
      <div id="createcategory">
        <div class="chenar">
          <h1 class="titlu">Create a category</h1>
          <hr class="line" />
          <div class="interiorChenar">
            <br />
            <h3 class="spatiere">Title</h3>
            <div>
              <input
                v-model="title"
                @keyup.enter="createCategory()"
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
            <h4 class="spatiere">Rules</h4>
            <div>
              <textarea
                v-model="rules"
                name="rules"
                class="scrisChenar3"
                placeholder="Rules*(254 max length)"
                id="rules"
                rows="3"
                cols="65"
                maxlength="254"
              ></textarea>
            </div>
            <div id="submitDiv">
              <input
                @click="createCategory()"
                class="chenar4"
                id="submit"
                type="submit"
                value="CREATE"
              />
            </div>
            <h1 v-if="clicked == 1">Category created!:)</h1>
            <h2 v-if="clicked == -1">Title or rules are missing!:(</h2>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import store from '../store'

export default {
  name: "createcategory",
  props: {
    createcategory: "",
  },
  data() {
    return {
      clicked: 0,
      description: "",
      title: "",
      rules: "",
      categoryId: "",
      post: {},
    };
  },
  methods: {
    createCategory() {
      this.Input();
    },
    Input() {
      if (this.emptyOrNot() == 1) {
        this.clicked = 1;
        this.post = {
          description: this.description,
          title: this.title,
          rules: this.rules,
        };

        fetch("http://localhost:2234/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.post),
        })
          .then((res) => {
            console.log("response:", res);
            return res.json();
          })
          .then((data) => {
            this.postId = data;
            store.state.categoriesShown.push({
              "id": x._id,
              "title": x.title,
              "posts": x.postsList,
              "visible" : "Categorie Vizibila"
            })
            return this.categoryId;
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
      this.rules = "";
      this.description = "";
    },
    emptyOrNot() {
      let verify = 0;
      let verifyRules = 0;
      let theTitle = document.getElementById("title");
      let theRules = document.getElementById("rules");
      if (this.title == "") {
        theTitle.classList.add("emptyField");
      } else {
        theTitle.classList.remove("emptyField");
        verify = 1;
      }
      if (this.rules == "") {
        theRules.classList.add("emptyField");
      } else {
        theRules.classList.remove("emptyField");
        verifyRules = 1;
      }

      if (verify == 1 && verifyRules == 1) return 1;
      else return 0;
    },
  },
};
</script>

<style>
#createcategory {
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
